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
  }

  await sendConfirmationEmails(req, res, mailData)

  // await createOrder(req, res, orderData);

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

    const result = await query(sql, values);

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
    res.send(emailStates);

  } catch (error) {
    // Handle errors
    console.error("Error sending emails: ", error);
    res.status(500).send({
      error: "Error sending emails"
    });

  }

});



module.exports = {
    postPaymentProcess,
    
};

