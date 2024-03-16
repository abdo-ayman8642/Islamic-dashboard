import { Drawer, Stack } from "@mui/material";
import DrawerMenu from "./DrawerMenu";

type Props = {
	openDrawer: boolean;
	setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

function HeaderDrawer({ openDrawer, setOpenDrawer }: Props) {
	return (
		<Drawer anchor={"right"} open={openDrawer} onClose={() => setOpenDrawer(false)}>
			<Stack m={2} borderRadius={4}>
				{/* <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={2} mb={2}>
					<Typography variant="body2" fontWeight={600} color={"text.primary"}>{` Good ${getDayTime()}`}</Typography>
					<IconButton size="small" onClick={() => setOpenDrawer(false)}><Close color="inherit" /></IconButton>
				</Stack> */}
				{/* <SearchField /> */}
				<DrawerMenu setOpenDrawer={setOpenDrawer} />
			</Stack>
		</Drawer>
	);
}

export default HeaderDrawer;