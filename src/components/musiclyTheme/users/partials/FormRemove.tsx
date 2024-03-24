import React from 'react';
import { Button, Container, Grid } from '@mui/material';

interface Props {
	onSubmitForm: (data: string) => void;
	id: string;
}

const FormRemove: React.FC<Props> = ({ onSubmitForm, id }) => {
	const onSubmit = (data: string) => {
		onSubmitForm(data);
	};

	return (
		<Container maxWidth="sm">
			<Grid container>
				<Grid item xs={12} sx={{ my: 4, textAlign: 'center' }}>
					Are You Sure You Want To Remove Name From List?
				</Grid>
				<Grid item xs={12}>
					<Button type="submit" variant="contained" color="error" sx={{ width: '100%' }} onClick={() => onSubmit(id)}>
						Remove
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormRemove;
