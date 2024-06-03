// actions.js
import { loadStripe } from "@stripe/stripe-js";


// STRIPE

export const fetchPublishableKey = async (dispatch) => {

  try {

    const response = await fetch("/stripe/config");

    const { publishableKey } = await response.json();

    dispatch({ type: 'SET_PUBLISHABLE_KEY', payload: loadStripe(publishableKey) });

    return publishableKey;

  } catch (error) {

    console.error("Error fetching data:", error);

  }
};


export const postPaymentIntent = async (dispatch, info, shippingPriceInternal) => {

  const data = {
    ids: info,
    fees: shippingPriceInternal,
  }

  try {

    const response = await fetch("/stripe/create-payment-intent", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'  // Ensure correct Content-Type header is set
      },
      body: JSON.stringify(data),
    });

    const { clientSecret } = await response.json();

    dispatch({ type: 'SET_CLIENT_SECRET', payload: clientSecret });

    return clientSecret
    
  } catch (error) {
    console.error("Error posting payment intent:", error);
  }
};



export const paymentConfirmationEmail = async (dispatch, data) => {

  try {

    const response = await fetch("/orders/post-payment", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Set Content-Type header
      },
      body: JSON.stringify(data),
    });

    const emailState = await response.json();

    dispatch({ type: 'SET_EMAIL_STATE', payload: emailState.customerEmail });
    
  } catch (error) {

    console.error("Error sending email:", error);

  }
};

// STRIPE

// PRODUCTS
export const fetchBirds = async (dispatch) => { 
  try {

    const response = await fetch("/birds/get");

    const birds = await response.json();

    dispatch({ type: 'SET_BIRDS', payload: birds });
    
  } catch (error) {

    console.error("Error fetching data:", error);

  }

};

export const fetchSingleBird = async (dispatch, id) => { 

  try {
    const response = await fetch(`/birds/get/${id}`);

    const singleBird = await response.json();

    dispatch({ type: 'SET_SINGLE_BIRD', payload: singleBird });

  } catch (error) {

    console.error("Error fetching data:", error);

  }
};


// PRODUCTS
