import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, InputLabel, Container, Grid, Box } from '@mui/material';

const schema = yup.object().shape({
	thumbnail: yup.mixed().required('photo is required')
});

type FormValues = {
	thumbnail: any;
};

interface Props {
	onSubmitForm: (data: any) => void;
}

const ThumbnailEdit: React.FC<Props> = ({ onSubmitForm }) => {
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
		<Container maxWidth="sm" sx={{ m: 0 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
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

export default ThumbnailEdit;
