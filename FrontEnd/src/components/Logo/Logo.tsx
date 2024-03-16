import React from 'react';
import ILogo from 'assets/images/__FULL_LOGO_02.png';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps { }

const Logo: React.FC<Props> = (props: Props) => {
    return (
        <Box {...props} component={'img'} src={ILogo}
            sx={{ width: 250, height: 150 }} />
    );
}

export default Logo;