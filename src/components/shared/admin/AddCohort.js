import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from '@material-ui/core';

const AddCohort = ({ type, scope, handleSubmit, style, dated }) => {
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
          <div className='tagContainer'>
            <input
              type='text'
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder={`${scope} to ${type}`}
              required
            />
          </div>
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
            className='addButton'
            variant='contained'
            color='primary'
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
