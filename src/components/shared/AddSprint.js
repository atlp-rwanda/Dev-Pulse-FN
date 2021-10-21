import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AddSprintPopup(props) {
    const [name, setName] = React.useState('');
  const {
    openDialog, closeDialog, confirmed, list,title
  } = props;

  const handleTextChange = (e) =>{
      console.log('text', e.target.value);
    return setName(e.target.value);
  }
  const sprint = list?.data.filter((item, idx) => item.programId === list?.progId);
  console.log('filtered sprints', sprint,list);

  return (
    <Dialog
      open={openDialog}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className="confirmDialogModal"
    >
      <DialogTitle id="scroll-dialog-title" className="deleteModalTitle">{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          tabIndex={-1}
        >
        {
            !list?.state ? (
                <TextField 
                helperText="Sprint name is required"
                id="outlined-basic" 
                variant="outlined" 
                value={name}
                onChange={(e) => handleTextChange(e)}
                />
            ):(
                <ul className='sprintList'>
                    { !sprint.length && (<h4>No sprint created yet!</h4>)}
                    {
                        sprint?.map((item, idx) =>(
                            <li key={`item${idx}`}>{item?.name}</li>
                        ))
                    }
                    
                </ul>
            )
        }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          {list?.state ? 'Close' : 'Cancel'}
        </Button>
        {
            !list?.state ? (
                <Button onClick={()=>confirmed(name)} color="primary">
                Create
                </Button>
            ): null
        }
      </DialogActions>
    </Dialog>
  );
}
