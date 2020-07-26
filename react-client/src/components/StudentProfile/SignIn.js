import React, { Component, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Common/Footer';
import auth from '../../authentication/Auth';

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
                    <li><Link to="/signup" className="nav-links text-link text-link-blue" aria-label="Sign up with stacklearner">Sign Up</Link></li>
                </ul>
            </nav>
        </header>
    );
}

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
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

    setLocalStorage = (values) => {
        localStorage.setItem('authToken', values.data.result.authToken);
        this.props.history.push('/student/dashboard');
    }

    
    handleSubmit = (event) => {
        event.preventDefault();
        const user = this.state;
        auth.login(user, this.setLocalStorage);
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }
    
    render() {
        const { email, password } = this.state;

        return (
            <>
                <NavBar />
                <main className="gray-background">
                    <section className="container">
                        <div className="grid">
                            <div className="col-md-8 col-sm-12 offset-md-2 authentication-form-container">
                                <h1>Sign In</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <div className="form-controls-group-outer last-form-controls-group-outer">
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="user-email">Email</label>
                                                <input type="email" name="email" id="user-email" value={email} onChange={this.handleChange} autoComplete="on" required />
                                            </div>
                                            <div className="form-controls-group-inner">
                                                <label htmlFor="user-password">Password</label>
                                                <input type="password" name="password" id="user-password" value={password} ref={this.passwordField} onChange={this.handleChange} autoComplete="off" required />
                                                <button type="button" id="password-visibility-toggle" aria-label="Show password" onClick={this.toggleVisibility}><span id="password-visibility-toggle-text" ref={this.toggleButton}>Show</span></button>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="form-button-container">
                                        <button type="submit" className="button button-medium button-accent-outline">Sign In</button>
                                        <Link to="/signup" className="text-link text-link-small text-link-blue" aria-label="Sign up with stacklearner">No account? Sign Up</Link>
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

export default SignIn;