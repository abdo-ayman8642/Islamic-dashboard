import { Box, Stack } from '@mui/material';

const Analytics: React.FC = () => {
	// if (loading) return <ActionLoader position="fixed" />;
	return (
		<Box>
			<Stack component="main" direction={'row'} useFlexGap>
				Analytics
			</Stack>
			{/* <PieChart
				series={[
					{
						data: [
							{ id: 0, value: 10, label: 'series A' },
							{ id: 1, value: 15, label: 'series B' },
							{ id: 2, value: 20, label: 'series C' }
						]
					}
				]}
				width={400}
				height={200}
			/>

			<LineChart
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
