'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CircularProgress, Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
//import SmallLoader from "@/components/shared/SmallLoader";
import AddIcon from '@mui/icons-material/Add';

import { Album } from 'models/api';
import { useParams } from 'react-router-dom';
import { getAlbums, removeAudioFromAlbum } from 'framework/album';
import ExploreSection from 'components/musiclyTheme/explore/ExploreSection';
import FormRemove from './FormRemove';
import DialogModal from 'components/UI/DialogModal';
import toast from 'react-hot-toast';
import { getErrorTranslation } from 'helpers/utils';

const AlbumDetails = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [album, setAlbum] = useState<Album | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openEditThumbnail, setOpenEditThumbnail] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);
	const urlParams = useParams();

	let slug: string = urlParams[`Albumsslug`] as string;

	const mutationDeleteAlbum = useMutation({
		mutationFn: (id: string) => {
			return removeAudioFromAlbum({ query: `/${id}` });
		},
		onSuccess: () => {
			fetchCategory();
		}
	});

	const fetchCategory = useCallback(async () => {
		setLoading(true);

		try {
			const response: any = await queryClient.fetchQuery(['album', { query: `/${slug}` }], getAlbums);
			setAlbum(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
		}

		// eslint-disable-next-line
	}, [searchTerm]);

	useEffect(() => {
		fetchCategory();
		// eslint-disable-next-line
	}, [searchTerm]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const onSubmit = (data: any) => {
		setOpenForm(false);
	};

	const deleteAlbumHandler = async (id: string) => {
		setOpenDeleteForm(false);
		setLoading(true);
		try {
			const res = await mutationDeleteAlbum.mutateAsync(id);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Deleted Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};
	// const handleOpenDeleteAlbum = (data: any) => {
	// 	setCurrCategory(data);
	// 	setOpenDeleteForm(true);
	// };

	// const handleCloseDeleteAlbum = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenDeleteForm(false);
	// };

	// const handleOpenImage = (data: any) => {
	// 	setCurrCategory(data);
	// 	setOpenEditThumbnail(true);
	// };

	// const handleOnClickCategory = (data: Category) => {
	// 	setCurrCategory(data);
	// 	setOpenEditForm(true);
	// };

	// const handleOnCloseEdit = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenEditForm(false);
	// };

	// const handleOnCloseEditImage = () => {
	// 	setCurrCategory({} as Category);
	// 	setOpenEditThumbnail(false);
	// };
	if (loading) {
		return (
			<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<CircularProgress size={40} />
			</div>
		);
	}
	if (!album) {
		return <div>Not Found</div>;
	}
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			<Stack
				component="main"
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				useFlexGap
				sx={{ m: '20px', flexDirection: { xs: 'column', lg: 'row' } }}>
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
			{/* {openForm && (
				<DialogModal
					children={<Form onSubmitForm={onSubmit} />}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Category"
				/>
			)} */}

			<div className="container-fluid">
				<div className="container-fluid">
					<div className="artist__allhead d-flex">
						<img
							src={album?.thumbnail || '/img/albumb/def_album.jpg'}
							alt="img"
							className=" flex-shrink-0"
							style={{ width: '200px', height: '200px' }}
						/>
						<div className="artist__allcontent d-flex gap-3" style={{ flexDirection: 'column' }}>
							<h3 style={{ color: 'black' }}>{album.title[0].value}</h3>
							{/* <span className="white fs-20 mb-16 fw-500 d-block">NLE Chappa</span> */}
							<p className="fs-16 bodyfont pra mb-10" style={{ color: '#535353' }}>
								{album.description[0].value}
							</p>
							{/* <ul className="artist__list mb-20">
              <li>Theme Forest</li>
              <li>3D Ocean</li>
              <li>Graphic River</li>
              <li>Code Canayon</li>
            </ul>
            <p className="pra fs-16 mb-10">
              In 1993, he joined the band Grey Daze as their lead vocalist and
              released two albums with them before departing in 1998. Later, in
              1999, Chester Bennington joined Linkin Park, a band formed by Mike
              Shinoda and Brad Delson, and became one of its most iconic
              members.
            </p> */}
							{/* <div className="d-flex mt-24 align-items-center gap-4">
              <Link href="" className="cmbtn d-flex gap-2">
                <span>
                  <IconPlayerPlay className="fs-24 base" />
                </span>
                <span>Play</span>
              </Link>
              <Link href="" className="cmbtn d-flex gap-2">
                <span>
                  <IconShare className="fs-24 base" />
                </span>
                <span>Share</span>
              </Link>
            </div> */}

							{/* <div
              className="d-flex mt-24 align-items-center gap-4"
              style={{ cursor: "pointer" }}
            >
              <div onClick={toggleFavourite} className="cmbtn d-flex gap-3">
                {isFavorite ? (
                  <>
                    <span>
                      <IconHeartFilled className="fs-24 base2" />
                    </span>

                    <span style={{ fontSize: "smaller" }}>
                      {t("remove_fav")}
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <IconHeart className="fs-24 " />
                    </span>
                    <span style={{ fontSize: "smaller" }}>{t("add_fav")}</span>
                  </>
                )}
              </div>
              {toggleFavLoading && <SmallLoader />}
            </div> */}
						</div>
					</div>
				</div>
				<ExploreSection audios={album?.audios!} onRemove={() => setOpenDeleteForm(true)} />
			</div>
			{openDeleteForm && (
				<DialogModal
					children={<FormRemove onSubmitForm={deleteAlbumHandler} id={album._id} />}
					onClose={() => setOpenDeleteForm(false)}
					open={openDeleteForm}
					title="Remove Audio From Album"
				/>
			)}
		</section>
	);
};

export default AlbumDetails;
