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
