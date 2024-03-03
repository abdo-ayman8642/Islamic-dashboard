import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, Grid, TextField } from '@mui/material';

interface FormData {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
}

const schema = yup.object().shape({
	password: yup.string().required('Current password is required'),
	newPassword: yup
		.string()
		.required('New password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
		),
	confirmNewPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Passwords must match')
		.required('Please confirm your new password')
});

interface Props {
	onSubmitForm: (data: any) => void;
}

const FormChange: React.FC<Props> = ({ onSubmitForm }) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	return (
		<Container maxWidth="md" sx={{ m: 0 }}>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<Grid container spacing={2} sx={{ mt: 2 }}>
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
						<TextField
							id="newPassword"
							label="New Password"
							type="password"
							variant="outlined"
							fullWidth
							multiline
							{...register('newPassword')}
							error={!!errors.newPassword}
							helperText={errors.newPassword?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="confirmNewPassword"
							label="Confirm New Password"
							type="password"
							variant="outlined"
							fullWidth
							multiline
							{...register('confirmNewPassword')}
							error={!!errors.confirmNewPassword}
							helperText={errors.confirmNewPassword?.message}
						/>
					</Grid>
					<Grid item xs={12}>
						<Button type="submit" variant="contained" color="primary" sx={{ py: 2, px: 3 }}>
							Change Password
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default FormChange;
