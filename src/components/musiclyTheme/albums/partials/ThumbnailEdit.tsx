import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, InputLabel, Container, Grid } from '@mui/material';

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

	return (
		<Container maxWidth="sm">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputLabel htmlFor="thumbnail">Thumbnail</InputLabel>
						<TextField type="file" id="thumbnail" fullWidth {...register('thumbnail')} />
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
