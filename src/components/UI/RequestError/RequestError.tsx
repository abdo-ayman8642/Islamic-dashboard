import { Typography } from "@mui/material";

interface Props {
  message: string;
}

const RequestError: React.FC<Props> = ({ message }) => {
  return (
    <Typography color="error" textAlign={"center"} component={"p"} variant="h6">
      {message}
    </Typography>
  );
};

export default RequestError;
