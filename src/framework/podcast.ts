import { GET_ALL_PODCASTS, GET_CATEGORY_ALBUMS_BY_ID, GET_CATEGORY_BY_ID } from '../constants/api';
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
