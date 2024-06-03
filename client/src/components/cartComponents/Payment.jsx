import { useEffect, useContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import ContinueShopping from '../shared/ContinueShopping'
import ProductsInCart from './ProductsInCart'
import {fetchPublishableKey, postPaymentIntent} from '../../context/GlobalAction'
import GlobalContext from "../../context/GlobalContext";
import PickUpDetails from './PickUpDetails'

function Payment({origin}) {

    const {stripePromise, clientSecret, dispatch, cartItems, shippingMethod} = useContext(GlobalContext);

    const [createPaymentIntent, setCreatePaymentIntent] = useState(false);
    const [shippingPrice, setShippingPrice] = useState(0);

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

      let shippingPriceInternal = null;

      if(shippingMethod === 1){

        shippingPriceInternal = 800;
        setShippingPrice(800);

      } else {

        shippingPriceInternal = 0;
        setShippingPrice(0);

      }

      const info = cartItems.map((item) => item.id)

      const fetchData = async () => {

        await postPaymentIntent(dispatch, info, shippingPriceInternal);

      };   

      fetchData(); 

    }
    
  }, [cartItems, createPaymentIntent, shippingMethod]);

   const handleMakePaymentClick = () => {

    setCreatePaymentIntent(!createPaymentIntent);

    if (createPaymentIntent) {

      dispatch({ type: 'SET_CLIENT_SECRET', payload: null });

    }

  };





  return (

    <div style={{backgroundColor: 'black', color: 'white'}} className={origin ? 'home-right-fixed-container' : 'home-right-container'}>
      
      <section className="payment-container">

      <ContinueShopping/>

      <ProductsInCart onMakePayment={createPaymentIntent} />

      {(shippingMethod !== null && (shippingMethod === 0 || shippingMethod === 1)) && (
        <>
          <button onClick={handleMakePaymentClick} className="make-payment-button">{createPaymentIntent ? 'Change shipping options' : 'Make Payment'}</button>

          {(clientSecret && stripePromise && createPaymentIntent) && (

            <Elements stripe={stripePromise} options={{ clientSecret }}>

              <CheckoutForm shippingPrice={shippingPrice} />

            </Elements>

          )}

        </>

      )}

      <PickUpDetails/>

      </section>
      
    </div>

  );
  
}

export default Payment;
