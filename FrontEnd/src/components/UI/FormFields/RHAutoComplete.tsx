import { Autocomplete, TextField, Typography, Grid, IconButton, Tooltip, Stack } from '@mui/material';
import { IFormField, IOption } from 'models/app';
import { Controller } from 'react-hook-form';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import { RemoveDone } from '@mui/icons-material';

// ... other imports ...

interface Props extends IFormField {
	control: any;
	watch: any;
	defaultValue?: IOption;
	hidden?: boolean;
	icon?: React.ReactNode; // Icon prop,
	setValue?: any;
}

const RHAutoComplete: React.FC<Props> = ({ label, name, control, watch, multiple, options, onChange, defaultValue, hidden, isHorizontal, setValue, canSelectAll }) => {
	const value = watch(name) || [];
	const handleChange = (e: any) => {
		onChange && onChange(e);
	};

	const getOptionDisabled = (option: IOption) => {
		if (!multiple) {
			return option?.value! === value?.value!;
		}
		if (!value) return false;
		return value.some((selectedOption: IOption) => selectedOption.label === option.label);
	};

	const handleSelectAll = () => {
		setValue && setValue(name, options);
		onChange && onChange(options);
	};
	const handleUnSelectAll = () => {
		setValue && setValue(name, []);
		onChange && onChange([]);
	};

	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { ref, onChange, ...field } }) => (
				<Grid container alignItems={'center'} hidden={hidden} >
					<Grid item xs={12} md={label ? !isHorizontal ? 12 : 2 : 12} mt={.5}>
						{label && <Typography variant="body2" fontWeight={600} textAlign={'start'} minWidth={'16ch'}>
							{label}
						</Typography>}

					</Grid>
					<Grid item xs={12} md={label ? !isHorizontal ? 12 : 10 : 12}>
						<Autocomplete
							sx={{
								width: '100%',
							}}
							multiple={multiple ? true : false}
							limitTags={100}
							options={options!}
							value={value}
							getOptionDisabled={getOptionDisabled}
							isOptionEqualToValue={(option: any, value) => option.value === value?.value!}
							filterOptions={(options, state) => {
								if (state.inputValue?.length! === 0 || options.length === 0) return options;
								return options = options.filter((option: IOption) => option?.label?.toLowerCase()?.startsWith(state?.inputValue.toLowerCase()));
							}}
							onChange={(_, data) => {
								onChange(data)
								handleChange(data);
								setValue && setValue(name, data);
							}}

							getOptionLabel={(option: IOption) => option.label || ""}
							renderInput={(params) => (
								<TextField
									{...params}
									{...field}
									inputRef={ref}
									InputLabelProps={{ children: "" }}
									fullWidth
									size="small"
									sx={{
										"& .MuiOutlinedInput-root": {
											bgcolor: 'common.white',
										},
									}}
								/>
							)}
						/>
						{canSelectAll && <Stack direction={'row'} spacing={1}>
							<Tooltip title="Select All">
								<IconButton size="small" onClick={handleSelectAll}>
									<SelectAllIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Unselect All">
								<IconButton size="small" onClick={handleUnSelectAll}>
									<RemoveDone />
								</IconButton>
							</Tooltip>
						</Stack>}
					</Grid>
				</Grid>

			)}
		/>
	);
};

export default RHAutoComplete;