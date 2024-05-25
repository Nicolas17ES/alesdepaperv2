import SingleBird from './SingleBird' 
import { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";


function BirdsGrid({onDisplayBirdsData}) {

    const {dispatch, birds} = useContext(GlobalContext);

    if(!birds) return null;

    return (
        <div className="birds-grid-container">
            {birds.map((bird) => (
                <SingleBird bird={bird} onDisplayBirdsData={onDisplayBirdsData}/>
            ))}
        </div>
    );
}

export default BirdsGrid;