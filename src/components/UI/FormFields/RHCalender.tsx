import { Controller } from "react-hook-form";
import { Grid, TextField, Typography } from "@mui/material";
import { IFormField } from "models/app";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from "@mui/x-date-pickers";
import MuiButton from "../MuiButton";
interface Props extends IFormField {
    errors: any;
    control: any;
    required?: boolean;
    defaultValue?: any;
    onChange?: (e: any) => void;
    grid?: number;
    watch?: any;
}

const RHCalender: React.FC<Props> = ({
    label,
    name,
    type,
    placeholder,
    disabled,
    autoFocus,
    control,
    errors,
    required,
    defaultValue,
    hidden,
    endAdornment,
    startAdornment,
    onChange,
    helperText,
    watch,
    isHorizontal,
    yearsOnly
}) => {
    const value = watch(name) || defaultValue || new Date();
    const handleChange = (e: any) => onChange && onChange(e);
    const handleReset = () => {
        onChange && onChange(null);
    };
    return (
        <Grid display={hidden ? "none" : 'block'}>
            <Grid container alignItems={'center'} hidden={hidden} >
                <Grid item xs={12} md={label ? !isHorizontal ? 12 : 2 : 12} display={'flex'} justifyContent={'space-between'}>
                    {label && <Typography variant="body2" fontWeight={600} textAlign={'start'} minWidth={'16ch'}>
                        {label}
                    </Typography>}
                    <MuiButton variant="text" onClick={handleReset} sx={{ fontSize: 12 }}> Reset </MuiButton>
                </Grid>
                <Grid item xs={12} md={label ? !isHorizontal ? 12 : 10 : 12}>
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange, ...field } }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    value={value}
                                    views={yearsOnly ? ['year'] : ["year", "month", "day"]}
                                    openTo={yearsOnly ? 'year' : 'day'}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            {...field}
                                            value={value || null}
                                            error={!!errors[name]}
                                            helperText={errors[name] ? `${errors[name].message}` : helperText}
                                            fullWidth
                                            size="small"

                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    borderRadius: 1,
                                                    px: 2,
                                                    bgcolor: 'common.white',
                                                },

                                            }}

                                        />
                                    )}
                                    onChange={(e) => {
                                        onChange(e);
                                        handleChange(e);
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
            </Grid >
        </Grid>
    );
};

export default RHCalender;

