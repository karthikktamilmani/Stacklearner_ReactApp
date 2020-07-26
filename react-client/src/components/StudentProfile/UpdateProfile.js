// Author: Daksh Patel

import React, { Component } from 'react';
import auth from '../../authentication/Auth';
import axios from '../../authentication/axios-user-management';

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: auth.user.firstName,
            lastName: auth.user.lastName,
            email: auth.user.email,
            password: '',
            updated: 'NoYet'
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
            updated: 'NotYet'
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
        const user = this.state;

        console.log(user);
        axios.patch('/usermanagement/updateprofile', user).then((res) => {
            console.log(res);
            if(res.status===200) {
                console.log(localStorage.getItem("authToken"));
                auth.authenticated=true;
                auth.user=res.data.result.user;
                this.setState({
                    updated: 'Yes'
                  });
            } else {
                this.setState({
                   updated: 'No'
                });
            }
        })
        .catch((err)=>{
            this.setState({
                updated: 'No'
            })
        });
    }

    render() {
        const { firstName, lastName, email, password, updated } = this.state;

        return (
            <>
                <main className="gray-background">
                    <section className="container">
                        <div className="grid">
                            <div className="col-md-8 col-sm-12 offset-md-2 authentication-form-container">
                                <h1>Your Profile</h1>
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
                                        <button type="submit" className="button button-medium button-accent-outline">Update Profile</button>
                                        <div className="banner-container">
                                            <p className={updated === 'Yes' ? "visible flash-banner green-background" : "hidden"}>Profile updated successfully.<i className="fas fa-times" onClick={this.closeBanner}></i></p>
                                            <p className={updated === 'No' ? "visible flash-banner pink-background" : "hidden"}>Profile could not be updated.<i class="fas fa-times" onClick={this.closeBanner}></i></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

export default UpdateProfile;