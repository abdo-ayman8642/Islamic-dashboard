import { CREATE_ALBUM, GET_ALBUMS_BY_ID, GET_ALL_ALBUMS } from 'constants/api';
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
