import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Link to="/" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
            <p>Made with <i className="fas fa-heart"></i> in Halifax &copy; 2020</p>
            <nav>
                <Link to="/">About Us</Link>
                <Link to="/">Contact Us</Link>
                <Link to="/">Privacy Policy</Link>
            </nav>
        </footer> 
    )
}

export default Footer;