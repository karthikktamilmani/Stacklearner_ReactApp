/**
 * Payments Component
 *
 * @author      :: Karthikk Tamil Mani, B00838575
 */


import React, {Component} from "react";
import SavedCards from './Cards/';
import History from './History/';
import {Link} from 'react-router-dom';
import "./index.scss";
import {fadeIn} from 'react-animations';
import Radium, {StyleRoot} from 'radium';

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	}
}


export default class Payment extends Component {
	render() {
		return (
			<div className="payment-wrapper">
				<header>
					<nav className="navbar dark-navbar">
						<Link to="/student/dashboard" className="logo"><i
							className="logo-icon fas fa-terminal"/>stacklearner</Link>
						<StyleRoot>
							<div style={styles.fadeIn}>
								<ul className="main-nav">
									<li><Link to="/student/dashboard" className="nav-links"
														aria-label="Go to your student\'s dashboard"><i
										className="fas fa-angle-left"/>Back To Dashboard</Link></li>
								</ul>
							</div>
						</StyleRoot>
					</nav>
				</header>
				<div className="main-content">
					<div
						className="d-flex justify-content-center mt-3"
						style={{
							maxWidth: "1100px",
							margin: "0 auto",
							width: "100%",
							height: "fit-content",
						}}
					>
						<div className="d-flex flex-row">
							<div
								className="nav flex-column nav-pills pr-4"
								id="v-pills-tab"
								role="tablist"
								style={{minWidth: "100px"}}
								aria-orientation="vertical"
							>
								<a
									className="nav-link active"
									id="v-pills-home-tab"
									data-toggle="pill"
									href="#v-pills-home"
									role="tab"
									aria-controls="v-pills-home"
									aria-selected="true"
								>
									Saved Cards
								</a>
								<a
									className="nav-link"
									id="v-pills-profile-tab"
									data-toggle="pill"
									href="#v-pills-profile"
									role="tab"
									aria-controls="v-pills-profile"
									aria-selected="false"
								>
									Payment History
								</a>
							</div>
							<div className="tab-content" id="v-pills-tabContent"
									 style={{width: "calc(100vw - 200px)", maxWidth: "600px"}}>
								<div
									className="tab-pane fade show active"
									id="v-pills-home"
									role="tabpanel"
									aria-labelledby="v-pills-home-tab"
								>
									<SavedCards></SavedCards>
								</div>
								<div
									className="tab-pane fade"
									id="v-pills-profile"
									role="tabpanel"
									aria-labelledby="v-pills-profile-tab"
								>
									<History></History>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
