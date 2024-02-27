import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, InputLabel, Container, Grid, Select, MenuItem } from '@mui/material';
import { Album } from '../AlbumSection';

const schema = yup.object().shape({
	titleAr: yup.string().required('Title (Arabic) is required'),
	titleEn: yup.string().required('Title (English) is required'),
	descriptionAr: yup.string().required('Description (Arabic) is required'),
	descriptionEn: yup.string().required('Description (English) is required'),
	slug: yup.string().required('Slug is required'),
	category: yup.string().required('Category is required')
});

interface CategoriesProp {
	label: string;
	value: string;
}

type FormValues = {
	titleAr: string;
	titleEn: string;
	descriptionAr: string;
	descriptionEn: string;
	category: string;

	slug: string;
};

interface Props {
	onSubmitForm: (data: any) => void;
	album: Album;
	categories: CategoriesProp[];
}

const FormEdit: React.FC<Props> = ({ onSubmitForm, album, categories }) => {
	console.log(album.category[0] === categories[0].value);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			titleEn: album.title[0].value,
			titleAr: album.title[1].value,
			descriptionEn: album.description[0].value,
			descriptionAr: album.description[1].value,

			category: album.category[0],
			slug: album.slug
		}
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onSubmitForm(data);
	};

	return (
		<Container maxWidth="sm">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<InputLabel htmlFor="titleEn">Title (English)</InputLabel>
						<TextField
							id="titleEn"
							fullWidth
							multiline
							{...register('titleEn')}
							error={!!errors.titleEn}
							helperText={errors.titleEn?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel htmlFor="titleAr">Title (Arabic)</InputLabel>
						<TextField
							id="titleAr"
							fullWidth
							multiline
							{...register('titleAr')}
							error={!!errors.titleAr}
							helperText={errors.titleAr?.message}
						/>
					</Grid>

					<Grid item xs={12}>
						<InputLabel htmlFor="descriptionEn">Description (English)</InputLabel>
						<TextField
							id="descriptionEn"
							fullWidth
							multiline
							rows={2}
							{...register('descriptionEn')}
							error={!!errors.descriptionEn}
							helperText={errors.descriptionEn?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel htmlFor="descriptionAr">Description (Arabic)</InputLabel>
						<TextField
							id="descriptionAr"
							fullWidth
							multiline
							rows={2}
							{...register('descriptionAr')}
							error={!!errors.descriptionAr}
							helperText={errors.descriptionAr?.message}
						/>
					</Grid>

					<Grid item xs={12}>
						<InputLabel htmlFor="slug">Slug</InputLabel>
						<TextField
							id="slug"
							fullWidth
							multiline
							{...register('slug')}
							error={!!errors.slug}
							helperText={errors.slug?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel htmlFor="category">Category</InputLabel>
						<Select
							id="category"
							fullWidth
							{...register('category')}
							error={!!errors.category}
							defaultValue={album.category[0]}>
							{categories.map((category, index) => (
								<MenuItem key={index} value={category.value}>
									{category.label}
								</MenuItem>
							))}
						</Select>
					</Grid>

					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }}>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default FormEdit;
