import axiosInstance from 'helpers/axiosInstance';
import {
	CREATE_CATEGORY,
	DELETE_CATEGORY,
	EDIT_CATEGORY,
	EDIT_CATEGORY_IMAGE,
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
	const response = await axiosInstance.post(CREATE_CATEGORY, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: '*/*'
		}
	});

	return response.data;
}

export async function deleteCategory({ query }: any) {
	const response = await axiosInstance.delete(DELETE_CATEGORY + query);
	return response.data;
}

export async function editCategory(data: any) {
	const response = await axiosInstance.patch(EDIT_CATEGORY, data);
	return response.data;
}

export async function editImage(data: FormData) {
	const response = await axiosInstance.post(EDIT_CATEGORY_IMAGE, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: '*/*'
		}
	});

	return response.data;
}
