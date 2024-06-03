const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");
const {query} = require('./functions/queriesFunctions');
const {sendConfirmationEmails, generateOrderItems, createOrder} = require('./ordersController.js');


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {

  apiVersion: "2022-08-01",

});

const sendPublishableKey = asyncHandler(async (req, res) => {

  res.send({

    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,

  });

});

const paymentIntent = asyncHandler(async (req, res) => {

  const ids = req.body.ids;

  const shippingPrice = req.body.fees;

  if (!ids || ids.length === 0) {

    return res.status(400).send('No products specified');

  }

  const countOccurrences = ids.reduce((acc, val) => {

    acc[val] = (acc[val] || 0) + 1;
    
    return acc;

  }, {});


  try {
    // Create a single SQL query for one or more IDs
    const sql = `SELECT * FROM productos WHERE id IN (${ids.join(',')})`;

    const result = await query(sql);

    if (result.length === 0) {

      return res.status(404).send('No products found');

    }

    // Calculate the total price
 
    const totalPrice = result.reduce((acc, product) => {

      if (countOccurrences[product.id] > 1) {

        acc += product.precio * countOccurrences[product.id]; 

      } else {

        acc += product.precio;

      }

      return acc; 

    }, 0);

    let finalPrice;

    if(shippingPrice){

      finalPrice = totalPrice + shippingPrice;

    } else {

      finalPrice = totalPrice;

    }

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: finalPrice,
      automatic_payment_methods: { enabled: true },
    });

    // Send the clientSecret to the client
    res.send({ clientSecret: paymentIntent.client_secret });

  } catch (error) {

    console.error(error);
    res.status(500).send('Error processing payment');

  }

});


module.exports = {
    sendPublishableKey,
    paymentIntent,
};

