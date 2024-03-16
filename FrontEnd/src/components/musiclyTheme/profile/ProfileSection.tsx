'use client';

import { useState } from 'react';
import { useMutation } from 'react-query';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import useAuthStore from 'store/auth';
import { formatDate, getErrorTranslation } from 'helpers/utils';
import FormEdit from './partials/FormEdit';
import DialogModal from 'components/UI/DialogModal';
import FormChange from './partials/FormChange';
import toast from 'react-hot-toast';
import { changeUserPassword, editUser } from 'framework/user';
import { LocalStorage } from 'enums/localStorage';

const ProfileSection = () => {
	const [loading, setLoading] = useState(false);
	const [openChangePassword, setOpenChangePassword] = useState<boolean>(false);
	const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);

	const { session, setSession } = useAuthStore();

	const mutationChangePassword = useMutation({
		mutationFn: (data: any) => {
			return changeUserPassword(data);
		}
	});

	const mutationEditProfile = useMutation({
		mutationFn: (data: any) => {
			return editUser(data);
		},
		onSuccess: (data: any) => {
			setSession(data.data.user);
			localStorage.setItem(LocalStorage.PROFILE, JSON.stringify(data.data.user));
		}
	});

	const editProfile = async (data: any) => {
		setOpenEditProfile(false);

		setLoading(true);
		try {
			const res = await mutationEditProfile.mutateAsync(data);
			setLoading(false);

			toast.success('Successfully Edited Profile');
			if (res?.Error) throw new Error(res?.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const changePassword = async (data: any) => {
		setOpenChangePassword(false);

		setLoading(true);
		try {
			const res = await mutationChangePassword.mutateAsync(data);
			setLoading(false);

			toast.success('Successfully Changed Password');
			if (res?.Error) throw new Error(res?.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const profileTextStyle = {
		color: '#333'
	};

	return (
		<section className="trending__section hotsong__section pr-24 pl-24 pb-100">
			{loading ? (
				<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={40} />
				</div>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 'fit-content' }}>
					{session ? (
						<>
							<Typography variant="h4" style={profileTextStyle}>
								Profile
							</Typography>
							<Typography variant="body1" style={profileTextStyle}>
								Name: <span style={{ color: '#000' }}>{session?.name}</span>
							</Typography>
							<Typography variant="body1" style={profileTextStyle}>
								Email: <span style={{ color: '#000' }}>{session?.email}</span>
							</Typography>
							<Typography variant="body1" style={profileTextStyle}>
								Created At: <span style={{ color: '#000' }}>{formatDate(session?.createdAt)}</span>
							</Typography>
							<Typography variant="body1" style={profileTextStyle}>
								Role:{' '}
								{session?.role == '62f86e900860a1d7140f99d2' ? (
									<span style={{ color: '#000' }}>Admin</span>
								) : (
									<span style={{ color: '#000' }}>User</span>
								)}
							</Typography>
							{openEditProfile && (
								<DialogModal
									fullScreen
									children={<FormEdit profile={session} onSubmitForm={editProfile} />}
									onClose={() => setOpenEditProfile(false)}
									open={openEditProfile}
									title="Edit Profile"
								/>
							)}
							{openChangePassword && (
								<DialogModal
									fullScreen
									children={<FormChange onSubmitForm={changePassword} />}
									onClose={() => setOpenChangePassword(false)}
									open={openChangePassword}
									title="Change Password"
								/>
							)}
							<Box sx={{ display: 'flex', gap: 2 }}>
								<Button
									variant="contained"
									color="secondary"
									sx={{ borderRadius: 0 }}
									onClick={() => setOpenEditProfile(true)}>
									Edit Profile
								</Button>
								<Button variant="contained" color="warning" onClick={() => setOpenChangePassword(true)}>
									Change Password
								</Button>
							</Box>
						</>
					) : (
						<Typography variant="body1" style={{ color: '#000' }}>
							No profile data found.
						</Typography>
					)}
				</Box>
			)}
		</section>
	);
};

export default ProfileSection;
