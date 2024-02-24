import React from 'react';
import ILogo from 'assets/images/__ShortLogo.png';
import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps { }

const ShortLogo: React.FC<Props> = (props: Props) => {
    return (
        <Box {...props} component={'img'} src={ILogo}
            sx={{ width: 48, height: 84 }} />
    );
}

export default ShortLogo;