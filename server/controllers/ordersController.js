const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
const {query} = require('./functions/queriesFunctions');




const postPaymentProcess = asyncHandler(async (req, res) => {

   const {
    name,
    email,
    shipping_address_line1,
    shipping_address_line2,
    shipping_city,
    shipping_state,
    shipping_postal_code,
    shipping_country,
    shipping_method,
    shipping_price,
    stripe_payment_intent_id,
    status,
    cart_items,
  } = req.body;

  // Calculate quantities of each unique item in the cart
  const itemQuantities = cart_items.reduce((acc, item) => {

    if (acc[item.id]) {

        acc[item.id].quantity += 1;
        
        } else {
            
        acc[item.id] = { ...item, quantity: 1 };
        
        }
        
        return acc;
        
    }, {});


  const uniqueCartItems = Object.values(itemQuantities);

  let total_price = 0;

  uniqueCartItems.forEach((item) => {

      total_price += (item.precio * item.quantity);

  })

  total_price += shipping_price;

  const orderData = {
    customer_name: name,
    customer_email: email,
    shipping_address_line1,
    shipping_address_line2,
    shipping_city,
    shipping_state,
    shipping_postal_code,
    shipping_country,
    total_price,
    shipping_method,
    shipping_price,
    stripe_payment_intent_id,
    uniqueCartItems,
    status
  }

  const mailData = {
    customer_name: name,
    customer_email: email,
    uniqueCartItems,
    stripe_payment_intent_id,
    total_price,
    shipping_price,
  }

  const emailState = await sendConfirmationEmails(req, res, mailData);

  if (emailState) {
    
    await createOrder(req, res, orderData);
    
  } else {
    
    res.status(500).send({ error: "Failed to send confirmation emails." });
    
  }

});


