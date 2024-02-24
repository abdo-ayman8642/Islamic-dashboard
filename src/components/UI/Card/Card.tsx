import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  children: React.ReactNode;
}

const Card: React.FC<Props> = (props: Props) => {
  const { sx, children, ...rest } = props;
  const styles: typeof sx = {
    background: "#FFFFFF",
    boxShadow: "rgba(17, 12, 46, 0.15) 0px 0px 16px 0px",
    borderRadius: "6px",
    p: 2,
    ...sx,
  };

  return (
    <Box sx={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
