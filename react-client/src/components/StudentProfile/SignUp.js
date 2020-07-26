import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';
import axios from '../../authentication/axios-user-management';

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
                    <li><Link to="/signin" className="nav-links text-link text-link-blue" aria-label="Sign up with stacklearner">Sign In</Link></li>
                </ul>
            </nav>
        </header>
    );
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userAlreadyExists: false
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
        }
        else {
            passwordInputField.type = "password";
            visibilityToggleButtonText.innerText = "Show";
        }
    }

    closeBanner = (event) => {
        const bannerIcon = event.target;
        const banner = bannerIcon.parentNode;
        banner.classList.remove('visible');
        banner.classList.add('hidden');
        this.setState({
          userAlreadyExists: false
        });
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        const user = { firstName, lastName, email, password };

        axios.post('/usermanagement/signup', user).then((res) => {
            if (res.status === 201) {
                localStorage.setItem("authToken",res.data.result.authToken);
                auth.authenticated=true;
                auth.user=res.data.result.user;
                auth.authToken=res.data.result.authToken;
                this.props.history.push('/student/dashboard');
            }
        }).catch((err)=>{
            if (err.response.status === 409) {
                this.setState({
                    userAlreadyExists: true
                });
            } else {
                this.setState({
                    error: true
                })
            }
        });
    }

    render() {
        const { firstName, lastName, email, password, userAlreadyExists, error } = this.state;

        return (
            <>
                <NavBar />
                <main className="gray-background">
                    <section className="container">
                        <div className="grid">
                            <div className="col-md-8 col-sm-12 offset-md-2 authentication-form-container">
                                <h1>Sign Up</h1>
                                <p className={userAlreadyExists ? "visible flash-banner pink-background" : "hidden"}>Ooops! a user with this e-mail already exists.<i className="fas fa-times" onClick={this.closeBanner}></i></p>
                                <p className={error ? "visible flash-banner pink-background" : "hidden"}>Ooops! an error occured while signing you up. Please refresh the page, and try again.<i className="fas fa-times" onClick={this.closeBanner}></i></p>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <div className="form-controls-group-outer">
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="first-name">First Name</label>
                                                <input type="text" name="firstName" id="first-name" value={firstName} onChange={this.handleChange} autoComplete="on" />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="last-name">Last Name</label>
                                                <input type="text" name="lastName" id="last-name" value={lastName} onChange={this.handleChange} autoComplete="on" />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-controls-group-outer last-form-controls-group-outer">
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="user-email">Email</label>
                                                <input type="email" name="email" id="user-email" value={email} onChange={this.handleChange} autoComplete="on"  />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="user-password">Password</label>
                                                <input type="password" name="password" id="user-password" value={password} ref={this.passwordField} onChange={this.handleChange} autoComplete="off" />
                                                <button type="button" id="password-visibility-toggle" aria-label="Show password" onClick={this.toggleVisibility}><span id="password-visibility-toggle-text" ref={this.toggleButton}>Show</span></button>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="form-button-container">
                                        <button type="submit" className="button button-medium button-accent-outline">Sign Up</button>
                                        <Link to="/signin" className="text-link text-link-small text-link-blue" aria-label="Sign up with stacklearner">Have an account? Sign In</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }
}

export default SignUp;