'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import MoodsCard from './MoodsCard';
import { CircularProgress, Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import AddIcon from '@mui/icons-material/Add';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import { addAudio, deleteAudio, editAudio, editImage, getPodcasts } from 'framework/podcast';
import FormEdit from './partials/FormEdit';
import FormDelete from './partials/FormDelete';
import ThumbnailEdit from './partials/ThumbnailEdit';
import SearchField from 'components/Header/partials/SearchField';
import { Audio } from 'models/api';
import toast from 'react-hot-toast';
import { getErrorTranslation } from 'helpers/utils';

const PodcastSection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [audios, setAudios] = useState<Audio[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [CurrAudio, setCurrAudio] = useState<Audio>({} as Audio);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
	const [openEditThumbnail, setOpenEditThumbnail] = useState<boolean>(false);

	const mutationAddAudio = useMutation({
		mutationFn: (createInput: FormData) => {
			return addAudio(createInput);
		},
		onSuccess: () => {
			fetchAudios();
		}
	});

	const mutationEditAudio = useMutation({
		mutationFn: (data: any) => {
			return editAudio(data);
		},
		onSuccess: () => {
			fetchAudios();
		}
	});

	const mutationEditImage = useMutation({
		mutationFn: (data: any) => {
			return editImage(data);
		},
		onSuccess: () => {
			fetchAudios();
		}
	});

	const mutationDeleteAudio = useMutation({
		mutationFn: (id: string) => {
			return deleteAudio({ query: `/${id}` });
		},
		onSuccess: () => {
			fetchAudios();
		}
	});

	const fetchAudios = useCallback(async () => {
		setLoading(true);

		try {
			const response = await queryClient.fetchQuery(['audios', { query: `?content=${searchTerm}` }], getPodcasts);
			setAudios(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// setAlert({
			// 	open: true,
			// 	message: err?.response?.data?.Message || err.message || 'Something went wrong',
			// 	type: 'error'
			// });
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [searchTerm]);

	useEffect(() => {
		fetchAudios();

		// eslint-disable-next-line
	}, [searchTerm]);

	const addAudioHandler = async (data: any) => {
		const formData = new FormData();
		setOpenForm(false);
		setLoading(true);

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

				slug: data.slug
			})
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail[0]);
		data.audio.length > 0 && formData.append('audio', data.audio[0]);
		try {
			const res = await mutationAddAudio.mutateAsync(formData);
			setLoading(false);
			toast.success('Successfully Added Audio');
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const deleteAudioHandler = async (id: string) => {
		setOpenDeleteForm(false);
		setLoading(true);
		try {
			const res = await mutationDeleteAudio.mutateAsync(id);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Deleted Audio');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const editAudioHandler = async (data: any) => {
		setOpenEditForm(false);
		setLoading(true);
		try {
			const res = await mutationEditAudio.mutateAsync({
				id: CurrAudio._id,
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
				isFree: data.free,
				slug: data.slug
			});
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Edited Audio');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const thumbnailCategoryHandler = async (data: any) => {
		setOpenEditThumbnail(false);
		setLoading(true);
		const formData = new FormData();

		formData.append('id', CurrAudio._id);

		if (data.thumbnail && data.thumbnail.length > 0) {
			const file = data.thumbnail[0]; // Accessing the first (and only) file in the fileList
			formData.append('thumbnail', file);
		} else return;
		try {
			const res = await mutationEditImage.mutateAsync(formData);

			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Edited Audio Image');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const hanldeClickAudio = (data: Audio) => {
		setCurrAudio(data);
		setOpenEditForm(true);
	};

	const handleOpenDeleteAlbum = (data: any) => {
		setCurrAudio(data);
		setOpenDeleteForm(true);
	};

	const handleOpenImage = (data: any) => {
		setCurrAudio(data);
		setOpenEditThumbnail(true);
	};
	const handleOnCloseEditImage = () => {
		setCurrAudio({} as Audio);
		setOpenEditThumbnail(false);
	};
	const handleCloseDeleteAlbum = () => {
		setCurrAudio({} as Audio);
		setOpenDeleteForm(false);
	};

	const handleOnCloseEdit = () => {
		setCurrAudio({} as Audio);
		setOpenEditForm(false);
	};

	return (
		<section className="trending__section hotsong__section pr-24 pl-24 pb-100">
			<Stack
				component="main"
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				useFlexGap
				sx={{ m: '20px', flexDirection: { xs: 'column', lg: 'row' } }}>
				<Stack
					direction={'row'}
					alignItems={'center'}
					borderRadius={20}
					bgcolor="background.paper"
					p={1}
					spacing={1}
					sx={{ display: { lg: 'flex' } }}>
					<div style={{ padding: '0 20px', fontSize: '15px' }}>Audios </div>
					<SearchField onChange={handleSearch} value={searchTerm} />
				</Stack>
				<Grid container justifyContent={'flex-end'} sx={{ display: { lg: 'flex' } }}>
					<MuiOutlineButton
						variant="outlined"
						color="inherit"
						size="small"
						sx={{ px: 3, py: 1, fontSize: '15px' }}
						startIcon={<AddIcon sx={{ fill: '#232323' }} />}
						onClick={() => setOpenForm(true)}>
						Add New
					</MuiOutlineButton>
				</Grid>
			</Stack>
			{openForm && (
				<DialogModal
					fullScreen
					children={<Form onSubmitForm={addAudioHandler} />}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Audio"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={deleteAudioHandler} id={CurrAudio._id} />}
					onClose={handleCloseDeleteAlbum}
					open={openDeleteForm}
					title="Delete Audio"
				/>
			)}

			{openEditForm && (
				<DialogModal
					fullScreen
					children={<FormEdit audio={CurrAudio} onSubmitForm={editAudioHandler} />}
					onClose={handleOnCloseEdit}
					open={openEditForm}
					title="Edit Audio"
				/>
			)}

			{openEditThumbnail && (
				<DialogModal
					fullScreen
					children={<ThumbnailEdit onSubmitForm={thumbnailCategoryHandler} />}
					onClose={handleOnCloseEditImage}
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
								{audios.map((audio: Audio) => (
									<div key={audio._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
										<MoodsCard
											key={audio._id}
											audio={audio}
											onImage={handleOpenImage}
											onClick={hanldeClickAudio}
											onDelete={handleOpenDeleteAlbum}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default PodcastSection;
