 import {useState} from 'react'
 import { useContext, useRef } from "react";
import GlobalContext from "../../context/GlobalContext";

function ContinueShopping() {

    const { dispatch, displayCart } = useContext(GlobalContext);

    const continueShopping = () => {

        dispatch({
            type: 'SET_DISPLAY_CART',
            payload: false,
        })

        dispatch({
            type: 'SET_DISPLAY_BIRDS_DATA',
            payload: false,
        })

        dispatch({ 
            type: 'SET_SINGLE_BIRD', 
            payload: null 
        });

    }

    return (
            <button style={{color: displayCart ? 'white' : 'black'}} onClick={continueShopping}  className="continue-shopping-button">continue shopping</button>
    );
}

export default ContinueShopping;