import {
	ADD_ADMIN,
	CHANGE_PASSWORD,
	DELETE_PODCAST,
	DELETE_USER,
	EDIT_PODCAST,
	EDIT_PODCAST_IMAGE,
	EDIT_USER,
	GET_ALL_PODCASTS,
	GET_CATEGORY_ALBUMS_BY_ID,
	GET_CATEGORY_BY_ID,
	GET_STAT,
	GET_USERS,
	RESET_PASSWORD,
	TOGGLE_USER_SUBSCRIPTION
} from '../constants/api';
import axiosInstance from 'helpers/axiosInstance';

export async function getPodcasts({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_ALL_PODCASTS + query);
	return response.data;
}

export async function getPodcastById({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_CATEGORY_BY_ID + query);
	return response.data;
}

export async function getPopularPodcasts({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_CATEGORY_ALBUMS_BY_ID + query);
	return response.data;
}

export async function getUsers({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_USERS + query);
	return response.data;
}

export async function getStat({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_STAT + query);
	return response.data;
}

export async function editUser(data: any) {
	const response = await axiosInstance.post(EDIT_USER, data);
	return response.data;
}

export async function deleteUser(data: any) {
	const response = await axiosInstance.post(DELETE_USER, data);
	return response.data;
}

export async function toggleUserSubscription(data: any) {
	const response = await axiosInstance.post(TOGGLE_USER_SUBSCRIPTION, data);
	return response.data;
}

export async function addAdmin(data: any) {
	const response = await axiosInstance.post(ADD_ADMIN, data);
	return response.data;
}

export async function changeUserPassword(data: any) {
	const response = await axiosInstance.post(CHANGE_PASSWORD, data);
	return response.data;
}

export async function resetUserPassword(token: string, data: any) {
	const response = await axiosInstance.post(RESET_PASSWORD + `/${token}`, data);
	return response.data;
}

export async function deleteAudio({ query }: any) {
	const response = await axiosInstance.delete(DELETE_PODCAST + query);
	return response.data;
}

export async function editAudio(data: any) {
	const response = await axiosInstance.patch(EDIT_PODCAST, data);
	return response.data;
}

export async function editImage(data: FormData) {
	const response = await axiosInstance.post(EDIT_PODCAST_IMAGE, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: '*/*'
		}
	});

	return response.data;
}
