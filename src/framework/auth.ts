import axios from 'axios';
import { BASE_URL, LOGIN } from 'constants/api';

export async function signIn(params: any) {
	let { data } = params;
	const _params = {
		email: data.email,
		password: data.password
	};
	const response = await axios.post(BASE_URL + LOGIN, _params);
	return response.data;
}

// export async function authGuard() {
// 	const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);
// 	if (!token) throw new Error('Token not found');
// 	const response = await axios.get(BASE_URL + REFRESH_TOKEN + '?refreshToken=' + token);
// 	return response.data.user;
// }
