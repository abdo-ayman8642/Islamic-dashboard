import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, InputLabel, Container, Grid, Select, MenuItem, Box } from '@mui/material';

const schema = yup.object().shape({
	titleAr: yup.string().required('Title (Arabic) is required'),
	titleEn: yup.string().required('Title (English) is required'),
	descriptionAr: yup.string().required('Description (Arabic) is required'),
	descriptionEn: yup.string().required('Description (English) is required'),
	slug: yup.string().required('Slug is required'),
	category: yup.string().required('Category is required'),
	thumbnail: yup.mixed()
});

type FormValues = {
	titleAr: string;
	titleEn: string;
	descriptionAr: string;
	descriptionEn: string;
	category: string;
	thumbnail?: FileList;
	slug: string;
};
interface CategoryOption {
	label: string;
	value: string;
}

interface Props {
	onSubmitForm: (data: any) => void;
	categories: CategoryOption[];
}

const Form: React.FC<Props> = ({ onSubmitForm, categories }) => {
	const [selectedImage, setSelectedImage] = useState<any>(null);
	const [imageUrl, setImageUrl] = useState<any>(null);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(schema)
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onSubmitForm(data);
	};

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const handleChangeImage = (e: any) => {
		setSelectedImage(e?.target?.files[0]);
	};

	return (
		<Container maxWidth="md" sx={{ m: 0 }}>
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
						<Select id="category" fullWidth {...register('category')} error={!!errors.category} defaultValue="">
							{categories.map((category, index) => (
								<MenuItem key={index} value={category.value}>
									{category.label}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item xs={12}>
						<InputLabel htmlFor="thumbnail">Thumbnail</InputLabel>
						<TextField type="file" id="thumbnail" fullWidth {...register('thumbnail')} onChange={handleChangeImage} />
					</Grid>
					<Grid item xs={12}>
						{selectedImage && selectedImage && (
							<Box mt={2} textAlign="center">
								<div>Image Preview:</div>
								<img src={imageUrl} alt={selectedImage.name} height="100px" />
							</Box>
						)}
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

export default Form;
