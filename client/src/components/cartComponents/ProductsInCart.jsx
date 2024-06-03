import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import NumberDisplay from '../shared/NumberDisplay'

function ProductsInCart({onMakePayment}) {

  const { cartItems, dispatch, shippingMethod } = useContext(GlobalContext);

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

  }, [shippingMethod, shippingPrice, cartItems]);

//   change shipping method on parent component

  // update the quanitty ofo a given item in cart
  const updateItemsQuantity = (value, id) => {

    if (value) {

      dispatch({
        type: 'SET_INCREASE_ITEM_QUANTITY',
        payload: id,
      });

    } else {

      dispatch({
        type: 'SET_DECREASE_ITEM_QUANTITY',
        payload: id,
      });

    }
  }

  // DEFINE /CHANGE SHIPPING METHOD:
  const setShippingMethod = (value) => {

    dispatch({
        type: 'SET_SHIPPING_METHOD',
        payload: value,
      });
    
  }


  return (
    <div className="products-in-cart">
      <table>
        <thead>
          <tr>
            <th className="column-name"></th>
            <th className="column-quantity">Quantity</th>
            <th className="column-price">Price</th>
          </tr>
        </thead>
        <tbody>
          {uniqueCartItems.map((item) => (
            <tr key={item.id}>
              <td className="column-name">{item.nombre}</td>
              <td className="column-quantity">
                {!onMakePayment && <button onClick={() => updateItemsQuantity(0, item.id)} className="update-items-quantity-button">{'<'}</button>}
                {item.quantity}
                {!onMakePayment && <button onClick={() => updateItemsQuantity(1, item.id)} className="update-items-quantity-button">{'>'}</button>}
              </td>
              {item.precio && <td className="column-price"><NumberDisplay number={item.precio}/></td>}
            </tr>
          ))}

            <tr>
                <td className="column-name">
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
                <td className="column-quantity"></td>
               {(shippingPrice && shippingMethod === 1) ?  <td className="column-price"><NumberDisplay number={shippingPrice} /></td> : null}
            </tr>

            <tr>
                <td className="column-name">Total</td>
                <td className="column-quantity"></td>
                {finalPrice && <td className="column-price"><NumberDisplay number={finalPrice} /></td>}
            </tr>

            {shippingMethod === 2 && (
                <tr>
                    <td className="column-name">
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
