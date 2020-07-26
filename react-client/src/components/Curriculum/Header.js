// Auhtor: Mansoor Ghazi

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../authentication/Auth';

const Header = (props) => {
    useEffect(() => {
        const mainNav = document.querySelector(".main-nav");
        const navbarToggle = document.querySelector(".navbar-toggle");
        navbarToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    });

    const { clearLocalStorage } = props;
    const { firstName } = auth.user;

    return (
        <header>
            <nav className="navbar dark-navbar ">
                <span className="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </span>
                <Link to="/student/dashboard" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
                <ul className="main-nav">
                <li className="nav-item"><a onClick={() => auth.logout(clearLocalStorage)} href="#" className="nav-links mr-3">Sign Out</a></li>
                    <li><Link to="/student/profile" className="nav-links" aria-label="Go to your profile"><i className="far fa-user"></i>{firstName}</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;