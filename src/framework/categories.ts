import axiosInstance from 'helpers/axiosInstance';
import {
	ADD_CATEGORY_ALBUM,
	GET_ALL_CATEGORIES,
	GET_CATEGORY_ALBUMS_BY_ID,
	GET_CATEGORY_BY_ID
} from '../constants/api';

export async function getCategories({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_ALL_CATEGORIES + query);
	return response.data;
}

export async function getCategoryById({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_CATEGORY_BY_ID + query);
	return response.data;
}

export async function getCategoryAlbumsById({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_CATEGORY_ALBUMS_BY_ID + query);
	return response.data;
}

export async function addCategory(data: FormData) {
	const response = await axiosInstance.post(ADD_CATEGORY_ALBUM, data);
	return response.data;
}
