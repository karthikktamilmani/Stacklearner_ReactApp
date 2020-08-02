// Author: Daksh Patel

// This file is used to create the axios instance with pre-defined interceptor
// containing the authorization header. It takes the auth token from local-storage,
// for basic authentication, encodes it in base64 and adds the encoded string to
// the authorization header.

import axios from 'axios';

let BASE_URL;

if (window.location.href.includes('localhost')) {
	BASE_URL = 'http://localhost:4000';
} else {
	BASE_URL = "https://stacklearner-backend.herokuapp.com/";
}

const axiosInstance = axios.create({
	baseURL: BASE_URL
})

axiosInstance.interceptors.request.use((config) => {

	const token = localStorage.getItem('authToken') || "";
	const password = "";
	config.headers.Authorization = 'Basic ' + btoa(`${token}:${password}`);

	return config;
})
console.log(axiosInstance, "");
export default axiosInstance;
