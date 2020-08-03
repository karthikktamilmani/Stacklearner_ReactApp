// Author: Daksh Patel

import React from 'react';
import {Link} from 'react-router-dom';
import {fadeIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	}
}
// This is the header component when the user (student) is logged in.
const Header = () => {
	return (
		<header>
			<nav className="navbar dark-navbar">
                <span className="navbar-toggle">
                    <i className="fas fa-bars"/>
                </span>
				<Link to="/student/dashboard" className="logo"><i className="logo-icon fas fa-terminal"/>stacklearner</Link>
				<StyleRoot>
					<div style={styles.fadeIn}>
						<ul className="main-nav">
							<li><Link to="/student/dashboard" className="nav-links" aria-label="Go to your student\'s dashboard"><i
								className="fas fa-angle-left"/>Back To Dashboard</Link></li>
						</ul>
					</div>
				</StyleRoot>

			</nav>
		</header>
	);
}

export default Header;
