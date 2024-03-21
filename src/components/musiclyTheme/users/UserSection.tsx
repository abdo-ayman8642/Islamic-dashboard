'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import CloseIcon from '@mui/icons-material/Close';
import {
	Box,
	CircularProgress,
	Grid,
	IconButton,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import useAuthStore from 'store/auth';

import { addAdmin, deleteUser, getUsers, toggleUserSubscription } from 'framework/user';
import { formatDate, getErrorTranslation } from 'helpers/utils';
import { Delete } from '@mui/icons-material';
import DialogModal from 'components/UI/DialogModal';
import FormDelete from './partials/FormDelete';
import toast from 'react-hot-toast';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import AddIcon from '@mui/icons-material/Add';
import FormAdd from './partials/FormAdd';
import CheckIcon from '@mui/icons-material/Check';
import FormToggleSubscribe from './partials/FormToggleSubscripe';

export enum ToggleSubscribtion {
	ACCESS = 'access',
	DENEY = 'deny'
}
interface SubscribtionProp {
	id: string;
	type: ToggleSubscribtion;
}

const UsersSection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const [users, setUsers] = useState<any[]>([]);

	const [error, setError] = useState<boolean>(false);
	const [openDelete, setOpenDelete] = useState<string | null>(null);
	const [toggleSubscripe, setToggleSubscripe] = useState<SubscribtionProp | null>(null);
	const [openForm, setOpenForm] = useState<boolean>(false);

	const { session, setSession } = useAuthStore();

	const mutationDeleteUser = useMutation({
		mutationFn: (data: any) => {
			return deleteUser(data);
		},
		onSuccess: () => {
			fetchUsers();
		}
	});

	const mutationToggleSubscriptionUser = useMutation({
		mutationFn: (data: any) => {
			return toggleUserSubscription(data);
		},
		onSuccess: () => {
			fetchUsers();
		}
	});

	const mutationAddAdmin = useMutation({
		mutationFn: (createInput: any) => {
			return addAdmin(createInput);
		},
		onSuccess: () => {
			fetchUsers();
		}
	});

	const fetchUsers = useCallback(async () => {
		setLoading(true);

		try {
			const response: any = await queryClient.fetchQuery(['users', { query: `` }], getUsers);
			setUsers(response.data._users);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
			setError(true);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchUsers();
		// eslint-disable-next-line
	}, []);

	const addAdminHandler = async (data: any) => {
		setLoading(true);

		const dataInput = { name: data?.name, email: data?.email, password: data?.password };

		try {
			const res = await mutationAddAdmin.mutateAsync(dataInput);
			if (res.Error) throw new Error(res.Message || 'Something went wrong');
			setLoading(false);
			toast.success('Successfully Added Album');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};
	const onSubmit = async (data: any) => {
		await addAdminHandler(data);
		setOpenForm(false);
	};

	const deleteUserhandler = async (data: any) => {
		const id = openDelete;
		setOpenDelete(null);

		setLoading(true);
		try {
			const res = await mutationDeleteUser.mutateAsync({ id });
			setLoading(false);

			toast.success('Successfully Deleted User');
			if (res?.Error) throw new Error(res?.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	const toggleUserSubscriptionhandler = async (data: any) => {
		setToggleSubscripe(null);

		setLoading(true);
		try {
			const res = await mutationToggleSubscriptionUser.mutateAsync(toggleSubscripe);
			setLoading(false);

			toast.success('Successfully Changed User Subscription');
			if (res?.Error) throw new Error(res?.Message || 'Something went wrong');
		} catch (error: any) {
			setLoading(false);
			const code: string = error.response.data.data;
			toast.error(getErrorTranslation(code));
		}
	};

	if (error) return <div>Error</div>;
	function createData(
		id: string,
		name: string,
		email: string,
		role: string,
		subscribed: string,
		createdAt: string,
		updatedAt: string
	) {
		return { id, name, email, role, subscribed, createdAt, updatedAt };
	}

	// [
	// 	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	// 	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	// 	createData('Eclair', 262, 16.0, 24, 6.0),
	// 	createData('Cupcake', 305, 3.7, 67, 4.3),
	// 	createData('Gingerbread', 356, 16.0, 49, 3.9)
	// ];

	const rows = users.map((user) =>
		createData(
			user?._id,
			user?.name,
			user?.email,
			user?.role === '62f86e900860a1d7140f99d2' ? 'Admin' : 'User',
			user?.isSubscribed ? 'True' : 'False',
			formatDate(user?.createdAt),
			formatDate(user?.updatedAt)
		)
	);

	return (
		<section className="trending__section hotsong__section pr-24 pl-24 pb-100">
			{loading ? (
				<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={40} />
				</div>
			) : (
				<>
					<Stack
						component="main"
						justifyContent={'center'}
						alignItems={'center'}
						useFlexGap
						sx={{ m: '20px', flexDirection: { xs: 'column', lg: 'row' } }}>
						<div style={{ padding: ' 20px 0', fontSize: '25px', fontWeight: 500 }}>Users </div>

						<Grid container justifyContent={'flex-end'} sx={{ display: { lg: 'flex' } }}>
							<MuiOutlineButton
								variant="outlined"
								color="inherit"
								size="small"
								sx={{ px: 3, py: 1, fontSize: '15px' }}
								startIcon={<AddIcon sx={{ fill: '#232323' }} />}
								onClick={() => setOpenForm(true)}>
								Add Admin
							</MuiOutlineButton>
						</Grid>
					</Stack>
					{openForm && (
						<DialogModal
							fullScreen
							children={<FormAdd onSubmitForm={onSubmit} />}
							onClose={() => setOpenForm(false)}
							open={openForm}
							title="Add Admin"
						/>
					)}
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 'fit-content' }}>
						{users ? (
							<Box>
								<TableContainer component={Paper}>
									<Table sx={{ minWidth: 650 }} aria-label="simple table">
										<TableHead>
											<TableRow>
												<TableCell>Name</TableCell>
												<TableCell>Email</TableCell>
												<TableCell>Role</TableCell>
												<TableCell>Subscribed</TableCell>
												<TableCell>Created At</TableCell>
												<TableCell>Updated At</TableCell>
												<TableCell>Actions</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map((row) => (
												<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
													<TableCell component="th" scope="row">
														{row.name}
													</TableCell>
													<TableCell>{row.email}</TableCell>
													<TableCell>{row.role}</TableCell>
													<TableCell>{row.subscribed}</TableCell>
													<TableCell>{row.createdAt}</TableCell>
													<TableCell>{row.updatedAt}</TableCell>
													<TableCell align="center">
														{row.role === 'User' && (
															<>
																<Tooltip title="Delete">
																	<IconButton color="error" onClick={() => setOpenDelete(row.id)}>
																		<Delete />
																	</IconButton>
																</Tooltip>

																{row.subscribed === 'True' ? (
																	<Tooltip title="Deny">
																		<IconButton
																			color="error"
																			onClick={() =>
																				setToggleSubscripe({
																					id: row.id,
																					type: ToggleSubscribtion.DENEY
																				})
																			}>
																			<CloseIcon />
																		</IconButton>
																	</Tooltip>
																) : (
																	<Tooltip title="Access">
																		<IconButton
																			color="success"
																			onClick={() =>
																				setToggleSubscripe({
																					id: row.id,
																					type: ToggleSubscribtion.ACCESS
																				})
																			}>
																			<CheckIcon />
																		</IconButton>
																	</Tooltip>
																)}
															</>
														)}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
								{!!openDelete && (
									<DialogModal
										children={<FormDelete onSubmitForm={deleteUserhandler} id={openDelete} />}
										onClose={() => setOpenDelete(null)}
										open={!!openDelete}
										title="Delete User"
									/>
								)}

								{!!toggleSubscripe && (
									<DialogModal
										children={
											<FormToggleSubscribe
												onSubmitForm={toggleUserSubscriptionhandler}
												id={toggleSubscripe.id}
												type={toggleSubscripe.type}
											/>
										}
										onClose={() => setToggleSubscripe(null)}
										open={!!toggleSubscripe}
										title="Subscription Access"
									/>
								)}
							</Box>
						) : (
							<Typography variant="body1" style={{ color: '#000' }}>
								No Users found.
							</Typography>
						)}
					</Box>
				</>
			)}
		</section>
	);
};

export default UsersSection;
