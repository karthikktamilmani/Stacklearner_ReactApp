import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar dark-navbar">
                <span className="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </span>
                <Link to="/" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
                <ul className="main-nav">
                    <li><Link to="/student/dashboard" className="nav-links" aria-label="Go to your student\'s dashboard"><i className="fas fa-angle-left"></i>Back To Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;