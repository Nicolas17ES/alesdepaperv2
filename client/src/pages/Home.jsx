import BirdDescrition from '../components/homeComponents/BirdDescription'
import BirdGallery from '../components/homeComponents/BirdGallery'
import BirdDescription from '../components/homeComponents/BirdDescription'
import BirdsGrid from '../components/homeComponents/BirdsGrid'
import CartIcon from '../components/shared/Cart'
import Payment from '../components/cartComponents/Payment'
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";


function Home() {

    const {displayCart, dispatch, displayBirdsData, cartItems} = useContext(GlobalContext);

    useEffect(() => {

        if (displayBirdsData) {

        // Block Y-axis scrolling
        document.body.style.overflowY = 'hidden';

        }

        return () => {
        // Revert to default scroll behavior

        document.body.style.overflowY = 'auto';

        };

    }, [displayBirdsData]);

    // on unmount reset states

    useEffect(() => {

        return () => {

            dispatch({
                type: 'SET_DISPLAY_CART',
                payload: false,
            });

            dispatch({
                type: 'SET_DISPLAY_BIRDS_DATA',
                payload: false,
            });

            dispatch({ 
                type: 'SET_SINGLE_BIRD', 
                payload: null 
            });

        };
  }, [dispatch]);

  
    return (

        <div className="page-container">

            {!displayCart && <CartIcon/>}

            <BirdsGrid />

            {displayBirdsData && (

                <>
                    <BirdDescription/>

                    {!displayCart ? (

                        <BirdGallery/>

                    ) : (

                        <Payment origin={false}/>

                    )}

                </>

            )}

            {(!displayBirdsData && displayCart) &&  <Payment origin={true}/>}

        </div>

    );

}

export default Home;