// Author: Daksh Patel

// This file is used to create the axios instance with pre-defined interceptor
// containing the authorization header. It takes the auth token from local-storage,
// for basic authentication, encodes it in base64 and adds the encoded string to 
// the authorization header.

import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: "https://stacklearner-a4.herokuapp.com/"
})

axiosInstance.interceptors.request.use((config) => {

	const token = localStorage.getItem('authToken') || "";
	const password = "";
	const basicAuth = 'Basic ' + btoa(`${token}:${password}`)
	config.headers.Authorization = basicAuth;

	return config;
})

export default axiosInstance;
