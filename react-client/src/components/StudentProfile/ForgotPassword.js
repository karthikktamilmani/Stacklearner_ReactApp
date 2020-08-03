// Author: Daksh Patel

import React, {Component, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';

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

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			error: false,
			success: false,
			message: ""
		}
		// this.passwordField = React.createRef();
		this.toggleButton = React.createRef();
	}

	setLocalStorage = (values) => {
		localStorage.setItem('authToken', values.data.result.authToken);
		this.props.history.push('/student/dashboard');
	}

	successCallback = (response) => {
		console.log(response);
		this.setState({
			success: true,
			message: response.data.message,
			error: false
		});
	}

	failureCallback = (error) => {
		console.log(error);
		console.log(error.response.data.message);
		this.setState({
			error: true,
			message: error.response.data.message,
			success: false
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {email} = this.state;
		auth.forgotPassword(email, this.successCallback, this.failureCallback);
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
			updated: 'NotYet'
		});
	}

	render() {
		const {email, password} = this.state;

		return (
			<>
				<NavBar/>
				<main className="gray-background">
					<section className="container">
						<div className="grid">
							<div className="col-md-8 col-sm-12 offset-md-2 forgotpassword-form-container">
								<h1>Forgot Password</h1>
								<form onSubmit={this.handleSubmit}>
									<fieldset>
										<div className="form-controls-group-outer last-form-controls-group-outer">
											<div className="form-controls-group-inner" id="forgot-password-control">
												<label htmlFor="user-email">Email</label>
												<input type="email" name="email" id="user-email" value={email} onChange={this.handleChange}
															 autoComplete="on" required disabled={this.state.success}/>
											</div>
										</div>
									</fieldset>
									<div className="form-button-container">
										<button type="submit" className="button button-medium button-accent-outline"
														disabled={this.state.success}>Submit
										</button>
										<div className="banner-container">
											<p
												className={this.state.success ? "visible flash-banner green-background" : "hidden"}>{this.state.message}<i
												className="fas fa-times" onClick={this.closeBanner}/></p>
											<p
												className={this.state.error ? "visible flash-banner pink-background" : "hidden"}>{this.state.message}<i
												className="fas fa-times" onClick={this.closeBanner}/></p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</section>
				</main>
				<Footer/>
			</>
		);
	}
}

export default ForgotPassword;
