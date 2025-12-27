import Alert, { AlertProps } from '@mui/material/Alert';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { forwardRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';

export type ToastProps = {
  open: boolean;
  message?: string;
  severity?: AlertProps['severity'];
  anchorOrigin?: SnackbarProps['anchorOrigin'];
  autoHideDuration?: SnackbarProps['autoHideDuration'];
  onClose?: SnackbarProps['onClose'];
};

const Toast = forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const autoHideDuration = props.autoHideDuration ?? 4000;
  const anchorOrigin = props.anchorOrigin ?? {
    vertical: 'top',
    horizontal: 'right',
  };

  const icon =
    props.severity === 'success' ? (
      <CheckIcon fontSize="inherit" />
    ) : props.severity === 'error' ? (
      <Close fontSize="inherit" />
    ) : undefined;

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      onClose={props.onClose}
    >
      <Alert variant="filled" severity={props.severity} icon={icon}>
        {props.message}
      </Alert>
    </Snackbar>
  );
});

Toast.displayName = 'Toast';

export default Toast;
