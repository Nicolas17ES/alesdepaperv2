import { useEffect, useContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import ContinueShopping from '../shared/ContinueShopping'
import ProductsInCart from './ProductsInCart'
import {fetchPublishableKey, postPaymentIntent} from '../../context/GlobalAction'
import GlobalContext from "../../context/GlobalContext";
import PickUpDetails from './PickUpDetails'

function Payment() {

    const {stripePromise, clientSecret, dispatch, cartItems} = useContext(GlobalContext);

    const [createPaymentIntent, setCreatePaymentIntent] = useState(false);

    const [shippingMethod, setShippingMethod] = useState(null);

     const selectShippingMethod = (value) => {

      setShippingMethod(value);

     }

    useEffect(() => {

      if(cartItems.length > 0 && createPaymentIntent){

        const fetchData = async () => {

           await fetchPublishableKey(dispatch);

        }; 

        fetchData();
      }
          
    }, [cartItems, createPaymentIntent]);
    

  useEffect(() => {

    if(cartItems.length > 0 && createPaymentIntent){

      const info = cartItems.map((item) => item.id)

      const fetchData = async () => {

        await postPaymentIntent(dispatch, info);

      };   

      fetchData(); 

    }
    
  }, [cartItems, createPaymentIntent]);


  return (

    <div style={{backgroundColor: 'black', padding: '20px', color: 'white'}} className="home-right-container">

      <ContinueShopping/>

      <ProductsInCart onMakePayment={createPaymentIntent} onShippingMethod={selectShippingMethod} />

      {(shippingMethod !== null && (shippingMethod === 0 || shippingMethod === 1)) && (
        <>
          <button onClick={() => setCreatePaymentIntent(!createPaymentIntent)} className="make-payment-button">{createPaymentIntent ? 'Change shipping options' : 'Make Payment'}</button>

          {(clientSecret && stripePromise && createPaymentIntent) && (

            <Elements stripe={stripePromise} options={{ clientSecret }}>

              <CheckoutForm selectedShippingMethod={shippingMethod} />

            </Elements>

          )}

        </>

      )}

      <PickUpDetails/>
      
    </div>

  );
  
}

export default Payment;
