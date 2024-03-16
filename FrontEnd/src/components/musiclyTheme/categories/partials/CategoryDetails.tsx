'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addAlbumCategory, getCategories, removeAlbumCategory } from 'framework/categories';
import { CircularProgress } from '@mui/material';
//import SmallLoader from "@/components/shared/SmallLoader";

import { Album, Category } from 'models/api';
import { useParams } from 'react-router-dom';
import ExploreSection from './explore/ExploreSection';
import DialogModal from 'components/UI/DialogModal';
import FormRemove from './FormRemove';
import toast from 'react-hot-toast';
import { getErrorTranslation } from 'helpers/utils';
import FormCreate from './FormCreate';
import FormAdd from './FormAdd';
import { addAlbum, getAlbums } from 'framework/album';

const CategoryDetails = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState<Category | null>(null);
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openCreateForm, setOpenCreateForm] = useState<boolean>(false);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [error, setError] = useState(false);

	const [openDeleteForm, setOpenDeleteForm] = useState<string | null>(null);
	const urlParams = useParams();

	let slug: string = urlParams[`Categoriesslug`] as string;

	const mutationRemoveAlbum = useMutation({
		mutationFn: (createInput: any) => {
			return removeAlbumCategory(createInput);
		},
		onSuccess: () => {
			fetchCategory();
		}
	});

	const mutationAddAlbum = useMutation({
		mutationFn: (createInput: any) => {
			return addAlbumCategory(createInput);
		},
		onSuccess: () => {
			fetchCategory();
		}
	});

	const mutationCreateAlbum = useMutation({
		mutationFn: (createInput: FormData) => {
			return addAlbum(createInput);
		},
		onSuccess: () => {
			fetchCategory();
		}
	});

	const fetchAlbums = useCallback(async () => {
		setLoading(true);

		try {
			const response = await queryClient.fetchQuery(['albums', { query: `` }], getAlbums);
			setAlbums(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// setAlert({
			// 	open: true,
			// 	message: err?.response?.data?.Message || err.message || 'Something went wrong',
			// 	type: 'error'
			// });
			setLoading(false);
			setError(true);
		}

		// eslint-disable-next-line
	}, []);

	const fetchCategory = useCallback(async () => {
		setLoading(true);

		try {
			const response: any = await queryClient.fetchQuery(['category', { query: `/${slug}` }], getCategories);
			setCategory(response.data);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchCategory();
		fetchAlbums();
		// eslint-disable-next-line
	}, []);

	const deleteAlbumHandler = async (id: string) => {
		const data = { categoryId: id, albumId: openDeleteForm };
		setOpenDeleteForm(null);
		setLoading(true);
		try {
			const res = await mutationRemoveAlbum.mutateAsync(data);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Removed Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const addAlbumHandler = async (dataForm: any) => {
		const data = { categoryId: category?._id, albumId: dataForm?.album };
		setOpenForm(false);
		setLoading(true);
		try {
			const res = await mutationAddAlbum.mutateAsync(data);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Added Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const createAlbumHandler = async (data: any) => {
		const formData = new FormData();
		setOpenCreateForm(false);
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
				category: category?._id,
				slug: data.slug
			})
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail[0]);
		try {
			const res = await mutationCreateAlbum.mutateAsync(formData);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Created Album And Added To Category');
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
	if (!category) {
		return <div>Not Found</div>;
	}
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			{/* <Stack
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
			</Stack> */}
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
							src={category?.thumbnail || '/img/albumb/def_album.jpg'}
							alt="img"
							className=" flex-shrink-0"
							style={{ width: '200px', height: '200px' }}
						/>
						<div className="artist__allcontent d-flex gap-3" style={{ flexDirection: 'column' }}>
							<h3 style={{ color: 'black' }}>{category.title[0].value}</h3>
							{/* <span className="white fs-20 mb-16 fw-500 d-block">NLE Chappa</span> */}
							<p className="fs-16 bodyfont pra mb-10" style={{ color: '#535353' }}>
								{category.description[0].value}
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
					<ExploreSection
						albums={category.albums}
						onRemove={(album) => setOpenDeleteForm(album._id)}
						onAdd={() => setOpenForm(true)}
						onCreate={() => setOpenCreateForm(true)}
					/>
					{openCreateForm && (
						<DialogModal
							fullScreen
							children={<FormCreate onSubmitForm={createAlbumHandler} />}
							onClose={() => setOpenCreateForm(false)}
							open={openCreateForm}
							title="Add New Album To category"
						/>
					)}
					{openDeleteForm && (
						<DialogModal
							children={<FormRemove onSubmitForm={deleteAlbumHandler} id={category._id} />}
							onClose={() => setOpenDeleteForm(null)}
							open={!!openDeleteForm}
							title="Remove Album From Category"
						/>
					)}
					{openForm && (
						<DialogModal
							fullScreen
							children={
								<FormAdd
									onSubmitForm={addAlbumHandler}
									albums={albums.map((audio) => {
										return {
											label: audio.title[0].value,
											value: audio._id
										};
									})}
								/>
							}
							onClose={() => setOpenForm(false)}
							open={openForm}
							title="Add Album To Category"
						/>
					)}
				</div>
			</div>
		</section>
	);
};

export default CategoryDetails;
