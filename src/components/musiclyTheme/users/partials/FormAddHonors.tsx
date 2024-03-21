import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, Container, Grid } from '@mui/material';

const schema = yup.object().shape({
	name: yup.string().required('name is required')
});

type FormValues = {
	name: string;
};

interface Props {
	onSubmitForm: (data: any) => void;
}

const FormAddHonors: React.FC<Props> = ({ onSubmitForm }) => {
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
		<Container maxWidth="md" sx={{ margin: 0 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							id="name"
							fullWidth
							label="Name"
							multiline
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
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

export default FormAddHonors;
