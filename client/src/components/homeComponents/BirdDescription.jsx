import BirdDescriptionImage from '../../assets/birdDescription.png'
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

function BirdDescription() {

    const {dispatch} = useContext(GlobalContext);

    const addToCart = () => {
        dispatch({
            type: 'SET_DISPLAY_CART',
            payload: true,
        })
    }

    return (
        <section className="bird-description-container">
            <img onClick={addToCart} src={BirdDescriptionImage} alt="" className="bird-description-image"/>
        </section>
    );
}

export default BirdDescription;