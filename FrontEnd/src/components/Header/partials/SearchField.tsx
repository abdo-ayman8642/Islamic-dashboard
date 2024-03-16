import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SerachProp {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

function SearchField({ onChange, value }: SerachProp) {
	return (
		<TextField
			placeholder="Search"
			variant="standard"
			size="small"
			color="primary"
			type="text"
			value={value}
			multiline
			onChange={onChange}
			sx={{ display: 'flex', width: 250, p: 1, bgcolor: 'background.default', borderRadius: 48 }}
			InputProps={{
				disableUnderline: true,
				startAdornment: <SearchIcon fontSize="small" color="inherit" sx={{ mx: 1 }} />
			}}
		/>
	);
}

export default SearchField;
