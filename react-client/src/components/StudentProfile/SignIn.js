// Author: Daksh Patel

import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';
import Radium, {StyleRoot} from "radium";
import {bounceInUp, fadeIn, fadeInDown, fadeInLeft, fadeInUp} from "react-animations";

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	},
	fadeInLeft: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
	},
	bounceInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
	},
	fadeInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
	},
	fadeInDown: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
	}
}

// This class returns the component of navbar when user is not logged in.
const NavBar = () => {
	useEffect(() => {
		const mainNav = document.querySelector(".main-nav");
		const navbarToggle = document.querySelector(".navbar-toggle");
		navbarToggle.addEventListener('click', () => {
			mainNav.classList.toggle('active');
		});
	});

	return (
		<header>
			<nav className="navbar light-navbar">
                <span className="navbar-toggle">
                    <i className="fas fa-bars"></i>
                </span>
				<Link to="/" className="logo"><i className="logo-icon fas fa-terminal"></i>stacklearner</Link>
				<ul className="main-nav">
					<li><a href="/" className="nav-links" aria-label="Go back to home page">Home</a></li>
					<li><Link to="/signup" className="nav-links text-link text-link-blue" aria-label="Sign up with stacklearner">Sign
						Up</Link></li>
				</ul>
			</nav>
		</header>
	);
}

// This class returns the component of signin form.

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: false,
			message: ""
		}
		this.passwordField = React.createRef();
		this.toggleButton = React.createRef();
	}

	toggleVisibility = () => {
		const passwordInputField = this.passwordField.current;
		const visibilityToggleButtonText = this.toggleButton.current;

		if (passwordInputField.type === "password") {
			passwordInputField.type = "text";
			visibilityToggleButtonText.innerText = "Hide";
		} else {
			passwordInputField.type = "password";
			visibilityToggleButtonText.innerText = "Show";
		}
	}

	successCallback = (values) => {
		const {authToken, user} = values.data.result;
		localStorage.setItem('authToken', authToken);
		console.log(user.roles, authToken);
		if (user.roles.length > 1) {
			this.props.history.push('/instructor/dashboard');
		} else {
			this.props.history.push('/student/dashboard');
		}
	}

	failureCallback = (error) => {
		console.log(error.response);
		let message;
		const {retryTime} = error.response.data.result;
		if (retryTime) {
			message = `${error.response.data.message} Please try again${'  '}after ${retryTime.minutes} minutes and ${retryTime.seconds} seconds.`;
		} else {
			message = error.response.data.message;
		}
		this.setState({error: true, message: message});

	}

	handleSubmit = (event) => {
		event.preventDefault();
		const user = this.state;
		auth.login(user, this.successCallback, this.failureCallback);
	}

	handleChange = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		this.setState({
			[name]: value
		});
	}
	closeBanner = (event) => {
		const bannerIcon = event.target;
		const banner = bannerIcon.parentNode;
		banner.classList.remove('visible');
		banner.classList.add('hidden');
		this.setState({
			error: false,
			success: false,
			message: ""
		});
	}

	render() {
		const {email, password} = this.state;

		return (
			<>
				<NavBar/>
				<main className="gray-background">
					<section className="container">
						<StyleRoot>
							<div style={styles.fadeInUp}>
								<div className="grid">
									<div className="col-md-8 col-sm-12 offset-md-2 authentication-form-container">
										<h1>Sign In</h1>
										<form onSubmit={this.handleSubmit}>
											<fieldset>
												<div className="form-controls-group-outer last-form-controls-group-outer">
													<div className="form-controls-group-inner">
														<label htmlFor="user-email">Email</label>
														<input type="email" name="email" id="user-email" value={email} onChange={this.handleChange}
																	 autoComplete="on" required/>
													</div>
													<div className="form-controls-group-inner">
														<label htmlFor="user-password">Password</label>
														<input type="password" name="password" id="user-password" value={password}
																	 ref={this.passwordField} onChange={this.handleChange} autoComplete="off" required/>
														<button type="button" id="password-visibility-toggle" aria-label="Show password"
																		onClick={this.toggleVisibility}><span id="password-visibility-toggle-text"
																																					ref={this.toggleButton}>Show</span></button>
													</div>
												</div>
											</fieldset>
											<div className="form-button-container">
												<button type="submit" className="button button-medium button-accent-outline">Sign In</button>
												<div className="banner-container w-50">
													<p
														className={this.state.error ? "visible flash-banner pink-background" : "hidden"}>{this.state.message}<i
														className="fas fa-times" onClick={this.closeBanner}/></p>
												</div>
												<Link to="/signup" className="text-link text-link-small text-link-blue"
															aria-label="Sign up with stacklearner">No account? Sign Up</Link>
											</div>
											<div className="form-button-container form-button-container-last">
												<Link to="/forgotpassword" className="text-link text-link-small text-link-red"
															aria-label="Click here to reset your password.">Forgot password?</Link>
											</div>
										</form>
									</div>
								</div>
							</div>
						</StyleRoot>

					</section>
				</main>
				<Footer/>
			</>
		);
	}
}

export default SignIn;
