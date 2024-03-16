import { AttachMoney } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import ActionLoader from 'components/UI/ActionLoader';
import { getStat } from 'framework/user';
import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

const Analytics: React.FC = () => {
	const queryClient = useQueryClient();
	const [loading, setLoading] = useState<boolean>(true);
	const [statistics, setStatistics] = useState<any>({});
	const [error, setError] = useState<boolean>(false);
	const fetchStat = useCallback(async () => {
		try {
			const response: any = await queryClient.fetchQuery(['analytics', { query: `` }], getStat);
			const data = response.data;
			setStatistics(data);
			setLoading(false);
		} catch (err: Error | any) {
			// Handle errors here
			setLoading(false);
			setError(true);
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetchStat();
		// eslint-disable-next-line
	}, []);

	if (loading) return <ActionLoader position="fixed" />;

	const { stat, trans } = statistics;
	console.log(stat);
	const { subscribedCount, totalAdmins, totalClients, totalUsers, unsubscribedCount } = stat[0];
	const { allPaidTransactions, countDonations, countSubscription, totalDonations, totalSubscription } = trans[0];
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
			<Stack component="main" direction={'row'} useFlexGap>
				Analytics
			</Stack>
			<Grid container spacing={2} sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between' }}>
				<Stack>
					<Box sx={{ paddingLeft: '20px' }}>Total Users: {totalUsers}</Box>
					<PieChart
						colors={['red', 'blue']}
						series={[
							{
								data: [
									{ id: 0, value: unsubscribedCount, label: 'Unsubscribed' },
									{ id: 1, value: subscribedCount, label: 'Subscribed' }
								]
							}
						]}
						width={500}
						height={200}
						// slotProps={{
						// 	legend: {
						// 		direction: 'row',
						// 		position: { vertical: 'bottom', horizontal: 'middle' },
						// 		padding: 0
						// 	}
						// }}
					/>
				</Stack>
				<Stack gap={2} alignItems={'flex-start'}>
					<Stack
						direction={'row'}
						useFlexGap
						alignItems={'center'}
						gap={3}
						sx={{ backgroundColor: '#e9e9e9', padding: '10px', borderRadius: '15px', width: 'fit-content' }}>
						<Box>
							<AttachMoney sx={{ fontSize: '35px' }} />
						</Box>
						<Stack direction={'column'}>
							<Box color="#8a8a8a">Total Money</Box>
							<Box>{totalDonations + totalSubscription}</Box>
						</Stack>
					</Stack>
					<PieChart
						colors={['green', 'yellow']}
						series={[
							{
								data: [
									{ id: 0, value: totalSubscription, label: 'Subscription $' },
									{ id: 1, value: totalDonations, label: 'Donations $' }
								]
							}
						]}
						width={500}
						height={200}
						// slotProps={{
						// 	legend: {
						// 		direction: 'row',
						// 		position: { vertical: 'bottom', horizontal: 'middle' },
						// 		padding: 0
						// 	}
						// }}
					/>
				</Stack>
			</Grid>

			<Stack direction={'row'} gap={5} justifyContent={'center'}>
				<Stack
					direction={'row'}
					useFlexGap
					alignItems={'center'}
					gap={3}
					sx={{ backgroundColor: '#e9e9e9', padding: '10px', borderRadius: '15px', width: 'fit-content' }}>
					<Box>
						<AttachMoney sx={{ fontSize: '35px' }} />
					</Box>
					<Stack direction={'column'}>
						<Box color="#8a8a8a">Num Transactions</Box>
						<Box>{allPaidTransactions}</Box>
					</Stack>
				</Stack>
				<Stack
					direction={'row'}
					useFlexGap
					alignItems={'center'}
					gap={3}
					sx={{ backgroundColor: '#e9e9e9', padding: '10px', borderRadius: '15px', width: 'fit-content' }}>
					<Box>
						<AttachMoney sx={{ fontSize: '35px' }} />
					</Box>
					<Stack direction={'column'}>
						<Box color="#8a8a8a">Num Subscriptions</Box>
						<Box>{countSubscription}</Box>
					</Stack>
				</Stack>
				<Stack
					direction={'row'}
					useFlexGap
					alignItems={'center'}
					gap={3}
					sx={{ backgroundColor: '#e9e9e9', padding: '10px', borderRadius: '15px', width: 'fit-content' }}>
					<Box>
						<AttachMoney sx={{ fontSize: '35px' }} />
					</Box>
					<Stack direction={'column'}>
						<Box color="#8a8a8a">Num Donations</Box>
						<Box>{countDonations}</Box>
					</Stack>
				</Stack>
			</Stack>

			{/* <LineChart
				xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
				series={[
					{
						data: [2, 5.5, 2, 8.5, 1.5, 5]
					}
				]}
				width={500}
				height={300}
			/> */}
		</Box>
	);
};

export default Analytics;
