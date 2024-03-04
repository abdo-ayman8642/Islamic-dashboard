import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, InputLabel, Container, Grid, Select, MenuItem } from '@mui/material';

const schema = yup.object().shape({
	album: yup.string().required('Audio is required')
});

interface AlbumProp {
	label: string;
	value: string;
}

type FormValues = {
	album: string;
};

interface Props {
	onSubmitForm: (data: any) => void;

	albums: AlbumProp[];
}

const FormAdd: React.FC<Props> = ({ onSubmitForm, albums }) => {
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
		<Container maxWidth="md" sx={{ m: 0 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<InputLabel htmlFor="audio">Audio</InputLabel>
						<Select id="audio" fullWidth {...register('album')} error={!!errors.album}>
							{albums.map((album, index) => (
								<MenuItem key={index} value={album.value}>
									{album.label}
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

export default FormAdd;
