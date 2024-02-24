'use client';
import { CircularProgress, Grid, Stack } from '@mui/material';
import AlbumCard from './AlbumCard';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import AddIcon from '@mui/icons-material/Add';
import { addAlbum, getAlbums } from 'framework/album';
import FormEdit from './partials/FormEdit';
import { getCategories } from 'framework/categories';
import FormDelete from './partials/FormDelete';

interface Information {
	_id: string;
	lang: string;
	value: string;
}

interface Category {
	_id: string;
	albums: string[];
	description: Information[];
	title: Information[];
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
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
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

	const mutationAddAlbum = useMutation({
		mutationFn: (createInput: FormData) => {
			return addAlbum(createInput);
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

		formData.append(
			'data',
			`{\n    "title": [\n        {\n            "lang": "en",\n            "value": ${data.titleEn}\n        },\n        {\n            "lang": "ar",\n            "value": ${data.titleAr}\n        }\n    ],\n    "description": [\n        {\n            "lang": "en",\n            "value": ${data.descriptionEn}\n        },\n        {\n            "lang": "ar",\n            "value": ${data.descriptionAr}\n        }\n    ]\n}`
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail);
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
	if (error) return <div>Error</div>;

	if (loading) return <div>Loading</div>;
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			<Stack
				component="main"
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				useFlexGap
				sx={{ m: '20px' }}>
				Albums
				<Grid container justifyContent={'flex-end'} sx={{ display: { xs: 'none', lg: 'flex' } }}>
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
					children={<Form onSubmitForm={onSubmit} />}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Album"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={onSubmit} id={CurrAlbum._id} />}
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
							onSubmitForm={onSubmit}
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

			{loading ? (
				<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={100} />
				</div>
			) : (
				<div className="container-fluid">
					<div className="tab-content" id="myTabContent">
						<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
							<div className="row g-4">
								{albums.map((album) => (
									<AlbumCard
										key={album._id}
										album={album}
										onClick={handleClickAlbum}
										onDelete={handleOpenDeleteAlbum}
									/>
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
								fontSize: 'larger',
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
