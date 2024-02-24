import { TextField } from '@mui/material';
import useApp from 'hooks/useApp';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchField() {
	const { push } = useApp();
	const [data, setData] = useState<{ open: boolean; search: string }>({ open: false, search: '' });
	function handleSubmit(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		push(`/blog/?search_term=${data.search}`);
	}

	return (
		<TextField
			placeholder="Search"
			variant="standard"
			size="small"
			color="primary"
			type="text"
			value={data.search}
			onChange={(e) => setData({ ...data, search: e.target.value })}
			onKeyDown={(e: any) => e.key === 'Enter' && handleSubmit(e)}
			sx={{ display: 'flex', width: 250, p: 1, bgcolor: 'background.default', borderRadius: 48 }}
			InputProps={{
				disableUnderline: true,
				startAdornment: <SearchIcon fontSize="small" color="inherit" sx={{ mx: 1 }} />
			}}
		/>
	);
}

export default SearchField;
