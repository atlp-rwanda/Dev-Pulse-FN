import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const AddCohort = ({ type, scope, handleSubmit, style, dated, list }) => {
  const [data, setData] = React.useState('');
  const [start, setStart] = React.useState('');
  const [end, setEnd] = React.useState('');

  const onSubmit = () => {
    if (!dated) handleSubmit(data);
    else handleSubmit({ name: data, start, end });
    setStart('');
    setData('');
    setEnd('');
  };

  return (
    <div style={style || {}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='add-emails'
        >
          <h3 style={{ textTransform: 'capitalize' }}>
            {type} {scope}
          </h3>
        </AccordionSummary>
        <AccordionDetails className='addWrapper'>
          {type !== 'remove' ? (
            <div className='tagContainer'>
              <input
                type='text'
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder={`${scope} to ${type}`}
                required
              />
            </div>
          ) : (
            <Autocomplete
              className='autoCompleteInput'
              multiple={false}
              options={list || []}
              // getOptionLabel={(option) => option}
              value={data}
              onChange={(_, val) => setData(val)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  placeholder={`${scope} to ${type}`}
                />
              )}
            />
          )}
          {dated && (
            <>
              <div className='tagContainer'>
                <input
                  type='date'
                  placeholder='Start date'
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  required
                />
              </div>
              <div className='tagContainer'>
                <input
                  type='date'
                  value={end}
                  placeholder='End date'
                  onChange={(e) => setEnd(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <Button
            className={type === 'remove' ? 'removeButton' : 'addButton'}
            color={type === 'remove' ? 'secondary' : 'primary'}
            variant='contained'
            onClick={onSubmit}
          >
            {type}
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

AddCohort.defaultProps = { type: 'add', scope: 'cohort' };

export default AddCohort;
