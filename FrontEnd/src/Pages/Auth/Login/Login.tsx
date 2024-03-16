import React, { useState } from 'react';

import * as Yup from 'yup';
import useApp from 'hooks/useApp';

import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';

import { useMutation } from 'react-query';
import { signIn } from 'framework/auth';
import { useFormik } from 'formik';
import { ILoginResponse } from 'types/auth';
import { LocalStorage } from 'enums/localStorage';
import useAuthStore from 'store/auth';
import MuiSnackbar from 'components/UI/MuiSnackbar';
import { useAlert } from 'contexts/alertContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getErrorTranslation } from 'helpers/utils';

const Login: React.FC = () => {
	const { push } = useApp();
	const setSession = useAuthStore((state) => state.setSession);
	const { alert } = useAlert();
	const [loading, setLoading] = useState<boolean>(false);

	const mutationLogin = useMutation({
		mutationFn: (createInput: any) => {
			return signIn({ data: createInput });
		}
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			submit: null
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('Must be a valid email')
				.max(255)
				.required('Email is required')
				.matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'The email should be like this test@example.com'),
			password: Yup.string().max(255).required('Password is required')
			// .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
		}),
		onSubmit: async (values, helpers) => {
			setLoading(true);
			try {
				const response: ILoginResponse = await mutationLogin.mutateAsync(values);
				// setAlert({ open: true, message: `Welcome ${res.user.name}`, type: "success" });
				// localStorage.setItem('token', response.data.token);
				// localStorage.setItem('user', JSON.stringify(res.user));
				// push("/");
				if (!response?.data?.token) {
					helpers.setStatus({ success: false });
					helpers.setErrors({ submit: 'Invalid credentials' }); // TODO: "Invalid credentials" should be translated
					helpers.setSubmitting(false);
					return;
				}
				if (response.apiStatus) {
					localStorage.setItem(LocalStorage.ACCESS_TOKEN, response.data.token);
					localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(response.data.user));
					setSession(response.data.user);
					push('/analytics');
				}
				toast.success('Successfully Logged In');
				setLoading(false);
			} catch (err: any) {
				helpers.setStatus({ success: false });
				helpers.setErrors({ submit: getErrorTranslation(err.response.data.data) });
				helpers.setSubmitting(false);
				setLoading(false);
			}
		}
	});

	return (
		<>
			<Box
				component="main"
				sx={{
					display: 'flex',
					flex: '1 1 auto',
					minHeight: '100vh'
				}}>
				<Grid container sx={{ flex: '1 1 auto' }}>
					<Grid
						item
						xs={12}
						lg={6}
						sx={{
							backgroundColor: 'background.paper',
							display: 'flex',
							flexDirection: 'column',
							position: 'relative'
						}}>
						<Grid
							container
							sx={{
								backgroundColor: 'background.paper',
								alignItems: 'center',
								justifyContent: 'center',
								marginTop: '200px'
							}}>
							<Box
								sx={{
									maxWidth: 550,
									p: 3,
									width: '100%'
								}}>
								<Stack spacing={1} sx={{ mb: 3 }}>
									<Typography variant="h4">Login</Typography>
								</Stack>
								<form noValidate onSubmit={formik.handleSubmit}>
									<Stack spacing={3}>
										<TextField
											error={!!(formik.touched.email && formik.errors.email)}
											fullWidth
											helperText={formik.touched.email && formik.errors.email}
											label="Email Address"
											multiline
											name="email"
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											type="email"
											value={formik.values.email}
										/>
										<TextField
											error={!!(formik.touched.password && formik.errors.password)}
											fullWidth
											helperText={formik.touched.password && formik.errors.password}
											label="Password"
											name="password"
											multiline
											onBlur={formik.handleBlur}
											onChange={formik.handleChange}
											type="password"
											value={formik.values.password}
										/>
									</Stack>
									{formik.errors.submit && (
										<Typography color="error" sx={{ mt: 3 }} variant="body2">
											{formik.errors.submit}
										</Typography>
									)}
									<Button fullWidth size="large" sx={{ mt: 3, py: 1 }} type="submit" variant="contained">
										{loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Continue'}
									</Button>

									<Grid container justifyContent="space-between" sx={{ mt: 1 }}>
										<Grid item>
											<Link style={{ color: 'black' }} to="/forgot-password">
												Forgot password?
											</Link>
										</Grid>
									</Grid>
								</form>
							</Box>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
						lg={6}
						sx={{
							alignItems: 'center',
							background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
							color: 'white',
							display: 'flex',
							justifyContent: 'center',
							'& img': {
								maxWidth: '100%'
							}
						}}>
						<Box sx={{ p: 3 }}>
							<Typography
								align="center"
								color="inherit"
								sx={{
									fontSize: '24px',
									lineHeight: '32px',
									mb: 1
								}}
								variant="h2">
								Welcome to{' '}
								<Box component="a" sx={{ color: '#6366F1' }} target="_blank">
									Rouh Al-Kalam
								</Box>
							</Typography>
							<Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
								Use your credentials to access your account.
							</Typography>
							<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
								<Box component={'img'} width={'200px'} src={'/img/logo/logo-cropped.png'} />
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<MuiSnackbar alert={alert!} />
		</>
	);
};

export default Login;
