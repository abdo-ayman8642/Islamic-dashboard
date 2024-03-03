'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import {
	Box,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material';
import Paper from '@mui/material/Paper';
import useAuthStore from 'store/auth';

import { getUsers } from 'framework/user';
import { formatDate } from 'helpers/utils';

const UsersSection = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState(false);

	const [users, setUsers] = useState<any[]>([]);

	const [error, setError] = useState<boolean>(false);

	const { session, setSession } = useAuthStore();

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

	if (error) return <div>Error</div>;
	function createData(name: string, email: string, role: string, createdAt: string, updatedAt: string) {
		return { name, email, role, createdAt, updatedAt };
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
			user?.name,
			user?.email,
			user?.role === '62f86e900860a1d7140f99d2' ? 'Admin' : 'User',
			formatDate(user?.createdAt),
			formatDate(user?.updatedAt)
		)
	);
	console.log(users);
	return (
		<section className="trending__section hotsong__section pr-24 pl-24 pb-100">
			{loading ? (
				<div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<CircularProgress size={40} />
				</div>
			) : (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 'fit-content' }}>
					{users ? (
						<Box>
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 650 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Name</TableCell>
											<TableCell align="right">Email</TableCell>
											<TableCell align="right">Role</TableCell>
											<TableCell align="right">Created At</TableCell>
											<TableCell align="right">Updated At</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map((row) => (
											<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component="th" scope="row">
													{row.name}
												</TableCell>
												<TableCell align="right">{row.email}</TableCell>
												<TableCell align="right">{row.role}</TableCell>
												<TableCell align="right">{row.createdAt}</TableCell>
												<TableCell align="right">{row.updatedAt}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					) : (
						<Typography variant="body1" style={{ color: '#000' }}>
							No Users found.
						</Typography>
					)}
				</Box>
			)}
		</section>
	);
};

export default UsersSection;
