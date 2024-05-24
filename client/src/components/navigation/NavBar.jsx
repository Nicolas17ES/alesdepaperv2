 import {Link} from 'react-router-dom'

function NavBar() {

    return (
        <nav className="navbar-container">
            <ul className="navbar-links">
                <Link to="/home" className="navbar-link">ales de paper</Link>
                <Link to="/colaborations" className="navbar-link">colaborations</Link>
                <Link to="/about" className="navbar-link">about</Link>
            </ul>
        </nav>
    );
}

export default NavBar;