 import {Link} from 'react-router-dom'
 import {useState} from 'react'
 import { useContext, useRef } from "react";
import GlobalContext from "../../context/GlobalContext";


function NavBar() {

    const { displayCart } = useContext(GlobalContext);

    return (
        <footer className="footer-container">
            <ul className="footer-links">
                <a href="mailto:dosalesdepaper@gmail.com"href="" className="footer-link">dosalesdepaper@gmail.com</a>
                <a style={{color: displayCart ? 'white' : 'black'}} href="https://www.instagram.com" target="_blank" className="footer-link">@ales.de.paper</a>
            </ul>
        </footer>
    );
}

export default NavBar;