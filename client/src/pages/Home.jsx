import BirdDescrition from '../components/homeComponents/BirdDescription'
import BirdGallery from '../components/homeComponents/BirdGallery'
import BirdDescription from '../components/homeComponents/BirdDescription'
import BirdsGrid from '../components/homeComponents/BirdsGrid'
import CartIcon from '../components/shared/Cart'
import { useState, useContext } from "react";


function Home() {

    const [displayBirdsData, setDisplayBirdsData] = useState(false);

    const displayBirdsDataFuntion = () => {
        setDisplayBirdsData(true)
    }

    return (
        <div className="page-container">
            <CartIcon/>
            <BirdsGrid onDisplayBirdsData={displayBirdsDataFuntion}/>
            {displayBirdsData && (
                <>
                    <BirdDescription/>
                    <BirdGallery/>
                </>
            )}
        </div>
    );
}

export default Home;