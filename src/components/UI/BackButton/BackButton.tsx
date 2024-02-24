import React from 'react';
import MuiButton from '../MuiButton';
import useApp from 'hooks/useApp';
import { Box } from '@mui/material';

interface Props {
    path: string;
}


const BackButton: React.FC<Props> = ({ path }) => {
    const { push } = useApp();

    return (
        <>
            <Box display={'flex'} justifyContent={'center'} py={5}>
                <MuiButton variant="outlined" color="primary" size="large" sx={{ borderRadius: 5 }}
                    onClick={() => push(path)}
                >
                    Back
                </MuiButton>
            </Box>

        </>
    );
};

export default BackButton;