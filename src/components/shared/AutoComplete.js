/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));


export default function AutoComplete() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={(option) => option.email}
        filterSelectedOptions
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              variant="outlined"
              label="Add emails"
              placeholder="add comma separated emails"
            />
          </>
        )}
      />
    </div>
  );
}
