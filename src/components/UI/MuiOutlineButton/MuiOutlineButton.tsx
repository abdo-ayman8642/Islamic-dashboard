import { Button, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MuiOutlineButton: React.FC<Props> = (props: Props) => {
  const { sx, children, onClick, ...rest } = props;
  const styles: typeof sx = {
    alignSelf: "flex-start",
    textTransform: "capitalize",
    borderColor: "primary.main",
    border: "1px solid",
    ...sx
  };

  return (
    <Button onClick={onClick} disableElevation disableRipple sx={styles} {...rest}>
      {children}
    </Button>
  );
};

export default MuiOutlineButton;
