import { Menu } from '@mui/icons-material';
import { Grid, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import HeaderDrawer from './partials/Drawer';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import useApp from 'hooks/useApp';
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const { push } = useApp();
	// let user: any | null = JSON.parse(localStorage.getItem("user")!);
	// if (!user) user = { name: "Administrator" }
	const handleLogout = () => {
		localStorage.clear();
		push('/login');
		return;
	};
	return (
		<Stack component="header" direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ p: 1 }}>
			{/* <Typography variant="h5" color={'text.primary'}>{`Welcome Administrator`}</Typography> */}
			<IconButton sx={{ display: { xs: 'block', lg: 'none' } }} size="small" onClick={() => setOpenDrawer(true)}>
				<Menu />
			</IconButton>
			<HeaderDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />

			<Grid container justifyContent={'flex-end'} sx={{ display: { xs: 'none', lg: 'flex' } }}>
				<MuiOutlineButton
					variant="outlined"
					color="inherit"
					size="small"
					startIcon={<LogoutIcon sx={{ fill: '#232323' }} />}
					onClick={handleLogout}>
					Logout
				</MuiOutlineButton>
			</Grid>
		</Stack>
	);
};

export default Header;
