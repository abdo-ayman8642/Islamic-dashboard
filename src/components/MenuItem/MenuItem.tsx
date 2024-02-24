import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LineAxisIcon from '@mui/icons-material/LineAxis';
import { Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import useApp from "hooks/useApp";
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TopicIcon from '@mui/icons-material/Topic';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface Props {
  name: string;
  icon: string;
  color: "black" | "white";
  slug?: string;
  action?: () => void;
  setOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

const MenuItem: React.FC<Props> = ({
  name,
  icon,
  color,
  slug,
  action,
  setOpenDrawer,
  open,
}) => {
  const { currentRoute, push } = useApp();
  const isSelected = currentRoute === `/${slug!}`;

  const renderIcon = (icon: string): React.ReactNode => {
    if (icon === "DashboardIcon")
      return (
        <DashboardIcon
          sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }}
        />
      );
    if (icon === "LogoutIcon")
      return (
        <LogoutIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "LineAxisIcon")
      return (
        <LineAxisIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "PersonIcon")
      return (
        <PersonIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "InsertChartIcon")
      return (
        <InsertChartIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "TopicIcon")
      return (
        <TopicIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "QueryStatsIcon")
      return (
        <QueryStatsIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );
    if (icon === "CalendarTodayIcon")
      return (
        <CalendarTodayIcon sx={{ fill: color === "white" ? "#FFFFFF" : "#232323" }} />
      );

    return null;
  };

  const handleClick = () => {
    push(`/${slug!}`);
    if (setOpenDrawer) setOpenDrawer(false);
  };

  return (
    <Stack
      component={slug ? "a" : "button"}
      direction={"row"}
      alignItems={"unset"}
      bgcolor={
        isSelected
          ? color === "white"
            ? "#FFFFFF40"
            : "#00000040"
          : "transparent"
      }
      px={3}
      border={"none"}
      borderRadius={1}
      onClick={handleClick}
      sx={{
        transition: "500ms",
        "&:hover": { bgcolor: color === "white" ? "#FFFFFF40" : "#00000040" },
        cursor: "pointer",
      }}
    >
      {renderIcon(icon)}
      {open && (
        <Typography
          variant="body1"
          fontWeight={500}
          color={color === "white" ? "background.default" : "text.primary"}
          sx={{
            mx: 2,
            minWidth: 200,
          }}
        >
          {name}
        </Typography>
      )}
    </Stack>
  );
};

export default MenuItem;
