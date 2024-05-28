import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";

function ProductsInCart({onShippingMethod, onMakePayment}) {

  const { cartItems } = useContext(GlobalContext);

  const [shippingMethod, setShippingMethod] = useState(0);

  const [shippingPrice, setShippingPrice] = useState(0);

  const [finalPrice, setFinalPrice] = useState(null);

  const shippingOptions = ['Local Pickup', 'Spain', 'International']

  // Calculate quantities of each unique item in the cart
  const itemQuantities = cartItems.reduce((acc, item) => {

    if (acc[item.id]) {

        acc[item.id].quantity += 1;
        
        } else {
            
        acc[item.id] = { ...item, quantity: 1 };
        
        }
        
        return acc;
        
    }, {});


  const uniqueCartItems = Object.values(itemQuantities);

// select shipping method
  useEffect(() => {

      if(shippingMethod === 0){

          setShippingPrice(0)

      } else if (shippingMethod === 1) {

        setShippingPrice(800)

      } else if (shippingMethod === 2) {

        setShippingPrice(null)

      }

  }, [shippingMethod])


  useEffect(() => {

    let price = 0;

    uniqueCartItems.forEach((item) => {
        price += (item.precio * item.quantity);
    })

    if (shippingPrice) {

        setFinalPrice(price + shippingPrice)

    } else {

        setFinalPrice(price)

    }

  }, [shippingMethod, shippingPrice]);

//   change shipping method on parent component

useEffect(() => {

    onShippingMethod(shippingMethod)

  }, [shippingMethod]);



  return (
    <div className="products-in-cart">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td>{item.quantity}</td>
              <td>{item.precio}</td>
            </tr>
          ))}

            <tr>
                <td>
                    <div className="shippin-row-container">
                        <span className="shipping-title">shipping</span>
                            {!onMakePayment ? (
                                <>
                                    <button onClick={() => setShippingMethod(0)} style={{textDecoration: shippingMethod === 0 ? 'underline' : null}} className="shipping-option">Local Pickup</button>
                                    <span className="slash"> - </span>
                                    <button onClick={() => setShippingMethod(1)} style={{textDecoration: shippingMethod === 1 ? 'underline' : null}} className="shipping-option"> Spain</button>
                                    <span className="slash"> - </span>
                                    <button onClick={() => setShippingMethod(2)} style={{textDecoration: shippingMethod === 2 ? 'underline' : null}} className="shipping-option"> International</button>
                                </>
                            ) : (
                                <button style={{textDecoration: 'underline'}} className="shipping-option">{shippingOptions[shippingMethod]}</button>
                            )}
                    </div>
                </td>
                <td></td>
                <td>{shippingPrice}</td>
            </tr>

            <tr>
                <td>Total</td>
                <td></td>
                <td>{finalPrice}</td>
            </tr>

            {shippingMethod === 2 && (
                <tr>
                    <td>
                        <p className="international-shippings">
                            For international orders send an email to: dosalesdepaper@gmail.com
                        </p>
                    </td>
                </tr>
            )}

        </tbody>
      </table>
    </div>
  );
}

export default ProductsInCart;
