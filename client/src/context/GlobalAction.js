// actions.js
import { loadStripe } from "@stripe/stripe-js";


export const fetchPublishableKey = async (dispatch) => { // Pass dispatch function as a parameter
  try {
    const response = await fetch("/config");
    const { publishableKey } = await response.json();
    dispatch({ type: 'SET_PUBLISHABLE_KEY', payload: loadStripe(publishableKey) });
    return publishableKey;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


export const postPaymentIntent = async (dispatch) => {
  try {
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const { clientSecret } = await response.json();
    dispatch({ type: 'SET_CLIENT_SECRET', payload: clientSecret });
    return clientSecret
    
  } catch (error) {
    console.error("Error posting payment intent:", error);
  }
};
