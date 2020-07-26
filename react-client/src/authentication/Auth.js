import axios from "./axios-user-management";

class Auth {
	constructor() {
		this.authenticated = false;
		this.authToken = localStorage.getItem("authToken") || null;
		this.user = null;
	}

	login(values, callback) {
		const credentials = {
			email: values.email,
			password: values.password
		}
		// console.log(credentials);
		axios.post("/usermanagement/signin", credentials)
			.then((response) => {
				// console.log(response);
				this.authenticated = true;
				this.user=response.data.result.user;
				callback(response);
			})
			.catch(
				(error) => {
					this.authenticated = false;
					// console.log(error.response.data.message);
					// console.log("error message: ", error.message);
					alert('Incorrect username or password.');
				}
			)
	}

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
	
	isAuthenticated(successCallback, failureCallback) {
		if (this.authenticated) {
			successCallback();
		} else if (this.authToken) {
			axios.get("/usermanagement/getuser")
				.then((res) => {
					if (res && res.status === 200) {
						this.authenticated=true;
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
			this.user=null;
			this.authenticated=false;
			failureCallback();
			localStorage.clear();
		}
	}
}

export default new Auth();
