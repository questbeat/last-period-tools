import React, { useCallback } from 'react'
import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'

const Alert: React.FC<AlertProps> = (props) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)

interface CopySnackbarProps {
  message: string
  open: boolean
  onClose: () => void
  severity: Color
}

export const Notification: React.FC<CopySnackbarProps> = ({
  message,
  open,
  onClose,
  severity,
}) => {
  const handleClose = useCallback(() => onClose(), [onClose])

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}
