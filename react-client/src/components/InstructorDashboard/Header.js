// Auhtor: Mansoor Ghazi
// Author: Ravi Patel

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../../authentication/Auth';

const Header = (props) => {
    useEffect(() => {
        const mainNav = document.querySelector(".main-nav");
        const navbarToggle = document.querySelector(".navbar-toggler");
        navbarToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    });

    const { clearLocalStorage, firstName } = props;

    return (
      <header>
        <nav className="navbar dark-navbar navbar-expand-lg  ">
          <Link to="/instructor/dashboard" className="logo navbar-brand"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="main-nav navbar-nav ml-auto">
              <li className="nav-item"><a onClick={() => auth.logout(clearLocalStorage)} href="#" className="nav-links mr-3">Sign Out</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="far fa-user"></i>{firstName}
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <Link to="/student/profile" className="dropdown-item">Your Profile</Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </header>
    );
}

export default Header;