import { Button, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  children: React.ReactNode;
}

const MuiButton: React.FC<Props> = (props: Props) => {
  const { sx, children, ...rest } = props;
  const styles: typeof sx = { textTransform: "capitalize", fontWeight: 500, ...sx };

  return (
    <Button disableElevation disableRipple sx={styles} {...rest} >
      {children}
    </Button>
  );
};

export default MuiButton;
