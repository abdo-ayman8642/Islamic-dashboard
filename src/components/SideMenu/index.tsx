import { Alert, Grid, Link, Stack } from '@mui/material';
import ActionLoader from 'components/UI/ActionLoader';
import React from 'react';
import { useQuery } from 'react-query';
import MenuItem from '../MenuItem';
import { Feature } from 'models/api';
import { fetchServices } from 'framework/services';

interface Props {}

const SideMenu: React.FC<Props> = () => {
	const [open, setOpen] = React.useState(false);

	const { data, isError, isLoading } = useQuery<Feature[]>('features', fetchServices);
	let user = JSON.parse(localStorage.getItem('profile') || '{}');

	let features: Feature[] | undefined = data;

	if (isError) return <Alert severity="error">An error occurred while fetching features.</Alert>;
	if (isLoading) return <ActionLoader position="fixed" />;

	return (
		<Stack
			component={'aside'}
			maxWidth={open ? 280 : 80}
			zIndex={1200}
			sx={{
				flexShrink: 0,
				position: 'sticky',
				top: 0,
				bgcolor: 'black',
				transition: '500ms',
				borderRadius: '0px 10px 10px 0px',
				overflowX: 'hidden',
				overflowY: 'auto',
				display: { xs: 'none', lg: 'block' },
				boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
				p: 1
			}}
			onMouseOver={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}>
			<Stack justifyContent={'center'} spacing={2}>
				<Grid container justifyContent={'center'} minHeight={200}>
					<Link href="/analytics" />
				</Grid>
				{features &&
					features.length > 0 &&
					features.map((feature, index) => (
						<MenuItem
							key={index}
							name={feature.name}
							icon={feature.icon}
							color={'white'}
							slug={feature.slug}
							open={open}
						/>
					))}
			</Stack>
		</Stack>
	);
};

export default SideMenu;
