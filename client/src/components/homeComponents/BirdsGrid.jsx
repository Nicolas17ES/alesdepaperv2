import SingleBird from './SingleBird' 
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";


function BirdsGrid({onDisplayBirdsData, displayBirdsData}) {

    const {dispatch, birds} = useContext(GlobalContext);

    if(!birds) return null;

    return (
        <div style={{width: displayBirdsData ? '30%' : '100%'}} className="birds-grid-container">
            {birds.map((bird) => (
                <SingleBird bird={bird} onDisplayBirdsData={onDisplayBirdsData}/>
            ))}
        </div>
    );
}

export default BirdsGrid;