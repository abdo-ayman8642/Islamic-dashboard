import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, InputLabel, Container, Grid } from '@mui/material';

const schema = yup.object().shape({
	name: yup.string().required('name is required'),
	email: yup.string().required('email is required')
});

type FormValues = {
	name: string;
	email: string;
};

interface Props {
	onSubmitForm: (data: any) => void;
	profile: any;
}

const FormEdit: React.FC<Props> = ({ onSubmitForm, profile }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: profile?.email,
			name: profile?.name
		}
	});

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		onSubmitForm(data);
	};

	return (
		<Container maxWidth="md" sx={{ margin: 0 }}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<InputLabel htmlFor="name">Name</InputLabel>
						<TextField
							id="name"
							fullWidth
							multiline
							{...register('name')}
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel htmlFor="email">Email</InputLabel>
						<TextField
							id="email"
							fullWidth
							multiline
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
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

export default FormEdit;