const createOrder = asyncHandler(async (req, res, data) => {

  if (!data) {
    return res.status(400).send('No data provided');
  }

  try {
    const sql = `
      INSERT INTO orders (
        customer_name,
        customer_email,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country,
        total_price,
        shipping_method,
        shipping_price,
        stripe_payment_intent_id,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.customer_name,
      data.customer_email,
      data.shipping_address_line1,
      data.shipping_address_line2,
      data.shipping_city,
      data.shipping_state,
      data.shipping_postal_code,
      data.shipping_country,
      parseInt(data.total_price),
      data.shipping_method,
      parseInt(data.shipping_price),
      data.stripe_payment_intent_id,
      data.status
    ];

    const result = await query(sql, values); // Avoid destructuring here

      if (result.affectedRows > 0) {

      const orderId = result.insertId;

      const uniqueCartItems = data.uniqueCartItems;

      for (let item of uniqueCartItems) {

        await generateOrderItems(orderId, item);

      }

      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });

    } else {

      res.status(500).send('Error creating order');

    }

  } catch (error) {

    console.error(error);
    res.status(500).send('Error creating order');

  }

});

const generateOrderItems = async (orderId, item) => {

  try {

    const sql = `
      INSERT INTO order_items (
        order_id,
        product_id,
        quantity,
        price
      ) VALUES (?, ?, ?, ?)`;

    const values = [
      orderId,
      item.id,
      item.quantity,
      parseFloat(item.precio)
    ];

    await query(sql, values);

  } catch (error) {

    console.error(error);
    throw new Error('Error creating order items');

  }

};



const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

const sendConfirmationEmails = asyncHandler(async (req, res, emailData) => {


  const name = emailData.customer_name;
  const email = emailData.customer_email;
  const uniqueCartItems = emailData.uniqueCartItems;
  const paymentId = emailData.stripe_payment_intent_id;
  const total_price = emailData.total_price;
  const shipping_price = emailData.shipping_price;
  const shippingPrice = shipping_price > 0 ? shipping_price : 0;


  let emailStates = {
    customerEmail: false,
    selfEmail: false
  };

  const productDetails = uniqueCartItems.map(item => {
      return `<p>${item.quantity} x ${item.nombre} (${item.description}) - $${item.precio / 100}</p>`;
    }).join('');

  // Define mail options for the customer
  const customerMailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Ales de Paper - Purchase Confirmation",
    html: `
      <h1>Thank you for your purchase, ${name}!</h1>
      <p>Your payment ID is: ${paymentId}</p>
      <h2>Products:</h2>
      ${productDetails}
      <p>Shipping price: ${shippingPrice}</p>
      <p>Total price: ${total_price}</p>
      <p>If you have any questions, please contact us with your payment ID.</p>
      <p>Best regards,<br>Ales de Paper</p>
    `,
  };

  // Define mail options for self email
  const selfMailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Your email address
    subject: "Ales de Paper - New Purchase Notification",
    html: `
      <h1>New Purchase Notification</h1>
      <p><strong>Customer Name:</strong> ${name}</p>
      <p><strong>Customer Email:</strong> ${email}</p>
      <p><strong>Payment ID:</strong> ${paymentId}</p>
      <h2>Products:</h2>
      ${productDetails}
      <p>Shipping price: ${shippingPrice}</p>
      <p>Total price: ${total_price}</p>
    `,
  };

  try {
    // Send both emails concurrently using Promise.all
    const [customerInfo, selfInfo] = await Promise.all([
      transporter.sendMail(customerMailOptions),
      transporter.sendMail(selfMailOptions)
    ]);

    // Set email states based on success
    if (customerInfo.accepted.length > 0) {
      emailStates.customerEmail = true;
    }

    if (selfInfo.accepted.length > 0) {
      emailStates.selfEmail = true;
    }

    // Send response with email states
    if (emailStates.customerEmail && emailStates.selfEmail){

      return true

    } else {

      return false

    }

  } catch (error) {
    // Handle errors
    console.error("Error sending emails: ", error);
    res.status(500).send({
      error: "Error sending emails"
    });

  }

});


const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const sql = `
      SELECT 
          o.id AS order_id,
          o.customer_name,
          o.customer_email,
          o.shipping_address_line1,
          o.shipping_address_line2,
          o.shipping_city,
          o.shipping_state,
          o.shipping_postal_code,
          o.shipping_country,
          o.total_price AS order_total_price,
          o.shipping_method,
          o.shipping_price,
          o.stripe_payment_intent_id,
          o.status AS order_status,
          o.created_at AS order_created_at,
          oi.id AS order_item_id,
          oi.product_id,
          oi.quantity,
          oi.price AS order_item_price,
          p.nombre AS product_name,
          p.precio AS product_price
      FROM 
          orders o
      JOIN 
          order_items oi ON o.id = oi.order_id
      JOIN 
          productos p ON oi.product_id = p.id;
    `;

    const result = await query(sql);

    const ordersMap = new Map();

    for (let row of result) {
      const {
        order_id,
        customer_name,
        customer_email,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country,
        order_total_price,
        shipping_method,
        shipping_price,
        stripe_payment_intent_id,
        order_status,
        order_created_at,
        product_name,
        product_price,
        quantity
      } = row;

      if (!ordersMap.has(order_id)) {
        ordersMap.set(order_id, {
          order_id,
          customer_name,
          customer_email,
          shipping_address_line1,
          shipping_address_line2,
          shipping_city,
          shipping_state,
          shipping_postal_code,
          shipping_country,
          order_total_price,
          shipping_method,
          shipping_price,
          stripe_payment_intent_id,
          order_status,
          order_created_at,
          order_items: []
        });
      }

      const order = ordersMap.get(order_id);
      order.order_items.push({
        product_name,
        product_price,
        quantity
      });
    }

    const ordersArray = Array.from(ordersMap.values());

    res.status(200).json(ordersArray);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving orders');
  }
});






const changeOrderStatus = asyncHandler(async (req, res) => {

  const status = req.body.status;
  const id = req.body.id;

  try {

    const sql = `UPDATE orders SET status = ${status} WHERE id = ${id}`;
    
    res.status(200).json(ordersArray);

  } catch (error) {

    console.error(error);
    res.status(500).send('Error retrieving orders');

  }

});




module.exports = {
    postPaymentProcess,
    getAllOrders,
    changeOrderStatus,
    
};

