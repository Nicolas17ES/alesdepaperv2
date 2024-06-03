import { useEffect, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function Cart() {

    const {dispatch} = useContext(GlobalContext);

    const openCart = () => {
        dispatch({
            type: 'SET_DISPLAY_CART',
            payload: true,
        })
    }
    

    return (
        <div onClick={() => openCart()} className="cart-icon-container">
            <button className="cart-icon">shopping bag</button>
        </div>
    );
}

export default Cart;