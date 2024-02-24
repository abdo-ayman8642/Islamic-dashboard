import { Controller } from "react-hook-form";
import { Box, Stack, Switch, Typography, styled } from "@mui/material";
import { IFormField } from "models/app";

interface Props extends IFormField {
    errors: any;
    watch: any;
    control: any;
    defaultValue?: any;
    onChange?: (e: any) => void;
    setValue?: any;
}
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));
const RHSwitch: React.FC<Props> = ({ label, name, disabled, control, defaultValue, hidden, watch, onChange, setValue }) => {
    return (
        <>
            <Box display={hidden ? "none" : 'flex'} flexDirection={'row'} my={2}>
                <Typography component="label" htmlFor={`${name}`}>
                    {label}
                </Typography>
                <Box sx={{ ml: 5 }}>
                    <Controller
                        control={control}
                        name={name}
                        render={({ field }) => (
                            <Stack direction="row" spacing={2} alignItems="center" mx={2}>
                                <Typography mx={1}>
                                    No
                                </Typography>
                                <AntSwitch inputProps={{ 'aria-label': 'ant design' }}
                                    name={field.name}
                                    onChange={(e) => onChange && onChange(e.target.checked)}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    disabled={disabled}
                                    defaultChecked={defaultValue}
                                />
                                <Typography >Yes</Typography>
                            </Stack>
                        )}
                    />
                </Box>


            </Box>

        </>
    );
};

export default RHSwitch;
