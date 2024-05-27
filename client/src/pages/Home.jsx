import BirdDescrition from '../components/homeComponents/BirdDescription'
import BirdGallery from '../components/homeComponents/BirdGallery'
import BirdDescription from '../components/homeComponents/BirdDescription'
import BirdsGrid from '../components/homeComponents/BirdsGrid'
import CartIcon from '../components/shared/Cart'
import Payment from '../components/cartComponents/Payment'
import { useState, useContext } from "react";
import GlobalContext from "../context/GlobalContext";


function Home() {

    const {displayCart} = useContext(GlobalContext);

    const [displayBirdsData, setDisplayBirdsData] = useState(false);

    const displayBirdsDataFuntion = () => {
        setDisplayBirdsData(true)
    }

//     useEffect(() => {
//     if (displayBirdsData) {
//       // Block Y-axis scrolling
//       document.body.style.overflowY = 'hidden';
//     }

//     return () => {
//       // Revert to default scroll behavior
//       document.body.style.overflowY = 'auto';
//     };
//   }, [displayBirdsData]);
  
// style={{maxHeight: displayBirdsData ? '0vh' : 'auto'}}
    return (
        <div className="page-container">
            <CartIcon/>
            <BirdsGrid displayBirdsData={displayBirdsData} onDisplayBirdsData={displayBirdsDataFuntion}/>
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