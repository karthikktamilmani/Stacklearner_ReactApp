// Author: Daksh Patel

// The class Auth has a singleton instance which store the state of whether the
// user is authenticated or not. Moreover, it provides a class method to login
// which updates the login state.

import axios from "./axios-user-management";


class Auth {
	constructor() {
		this.authenticated = false;
		this.authToken = localStorage.getItem("authToken") || null;
		this.user = null;
	}

	// The method takes the payload and success callback as an arguement.
	login(values, successCallback, failureCallback) {
		const credentials = {
			email: values.email,
			password: values.password
		}
		// console.log(credentials);
		axios.post("/usermanagement/signin", credentials)
			.then((response) => {
				// console.log(response);
				this.authenticated = true;
				console.log(this.authenticated);
				this.user = response.data.result.user;
				successCallback(response);
			})
			.catch(
				(error) => {
					this.authenticated = false;
					failureCallback(error);
					// console.log(error.response.data.message);
					// console.log("error message: ", error.message);
					// alert('Incorrect username or password.');
				}
			)
	}

	forgotPassword(email, successCallback, failureCallback) {
		const body = {
			email: email,
			currURL: window.location.origin
		}

		axios.post("/usermanagement/forgotpassword", body)
			.then((response) => {
				successCallback(response);
			})
			.catch((error) => {
				failureCallback(error);
			})
	}

	changePassword(body, successCallback, failureCallback) {

		axios.post("/usermanagement/changepassword", body)
			.then((response) => {
				successCallback(response);
			})
			.catch((error) => {
				failureCallback(error);
			})
	}

	// The method logout takes the success callback as an argument

	async logout(callback) {
		let response;
		try {
			response = await axios.post("/usermanagement/signout");
			callback();
			console.log(response);
		} catch (e) {
			console.log(response);
			console.log(e);
		}
		return response.status === 200;
	}

	// 	The function isAuthenticated takes in successCallback and failureCallback
	// as arguments, and executes success callback if user is authenticated, else
	// executes failure callback

	isAuthenticated(successCallback, failureCallback) {
		// console.log(axios);
		if (this.authenticated) {
			successCallback();
		} else if (this.authToken) {
			axios.get("/usermanagement/getuser")
				.then((res) => {
					if (res && res.status === 200) {
						this.authenticated = true;
						this.user = res.data.result.user;
						successCallback()
					} else {
						this.authenticated=false;
						this.user = null;
						console.log('not valid')
						failureCallback();
						localStorage.clear();

					}
				})
				.catch(() => {
					this.user=null;
					this.authenticated=false;
					console.log('not valid');
					failureCallback()
					localStorage.clear();
				})
		} else {
			this.user = null;
			this.authenticated = false;
			failureCallback();
			// localStorage.clear();
		}
	}
}

// exporting singleton instance.
export default new Auth();
