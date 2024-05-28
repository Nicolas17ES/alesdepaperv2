import BirdDescrition from '../components/homeComponents/BirdDescription'
import BirdGallery from '../components/homeComponents/BirdGallery'
import BirdDescription from '../components/homeComponents/BirdDescription'
import BirdsGrid from '../components/homeComponents/BirdsGrid'
import CartIcon from '../components/shared/Cart'
import Payment from '../components/cartComponents/Payment'
import { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";


function Home() {

    const {displayCart, disptach, displayBirdsData, cartItems} = useContext(GlobalContext);
console.log("cartItems", cartItems)
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

                        <Payment/>

                    )}

                </>

            )}

        </div>

    );

}

export default Home;