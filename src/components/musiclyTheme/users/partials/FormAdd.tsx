import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, Container, Grid } from '@mui/material';

const schema = yup.object().shape({
	name: yup.string().required('name is required'),
	email: yup.string().email().required('email is required'),
	password: yup
		.string()
		.required('New password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		)
});

type FormValues = {
	name: string;
	email: string;
	password: string;
};

interface Props {
	onSubmitForm: (data: any) => void;
}

const FormAdd: React.FC<Props> = ({ onSubmitForm }) => {
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
						<TextField
							id="email"
							fullWidth
							label="Email"
							multiline
							type="email"
							{...register('email')}
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="password"
							label="Current Password"
							type="password"
							variant="outlined"
							multiline
							fullWidth
							{...register('password')}
							error={!!errors.password}
							helperText={errors.password?.message}
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

export default FormAdd;
