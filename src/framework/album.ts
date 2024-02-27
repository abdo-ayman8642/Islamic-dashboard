import { CREATE_ALBUM, DELETE_ALBUM, EDIT_ALBUM, GET_ALBUMS_BY_ID, GET_ALL_ALBUMS, UPDATE_IMAGE } from 'constants/api';
import axiosInstance from 'helpers/axiosInstance';

export async function getAlbums({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_ALL_ALBUMS + query);
	return response.data;
}

export async function getAlbumById({ queryKey }: any) {
	const { query } = queryKey[1];
	const response = await axiosInstance.get(GET_ALBUMS_BY_ID + query);
	return response.data;
}

export async function addAlbum(data: FormData) {
	const response = await axiosInstance.post(CREATE_ALBUM, data);
	return response.data;
}

export async function editAlbum(data: any) {
	const response = await axiosInstance.patch(EDIT_ALBUM, data);
	return response.data;
}

export async function deleteAlbum({ query }: any) {
	const response = await axiosInstance.delete(DELETE_ALBUM + query);
	return response.data;
}

export async function editImage(data: FormData) {
	const response = await axiosInstance.post(UPDATE_IMAGE, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Accept: '*/*'
		}
	});

	return response.data;
}
