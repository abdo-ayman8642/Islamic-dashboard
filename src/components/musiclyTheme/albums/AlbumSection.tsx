'use client';
import { CircularProgress, Grid, Stack } from '@mui/material';
import AlbumCard from './AlbumCard';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import AddIcon from '@mui/icons-material/Add';
import { addAlbum, deleteAlbum, editAlbum, editImage, getAlbums } from 'framework/album';
import FormEdit from './partials/FormEdit';
import { getCategories } from 'framework/categories';
import FormDelete from './partials/FormDelete';
import { Category } from '../categories/CategorySection';
import ThumbnailEdit from './partials/ThumbnailEdit';
import SearchField from 'components/Header/partials/SearchField';

interface Information {
	_id: string;
	lang: string;
	value: string;
}

interface Audio {
	_id: string;
	title: Information[];
	description: Information[];
	isFree: boolean;
	albums: Album[];
	rating: number;
	createdAt: string;
	thumbnail: string;
}
export interface Album {
	_id: string;
	audios: Audio[];
	description: Information[];
	title: Information[];
	category: string[];
	thumbnail: string;
	rating: number;
	slug: string;
	userRates?: [
		{
			userId: string;
			rate: number;
			_id: string;
		}
	];
	isFavorite: boolean;
}

const AlbumSection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const [categories, setCategories] = useState<Category[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [CurrAlbum, setCurrAlbum] = useState<Album>({} as Album);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openEditThumbnail, setOpenEditThumbnail] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

	const mutationAddAlbum = useMutation({
		mutationFn: (createInput: FormData) => {
			return addAlbum(createInput);
		},
		onSuccess: () => {
			fetchAlbums();
		}
	});

	const mutationDeleteAlbum = useMutation({
		mutationFn: (id: string) => {
			return deleteAlbum({ query: `/${id}` });
		},
		onSuccess: () => {
			fetchAlbums();
		}
	});

	const mutationEditCategory = useMutation({
		mutationFn: (data: any) => {
			return editAlbum(data);
		},
		onSuccess: () => {
			fetchAlbums();
		}
	});

	const mutationEditImage = useMutation({
		mutationFn: (data: any) => {
			return editImage(data);
		},
		onSuccess: () => {
			fetchAlbums();
		}
	});

	const fetchCategories = useCallback(async () => {
		setLoading(true);

		try {
			const response: any = await queryClient.fetchQuery(
				['categories', { query: `?content=${searchTerm}` }],
				getCategories
			);
			setCategories(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [searchTerm]);

	const fetchAlbums = useCallback(async () => {
		setLoading(true);

		try {
			const response = await queryClient.fetchQuery(
				[
					'all-albums',
					{
						query: `?content=${searchTerm}`
					}
				],
				getAlbums
			);
			setAlbums(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// setAlert({
			// 	open: true,
			// 	message: err?.response?.data?.Message || err.message || 'Something went wrong',
			// 	type: 'error'
			// });
			setError(true);
		}

		// eslint-disable-next-line
	}, [searchTerm]);

	const addAlbumHandler = async (data: any) => {
		const formData = new FormData();

		console.log(data);

		formData.append(
			'data',
			JSON.stringify({
				title: [
					{
						lang: 'en',
						value: data.titleEn
					},
					{
						lang: 'ar',
						value: data.titleAr
					}
				],
				description: [
					{
						lang: 'en',
						value: data.descriptionEn
					},
					{
						lang: 'ar',
						value: data.descriptionAr
					}
				],
				category: data.category,
				slug: data.slug
			})
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail[0]);
		try {
			const res = await mutationAddAlbum.mutateAsync(formData);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
		} finally {
		}
	};

	useEffect(() => {
		fetchAlbums();
	}, [searchTerm]);

	useEffect(() => {
		fetchCategories();
	}, []);

	const deleteAlbumHandler = async (id: string) => {
		setOpenDeleteForm(false);
		setLoading(true);
		try {
			const res = await mutationDeleteAlbum.mutateAsync(id);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	const thumbnailCategoryHandler = async (data: any) => {
		setOpenEditThumbnail(false);
		setLoading(true);
		const formData = new FormData();

		formData.append('id', CurrAlbum._id);

		console.log(data?.thumbnail[0]);
		if (data.thumbnail && data.thumbnail.length > 0) {
			const file = data.thumbnail[0]; // Accessing the first (and only) file in the fileList
			formData.append('thumbnail', file);
		} else return;
		try {
			const res = await mutationEditImage.mutateAsync(formData);
			setLoading(false);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	const editAlbumHandler = async (data: any) => {
		setOpenEditForm(false);
		setLoading(true);
		try {
			const res = await mutationEditCategory.mutateAsync({
				id: CurrAlbum._id,
				title: [
					{
						lang: 'en',
						value: data.titleEn
					},
					{
						lang: 'ar',
						value: data.titleAr
					}
				],
				description: [
					{
						lang: 'en',
						value: data.descriptionEn
					},
					{
						lang: 'ar',
						value: data.descriptionAr
					}
				],
				slug: data.slug,
				category: data.category
			});
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	const onSubmit = (data: any) => {
		console.log(data);
		addAlbumHandler(data);
		setOpenForm(false);
	};

	const handleClickAlbum = (data: any) => {
		setCurrAlbum(data);
		setOpenEditForm(true);
	};

	const handleOpenDeleteAlbum = (data: any) => {
		setCurrAlbum(data);
		setOpenDeleteForm(true);
	};

	const handleCloseDeleteAlbum = () => {
		setCurrAlbum({} as Album);
		setOpenDeleteForm(false);
	};

	const handleOnCloseEdit = () => {
		setCurrAlbum({} as Album);
		setOpenEditForm(false);
	};

	const handleOpenImage = (data: any) => {
		setCurrAlbum(data);
		setOpenEditThumbnail(true);
	};

	const handleOnImageEdit = () => {
		setCurrAlbum({} as Album);
		setOpenEditThumbnail(false);
	};

	if (error) return <div>Error</div>;

	// if (loading) return <div>Loading</div>;
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			<Stack
				component="main"
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				useFlexGap
				sx={{ m: '20px' }}>
				<Stack
					direction={'row'}
					alignItems={'center'}
					borderRadius={20}
					bgcolor="background.paper"
					p={1}
					spacing={1}
					sx={{ display: { lg: 'flex' } }}>
					<div style={{ padding: '0 20px' }}>Albums </div>
					<SearchField />
				</Stack>
				<Grid container justifyContent={'flex-end'} sx={{ display: { lg: 'flex' } }}>
					<MuiOutlineButton
						variant="outlined"
						color="inherit"
						size="small"
						sx={{ px: 4, py: 2 }}
						startIcon={<AddIcon sx={{ fill: '#232323' }} />}
						onClick={() => setOpenForm(true)}>
						Add New
					</MuiOutlineButton>
				</Grid>
			</Stack>
			{openForm && (
				<DialogModal
					children={
						<Form
							onSubmitForm={onSubmit}
							categories={categories.map((category) => {
								return { label: category.title[0].value, value: category._id };
							})}
						/>
					}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Album"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={deleteAlbumHandler} id={CurrAlbum._id} />}
					onClose={handleCloseDeleteAlbum}
					open={openDeleteForm}
					title="Delete Album"
				/>
			)}

			{openEditForm && (
				<DialogModal
					children={
						<FormEdit
							album={CurrAlbum}
							onSubmitForm={editAlbumHandler}
							categories={categories.map((category) => {
								return { label: category.title[0].value, value: category._id };
							})}
						/>
					}
					onClose={handleOnCloseEdit}
					open={openEditForm}
					title="Edit Album"
				/>
			)}

			{openEditThumbnail && (
				<DialogModal
					children={<ThumbnailEdit onSubmitForm={thumbnailCategoryHandler} />}
					onClose={handleOnImageEdit}
					open={openEditThumbnail}
					title="Change Image"
				/>
			)}

			{loading ? (
				<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={40} />
				</div>
			) : (
				<div className="container-fluid">
					<div className="tab-content" id="myTabContent">
						<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
							<div className="row g-4">
								{albums.map((album) => (
									<div key={album._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
										<AlbumCard
											key={album._id}
											album={album}
											onClick={handleClickAlbum}
											onDelete={handleOpenDeleteAlbum}
											onImage={handleOpenImage}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						<div
							style={{
								marginTop: '20px',
								backgroundColor: '#a6a6a6',
								borderRadius: '5px',
								padding: '5px 10px',
								fontSize: 'smaller',
								color: '#383838'
							}}>
							{'items'} {albums.length}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default AlbumSection;
