import { useEffect, useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function PickUpDetails() {

  return (

    <div className="local-details-container">
        <h3 className="local-title">Local Pick up: <span className="local-adress">C / Sugranyes 14 Sobre ático 3a</span></h3>
        <h3 className="local-title">Spain shipping: <span className="local-adress">8¢ - Envío Semanal</span></h3>
        <h3 className="local-title">Internatinal shipping: <span className="local-adress">send an email to dosalesdepaper@gmail.com</span></h3>

        <p className="local-free-orders">Orders up to 100E have free shipment!</p>
    </div>
    
  );
  
}

export default PickUpDetails;