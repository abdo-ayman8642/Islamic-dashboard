import { Menu } from '@mui/icons-material';
import { Avatar, Grid, IconButton, Stack } from '@mui/material';
import { useState } from 'react';
import HeaderDrawer from './partials/Drawer';
import MuiOutlineButton from 'components/UI/MuiOutlineButton';
import useApp from 'hooks/useApp';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchField from './partials/SearchField';

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

			<Stack
				direction={'row'}
				alignItems={'center'}
				borderRadius={20}
				bgcolor="background.paper"
				p={1}
				spacing={1}
				sx={{ display: { xs: 'none', lg: 'flex' } }}>
				<SearchField />
				<IconButton>
					{/* <Badge badgeContent={2} color="error">
            <Notification color="inherit" />
          </Badge> */}
				</IconButton>
				<IconButton>
					<Avatar
						alt="User Image"
						src={
							'https://images.unsplash.com/photo-1576558656222-ba66febe3dec?ilgib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
						}
						sx={{ width: 24, height: 24 }}
					/>
				</IconButton>
			</Stack>
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
