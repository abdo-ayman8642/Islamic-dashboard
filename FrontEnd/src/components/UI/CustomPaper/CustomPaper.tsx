import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  sx?: any;
}

const CustomPaper: React.FC<Props> = ({ children, sx }) => {
  return (
    <Box
      sx={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 6px rgba(77, 93, 250, 0.3)",
        borderRadius: "6px",
        p: 1,
        mb: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default CustomPaper;
