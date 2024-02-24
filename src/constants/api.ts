export const BASE_URL = 'https://islamic-api.tridmark.com';

// Authentication
export const LOGIN = '/user/loginAdmin';
export const REGISTER = '/user/registerAdmin';

// categories
export const GET_ALL_CATEGORIES = '/api/categories';
export const GET_CATEGORY_BY_ID = '/category/getCategory';
export const GET_CATEGORY_ALBUMS_BY_ID = '/category/getCategoryAlbums';
export const CREATE_CATEGORY = '/category/createCategory';
export const ADD_CATEGORY_ALBUM = '/api/albums/create';
export const EDIT_CATEGORY = '/category/editCategory';
export const DELETE_CATEGORY = '/category/deleteCategory';

// albums
export const GET_ALL_ALBUMS = '/api/albums';
export const GET_ALBUMS_BY_ID = '/album/getAlbum';
export const CREATE_ALBUM = '/api/albums/create';
export const EDIT_ALBUM = '/album/editAlbum';
export const DELETE_ALBUM = '/album/deleteAlbum';
export const ADD_PODCAST_TO_ALBUM = '/album//addPodcast';
export const ADD_ALBUM_RATING = '/album/addAlbumRating';

// podcasts
export const GET_ALL_PODCASTS = '/api/audios';
export const GET_PODCASTS_BY_ID = '/podcast/getPodcast';
export const GET_POPOLAR_PODCASTS = '/popularPodcast';
export const CREATE_PODCAST = '/podcast/createPodcast';
export const EDIT_PODCAST = '/podcast/editAlbum';
export const DELETE_PODCAST = '/podcast/deletePodcast';
