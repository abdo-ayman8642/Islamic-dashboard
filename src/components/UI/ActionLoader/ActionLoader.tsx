import { FC } from "react";
import Box from "@mui/material/Box";

import ContentLoader from "components/UI/ContentLoader/ContentLoader";
import { Alert, Stack } from "@mui/material";

interface Props {
  position: string;
  message?: string;
}

const ActionLoader: FC<Props> = ({ position, message }) => (
  <Box
    sx={{
      position: position,
      top: 0,
      left: 0,
      zIndex: (theme) => theme.zIndex.appBar - 1,
      background: "rgba(255,255,255,.7)",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Stack spacing={2} alignItems="center">
      <ContentLoader />
      {message && (
        <Alert severity="info">{message}</Alert>
      )
      }
    </Stack>
  </Box>
);

export default ActionLoader;
