import { useEffect, useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {fetchPublishableKey, postPaymentIntent} from '../../context/GlobalAction'
import GlobalContext from "../../context/GlobalContext";

function Payment() {
    const {stripePromise, clientSecret, dispatch} = useContext(GlobalContext)

    useEffect(() => {
        const fetchData = async () => {
           await fetchPublishableKey(dispatch);
        }; 
        fetchData();    
    }, []);
    

  useEffect(() => {
    const fetchData = async () => {
        await postPaymentIntent(dispatch);
     };   
     fetchData(); 
  }, []);


  return (
    <>
      <h1>pagame weeeey</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
