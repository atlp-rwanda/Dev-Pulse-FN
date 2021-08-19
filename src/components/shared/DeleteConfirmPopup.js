import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationDialog(props) {
  const {
    openDialog, closeDialog, items, confirmed,
  } = props;

  return (
    <Dialog
      open={openDialog}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className="confirmDialogModal"
    >
      <DialogTitle id="scroll-dialog-title">Delete Event</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
          Are you sure you want to delete
          {' '}
          {items}
          {' '}
          email(s)?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmed} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
