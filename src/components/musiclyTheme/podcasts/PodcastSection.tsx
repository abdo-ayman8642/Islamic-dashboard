'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Album } from '../albums/AlbumSection';
import MoodsCard from './MoodsCard';
import { CircularProgress, Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import AddIcon from '@mui/icons-material/Add';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import { getPodcasts } from 'framework/podcast';
import FormEdit from './partials/FormEdit';
import FormDelete from './partials/FormDelete';

interface Information {
	_id: string;
	lang: string;
	value: string;
}

export interface Audio {
	_id: string;
	title: Information[];
	description: Information[];
	isFree: boolean;
	albums: Album[];
	rating: number;
	createdAt: string;
	thumbnail: string;
}

const PodcastSection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [audios, setAudios] = useState<Audio[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [CurrAudio, setCurrAudio] = useState<Audio>({} as Audio);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

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

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const onSubmit = (data: any) => {
		console.log(data);
		setOpenForm(false);
	};

	const hanldeClickAudio = (data: Audio) => {
		setCurrAudio(data);
		setOpenEditForm(true);
	};

	const handleOpenDeleteAlbum = (data: any) => {
		setCurrAudio(data);
		setOpenDeleteForm(true);
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
				sx={{ m: '20px' }}>
				Audios
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
					title="Add Audio"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={onSubmit} id={CurrAudio._id} />}
					onClose={handleCloseDeleteAlbum}
					open={openDeleteForm}
					title="Delete Audio"
				/>
			)}

			{openEditForm && (
				<DialogModal
					children={<FormEdit audio={CurrAudio} onSubmitForm={onSubmit} />}
					onClose={handleOnCloseEdit}
					open={openEditForm}
					title="Edit Audio"
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
								{audios.map((audio: Audio) => (
									<div key={audio._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
										<MoodsCard
											key={audio._id}
											audio={audio}
											onClick={hanldeClickAudio}
											onDelete={handleOpenDeleteAlbum}
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
								fontSize: 'larger',
								color: '#383838'
							}}>
							{'items'} {audios.length}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default PodcastSection;
