import React from 'react';

import { Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const SuccessSnackBarMessage = (props) => {
  const { open, message, close } = props;
  return (
    <div>
      <Snackbar
        className="successSnackbar"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={close}
        message={message}
        key={`${message}`}
        action={(
          <>
            <IconButton style={{ backgroundColor: 'green', color: 'white' }} size="small" aria-label="close" color="inherit" onClick={close}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
};

export const ErrorSnackBarMessage = (props) => {
  const { open, message, close } = props;

  return (
    <div>
      <Snackbar
        className="errorSnackbar"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={close}
        message={message}
        key={`${message}`}
        action={(
          <>
            <IconButton style={{ backgroundColor: 'red', color: 'white' }} size="small" aria-label="close" color="inherit" onClick={close}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      />
    </div>
  );
};
