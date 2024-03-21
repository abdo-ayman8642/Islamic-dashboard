import React from 'react';
import { Button, Container, Grid } from '@mui/material';
import { ToggleSubscribtion } from '../UserSection';

interface Props {
	onSubmitForm: (data: string) => void;
	id: string;
	type: ToggleSubscribtion;
}

const FormToggleSubscribe: React.FC<Props> = ({ onSubmitForm, id, type }) => {
	const onSubmit = (data: string) => {
		onSubmitForm(data);
	};

	return (
		<Container maxWidth="sm">
			<Grid container>
				<Grid item xs={12} sx={{ my: 4, textAlign: 'center' }}>
					Are You Sure You Want To {type === ToggleSubscribtion.ACCESS ? 'Access' : 'Deny'} User to all the content?
				</Grid>
				<Grid item xs={12}>
					<Button
						type="submit"
						variant="contained"
						color={type === ToggleSubscribtion.ACCESS ? 'success' : 'error'}
						sx={{ width: '100%' }}
						onClick={() => onSubmit(id)}>
						{type === ToggleSubscribtion.ACCESS ? 'Access' : 'Deny'}
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default FormToggleSubscribe;
