import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

interface Props {
  url: string;
  alt?: string;
  sx?: SxProps<Theme>;
}


const Image: React.FC<Props> = ({ url, alt, sx }) => {
  return (
    <>
      {url && <Box
        sx={{
          backgroundImage: `url(${url || ''})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: (theme) => theme.transitions.create(['border-color', 'box-shadow']),
          '&:focus': {
            borderColor: (theme) => theme.palette.secondary.main,
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.secondary.main}`,
          },
          width: '100%',
          height: 150,
          ...sx
        }}
      />}
      {!url && alt + "..."}
    </>
  );
};


export default Image;