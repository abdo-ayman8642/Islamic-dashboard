import {
	CREATE_PODCAST,
	DELETE_PODCAST,
	EDIT_PODCAST,
	EDIT_PODCAST_IMAGE,
	GET_ALL_PODCASTS,
	GET_CATEGORY_ALBUMS_BY_ID,
	GET_CATEGORY_BY_ID,
	PLAY_AUDIO
} from '../constants/api';
import axiosInstance from 'helpers/axiosInstance';

export async function getPodcasts({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_ALL_PODCASTS + query);
	return response.data;
}
export async function playAudios({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(PLAY_AUDIO + query);
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

export async function addAudio(data: FormData) {
	const response = await axiosInstance.post(CREATE_PODCAST, data);
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
