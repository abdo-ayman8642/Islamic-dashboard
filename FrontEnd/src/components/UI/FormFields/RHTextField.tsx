import { Controller } from 'react-hook-form';
import { Grid, TextField, Typography } from '@mui/material';
import { IFormField } from 'models/app';

interface Props extends IFormField {
	errors: any;
	control: any;
	required?: boolean;
	defaultValue?: any;
	setValue?: any;
	errorMessage?: string;
}

const RHTextField: React.FC<Props> = ({ label, name, type, placeholder, disabled, autoFocus, control, errors, required, defaultValue, onChange, setValue, hidden, isHorizontal, errorMessage }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Grid container alignItems={'center'} hidden={hidden}>
					<Grid item xs={12} md={label ? !isHorizontal ? 12 : 2 : 12}>
						{label && <Typography variant="body2" fontWeight={700} textAlign={'start'} minWidth={'16ch'}>
							{label}
						</Typography>}
					</Grid>
					<Grid item xs={12} md={label ? !isHorizontal ? 12 : 10 : 12}>
						<TextField
							fullWidth
							size="small"
							{...field}
							required={required}
							type={type}
							disabled={disabled}
							autoFocus={autoFocus}
							placeholder={placeholder}
							error={!!errors[name]}
							onChange={(e) => {
								onChange && onChange(e.target.value);
								setValue && setValue(name, e.target.value);
							}}
							helperText={errors[name] && `${errors[name].message}`}
							defaultValue={defaultValue}
							sx={{
								borderRadius: 1,
								"& .MuiOutlinedInput-root": {
									bgcolor: 'common.white',
								},
							}}
							multiline={type === "textarea"}
							rows={type === "textarea" ? 5 : undefined}
						/>
					</Grid>
					<Grid item xs={12}>
						{errorMessage && <Typography variant="caption" color="error.main" textAlign={'start'}>
							{errorMessage}
						</Typography>}
					</Grid>
				</Grid>
			)}
		/>
	);
};

export default RHTextField;
