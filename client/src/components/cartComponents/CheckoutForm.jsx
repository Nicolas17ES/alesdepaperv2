import { PaymentElement } from "@stripe/react-stripe-js";
import { useState, useContext } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {paymentConfirmationEmail} from '../../context/GlobalAction'
import GlobalContext from "../../context/GlobalContext";

export default function CheckoutForm() {
  
  const {dispatch} = useContext(GlobalContext)

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!email || !name || !addressLine1 || !city || !state || !postalCode ) {
      setMessage('Please include all fields');
      return;
    }

    setIsProcessing(true);
    const cartData = {
          email: email,
          name: name,
          address: {
            line1: addressLine1,
            line2: addressLine2,
            city: city,
            state: state,
            postal_code: postalCode
          }
        } 

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
        payment_method_data: {
          billing_details: {
            email: email,
            name: name,
            address: {
              line1: addressLine1,
              line2: addressLine2,
              city: city,
              state: state,
              postal_code: postalCode
            }
          }
        }
      },
      redirect: 'if_required'
    });




    if (error && (error.type === "card_error" || error.type === "validation_error")) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      paymentConfirmationEmail(dispatch, cartData)
      setMessage("Payment status: " + paymentIntent.status)
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Street Address"
        value={addressLine1}
        onChange={(e) => setAddressLine1(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apartment, suite, etc. (optional)"
        value={addressLine2}
        onChange={(e) => setAddressLine2(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        required
      />
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
