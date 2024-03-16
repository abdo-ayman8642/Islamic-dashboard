import { Alert, Divider, Grid, List, Stack } from "@mui/material";
import MenuItem from "components/MenuItem";
import ActionLoader from "components/UI/ActionLoader";
import MuiOutlineButton from "components/UI/MuiOutlineButton";
import { fetchServices } from "framework/services";
import { Feature } from "models/api";
import { useQuery } from "react-query";
import LogoutIcon from "@mui/icons-material/Logout";
import useApp from "hooks/useApp";


interface Props {
	setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerMenu: React.FC<Props> = ({ setOpenDrawer }) => {
	const { data, isError, isLoading } = useQuery<Feature[]>("features", fetchServices);
	let features: Feature[] | undefined = data;
	const { push } = useApp();
	// let user: any | null = JSON.parse(localStorage.getItem("user")!);
	// if (!user) user = { name: "Administrator" }
	const handleLogout = () => {

		localStorage.clear();
		push("/login");
		return;

	};
	if (isError) return <Alert severity="error">An error occurred while fetching features.</Alert>;
	if (isLoading) return <ActionLoader position="fixed" />;


	return (
		<List>
			{/*<ListItem disablePadding>
			 <ListItemButton>
					<ListItemIcon>
						<Avatar alt="User Image" src={"https://images.unsplash.com/photo-1576558656222-ba66febe3dec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"} sx={{ width: "24px", height: "24px" }} />
					</ListItemIcon>
					<ListItemText primary="Profile" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<NotificationsIcon sx={{ fill: "#757575" }} />
					</ListItemIcon>
					<ListItemText primary="Notifications" />
				</ListItemButton>
			</ListItem> */}
			<Divider sx={{ mb: 1 }} />
			<Stack spacing={2}>
				{(features && features.length > 0) && features.map((feature, index) => <MenuItem key={index} name={feature.name} icon={feature.icon} color={"black"} slug={feature.slug} setOpenDrawer={setOpenDrawer} open={true} />)}
				<Grid container justifyContent={'center'}>
					<MuiOutlineButton variant="outlined" color="inherit" size="small"
						startIcon={<LogoutIcon sx={{ fill: "#232323" }} />}
						onClick={handleLogout}
					>Logout</MuiOutlineButton>
				</Grid>
			</Stack>
		</List >
	);
}

export default DrawerMenu;