const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
const {query} = require('./functions/queriesFunctions');


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {

  apiVersion: "2022-08-01",

});

const sendPublishableKey = asyncHandler(async (req, res) => {

  res.send({

    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,

  });

});

const paymentIntent = asyncHandler(async (req, res) => {

  const id = req.body.ids;

  const numberId = Number(id[0])

  let product = {};

  try{
        const sql =`SELECT * from productos WHERE id = ${numberId};`;                   

        let productExist = false;

        const result = await query(sql);

        if (result.length > 0){

            productExist = true;

        }   

        if(productExist){

            product = result[0];

        } else {

            res.status(200).send('No products found');

        }
        
    } catch (error) {

        console.error(error);
        res.status(500).send('Error searching for products');

    }

    if(Object.keys(product).length > 0){

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "EUR",
          amount: product.precio,
          automatic_payment_methods: { enabled: true },
        });

        // Send publishable key and PaymentIntent details to client
        res.send({clientSecret: paymentIntent.client_secret});

      } catch (e) {

          return res.status(400).send({
            error: {
                message: e.message,
            },
          });

      }

    }
  
});

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


const sendConfirmationEmails = asyncHandler(async (req, res) => {


  const { email } = req.body;


  let emailStates = {
    customerEmail: false,
    selfEmail: false
  };

  // Define mail options for the customer
  const customerMailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Ales de Paper",
    text: "Has realizado una compra bla bla bla",
  };

  // Define mail options for self email
  const selfMailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Your email address
    subject: "Ales de Paper - Notification",
    text: "Alguien ha realizado una compra",
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
    sendPublishableKey,
    paymentIntent,
    sendConfirmationEmails
};

