import { Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Grid, Typography } from '@mui/material';
import React from 'react';
import { CloseOutlined } from '@mui/icons-material';
import MuiButton from '../MuiButton';

interface Props extends DialogProps {
	open: boolean;
	onClose: () => void;

	title: string;
	children: React.ReactNode;
	actions?: React.ReactNode;
}

const DialogModal: React.FC<Props> = ({ open, onClose, title, children, actions, ...rest }) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth={rest.maxWidth || 'md'} {...rest}>
			{
				<DialogTitle
					sx={{
						backgroundColor: '#F8F7F7',
						padding: '1rem 1.5rem',
						borderBottom: '1px solid #E0E0E0',
						'& .MuiTypography-h6': {
							color: '#333333'
						}
					}}>
					<Grid container justifyContent="space-between" alignItems="center">
						<Typography variant="h6">{title}</Typography>

						<MuiButton sx={{ color: 'gray', minWidth: 40 }} size="small" onClick={onClose}>
							<CloseOutlined fontSize="small" />
						</MuiButton>
					</Grid>
				</DialogTitle>
			}
			<DialogContent sx={{ overflowX: 'hidden' }}>{children}</DialogContent>
			{actions && <DialogActions>{actions}</DialogActions>}
		</Dialog>
	);
};

export default DialogModal;
