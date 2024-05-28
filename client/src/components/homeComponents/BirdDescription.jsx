import BirdDescriptionImage from '../../assets/birdDescription.png'
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

function BirdDescription() {

    const {dispatch, singleBird, cartItems} = useContext(GlobalContext);

    const addToCart = () => {

        dispatch({
            type: 'SET_DISPLAY_CART',
            payload: true,
        })

        dispatch({
            type: 'SET_ADD_TO_CART',
            payload: singleBird,
        })
        
    }

    return (

        <section className="bird-description-container">

            <img onClick={addToCart} src={BirdDescriptionImage} alt="" className="bird-description-image"/>

        </section>

    );

}

export default BirdDescription;