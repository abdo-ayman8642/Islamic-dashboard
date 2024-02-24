import axios from 'axios';
import { BASE_URL } from 'constants/api';
import { LocalStorage } from 'enums/localStorage';

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Do something before request is sent
		const accessToken: string | null = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

		if (accessToken) config.headers!.Authorization = `Bearer ${accessToken}`;

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data.apiStatus) {
			response.data = {
				apiStatus: response.data.apiStatus,
				data: JSON.parse(response.data.data)
			};
		}
		return response;
	},
	(error) => {
		// Handle error responses
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if (error.response.status === 401) {
				localStorage.clear();
				window.location.href = '/login';
			}
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
		}
		console.log(error.config);
		return Promise.reject(error);
	}
);

export default axiosInstance;
