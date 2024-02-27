'use client';
import CategoryCard from './CategoryCard';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addCategory, deleteCategory, editCategory, editImage, getCategories } from 'framework/categories';
import { CircularProgress, Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
//import SmallLoader from "@/components/shared/SmallLoader";
import AddIcon from '@mui/icons-material/Add';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import FormEdit from './partials/FormEdit';
import FormDelete from './partials/FormDelete';
import ThumbnailEdit from './partials/ThumbnailEdit';
import SearchField from 'components/Header/partials/SearchField';

interface Information {
	_id: string;
	lang: string;
	value: string;
}

export interface Category {
	_id: string;
	albums: string[];
	description: Information[];
	title: Information[];
	thumbnail: string;
	createdAt: string;
	updatedAt: string;
	slug: string;
}

const CategorySection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [CurrCategory, setCurrCategory] = useState<Category>({} as Category);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openEditThumbnail, setOpenEditThumbnail] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

	const mutationAddCategory = useMutation({
		mutationFn: (createInput: FormData) => {
			return addCategory(createInput);
		},
		onSuccess: () => {
			fetchCategories();
		}
	});

	const mutationDeleteCategory = useMutation({
		mutationFn: (id: string) => {
			return deleteCategory({ query: `/${id}` });
		},
		onSuccess: () => {
			fetchCategories();
		}
	});

	const mutationEditCategory = useMutation({
		mutationFn: (data: any) => {
			return editCategory(data);
		},
		onSuccess: () => {
			fetchCategories();
		}
	});

	const mutationEditImage = useMutation({
		mutationFn: (data: any) => {
			return editImage(data);
		},
		onSuccess: () => {
			fetchCategories();
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

	const addCategoryHandler = async (data: any) => {
		setLoading(true);
		const formData = new FormData();

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

		console.log(data?.thumbnail[0]);
		if (data.thumbnail && data.thumbnail.length > 0) {
			const file = data.thumbnail[0]; // Accessing the first (and only) file in the fileList
			formData.append('thumbnail', file);
		}
		try {
			const res = await mutationAddCategory.mutateAsync(formData);
			setLoading(false);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	const deleteCategoryHandler = async (id: string) => {
		setOpenDeleteForm(false);
		setLoading(true);
		try {
			const res = await mutationDeleteCategory.mutateAsync(id);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	const editCategoryHandler = async (data: any) => {
		setOpenEditForm(false);
		setLoading(true);
		try {
			const res = await mutationEditCategory.mutateAsync({
				id: CurrCategory._id,
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
			});
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

		formData.append('id', CurrCategory._id);

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
	useEffect(() => {
		fetchCategories();
		// eslint-disable-next-line
	}, [searchTerm]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const onSubmit = (data: any) => {
		addCategoryHandler(data);
		setOpenForm(false);
	};

	const handleOpenDeleteAlbum = (data: any) => {
		setCurrCategory(data);
		setOpenDeleteForm(true);
	};

	const handleCloseDeleteAlbum = () => {
		setCurrCategory({} as Category);
		setOpenDeleteForm(false);
	};

	const handleOpenImage = (data: any) => {
		setCurrCategory(data);
		setOpenEditThumbnail(true);
	};

	const handleOnClickCategory = (data: Category) => {
		setCurrCategory(data);
		setOpenEditForm(true);
	};

	const handleOnCloseEdit = () => {
		setCurrCategory({} as Category);
		setOpenEditForm(false);
	};

	const handleOnCloseEditImage = () => {
		setCurrCategory({} as Category);
		setOpenEditThumbnail(false);
	};
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
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
					<div style={{ padding: '0 20px' }}>Categories </div>
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
					children={<Form onSubmitForm={onSubmit} />}
					onClose={() => setOpenForm(false)}
					open={openForm}
					title="Add Category"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={deleteCategoryHandler} id={CurrCategory._id} />}
					onClose={handleCloseDeleteAlbum}
					open={openDeleteForm}
					title="Delete Category"
				/>
			)}

			{openEditForm && (
				<DialogModal
					children={<FormEdit category={CurrCategory} onSubmitForm={editCategoryHandler} />}
					onClose={handleOnCloseEdit}
					open={openEditForm}
					title="Edit Category"
				/>
			)}

			{openEditThumbnail && (
				<DialogModal
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
								{categories.map((category) => (
									<div key={category._id} className="col-xxl-2 col-xl-2 col-lg-3 col-md-2 col-md-3 col-sm-4 ">
										<CategoryCard
											category={category}
											onClick={handleOnClickCategory}
											onDelete={handleOpenDeleteAlbum}
											onImage={handleOpenImage}
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

export default CategorySection;
