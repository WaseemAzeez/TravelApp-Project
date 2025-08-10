import '../styles/Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/globe.png';
import pIcon from '../assets/p-icon.png';


export default function Header() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <header>
            <nav>
                <div className="branding">
                    <img src={logo} alt="logo" />
                    <h1 className="title">My Travel Journal</h1>
                </div>

                {/* Hamburger Icon */}
                <div className="hamburger" onClick={toggleMenu}>
                    ☰
                </div>

                {/* Navbar Links */}
                <div className={`navbar ${menuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    <Link to="/packages" onClick={() => setMenuOpen(false)}>Packages</Link>
                </div>

                {/* Sign Section */}
                <div className="sign">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                    <img src={pIcon} alt="p-icon" />
                </div>
            </nav>
        </header>
    );
}
