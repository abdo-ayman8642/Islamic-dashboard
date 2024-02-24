'use client';
import CategoryCard from './CategoryCard';
import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { addCategory, getCategories } from 'framework/categories';
import { Box, CircularProgress, Grid, Stack } from '@mui/material';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
//import SmallLoader from "@/components/shared/SmallLoader";
import AddIcon from '@mui/icons-material/Add';
import DialogModal from 'components/UI/DialogModal';
import Form from './partials/Form';
import FormEdit from './partials/FormEdit';
import FormDelete from './partials/FormDelete';

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
}

const CategorySection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [CurrCategory, setCurrCategory] = useState<Category>({} as Category);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openForm, setOpenForm] = useState<boolean>(false);
	const [openEditForm, setOpenEditForm] = useState<boolean>(false);
	const [openDeleteForm, setOpenDeleteForm] = useState<boolean>(false);

	const mutationAddCategory = useMutation({
		mutationFn: (createInput: FormData) => {
			return addCategory(createInput);
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
		const formData = new FormData();

		formData.append(
			'data',
			`{\n    "title": [\n        {\n            "lang": "en",\n            "value": ${data.titleEn}\n        },\n        {\n            "lang": "ar",\n            "value": ${data.titleAr}\n        }\n    ],\n    "description": [\n        {\n            "lang": "en",\n            "value": ${data.descriptionEn}\n        },\n        {\n            "lang": "ar",\n            "value": ${data.descriptionAr}\n        }\n    ]\n}`
		);

		data.thumbnail.length > 0 && formData.append('thumbnail', data.thumbnail);
		try {
			const res = await mutationAddCategory.mutateAsync(formData);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
		} catch (error: any) {
		} finally {
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

	const handleOnClickCategory = (data: Category) => {
		setCurrCategory(data);
		setOpenEditForm(true);
	};

	const handleOnCloseEdit = () => {
		setCurrCategory({} as Category);
		setOpenEditForm(false);
	};
	return (
		<section className="trending__section pr-24 pl-24 pb-100">
			<Stack
				component="main"
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				useFlexGap
				sx={{ m: '20px' }}>
				Categories
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
					title="Add Category"
				/>
			)}

			{openDeleteForm && (
				<DialogModal
					children={<FormDelete onSubmitForm={onSubmit} id={CurrCategory._id} />}
					onClose={handleCloseDeleteAlbum}
					open={openDeleteForm}
					title="Delete Category"
				/>
			)}

			{openEditForm && (
				<DialogModal
					children={<FormEdit category={CurrCategory} onSubmitForm={onSubmit} />}
					onClose={handleOnCloseEdit}
					open={openEditForm}
					title="Edit Category"
				/>
			)}

			{loading ? (
				<Box style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={70} />
				</Box>
			) : (
				<div className="container-fluid">
					<div className="tab-content" id="myTabContent">
						<div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
							<div className="row g-4">
								{categories.map((category) => (
									<div key={category._id} className="col-lg-3 col-md-4 col-sm-6">
										<CategoryCard
											category={category}
											onClick={handleOnClickCategory}
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

export default CategorySection;
