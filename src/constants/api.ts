export const BASE_URL = 'http://localhost:3003';

// Authentication
export const LOGIN = '/api/user/loginAdmin';
export const REGISTER = '/user/registerAdmin';

// categories
export const GET_ALL_CATEGORIES = '/api/categories';
export const GET_CATEGORY_BY_ID = '/category/getCategory';
export const GET_CATEGORY_ALBUMS_BY_ID = '/category/getCategoryAlbums';
export const CREATE_CATEGORY = '/api/categories/create';
export const ADD_CATEGORY_ALBUM = '/api/albums/create';
export const EDIT_CATEGORY = '/api/categories/update';
export const DELETE_CATEGORY = '/api/categories/delete';
export const EDIT_CATEGORY_IMAGE = '/api/categories/updateThumbnail';

// albums
export const GET_ALL_ALBUMS = '/api/albums';
export const GET_ALBUMS_BY_ID = '/album/getAlbum';
export const CREATE_ALBUM = '/api/albums/create';
export const EDIT_ALBUM = '/api/albums/update';
export const DELETE_ALBUM = '/api/albums/delete';
export const ADD_PODCAST_TO_ALBUM = '/album//addPodcast';
export const ADD_ALBUM_RATING = '/album/addAlbumRating';
export const UPDATE_IMAGE = '/api/albums/updateThumbnail';
// podcasts
export const GET_ALL_PODCASTS = '/api/audios';
export const GET_PODCASTS_BY_ID = '/podcast/getPodcast';
export const GET_POPOLAR_PODCASTS = '/popularPodcast';
export const CREATE_PODCAST = '/api/audios/create';
export const EDIT_PODCAST = '/api/audios/update';
export const EDIT_PODCAST_IMAGE = '/api/audios/updateThumbnail';
export const DELETE_PODCAST = '/api/audios/delete';
