import { Alert } from '@mui/material';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { AlertObj, useAlert } from 'contexts/alertContext';
import React from 'react';

export interface State extends SnackbarOrigin {
  _open: boolean;
}

interface Props {
  alert: AlertObj;
}

const MuiSnackbar: React.FC<Props> = ({ alert }) => {
  const { setAlert } = useAlert();
  const handleClose = () => {
    setAlert({ open: false, message: "", type: "success" });
  };



  return (

    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={alert.open}
      onClose={handleClose}
      autoHideDuration={6000}
      key={'top right'}
    >
      <Alert onClose={handleClose} severity={alert.type} variant={'filled'}>
        {alert.message}
      </Alert>
    </Snackbar >
  )
};

export default MuiSnackbar;
