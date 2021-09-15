import { DeleteForever, Edit, Check } from '@material-ui/icons';
import React, { useState } from 'react';

const EachProgram = ({ program, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState({
    ...program,
    start_date: program.start_date && program.start_date.split('T')[0],
    end_date: program.end_date && program.end_date.split('T')[0],
  });

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit({
      ...editVal,
      cohort: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
    e.target.reset();
    setEditing(false);
  };

  const handleDelete = () => {
    setEditing(false);
    onDelete(program.id);
  };

  return (
    <div className='eachEmail eachProgram' key={program.name}>
      <Edit
        style={{ cursor: 'pointer' }}
        onClick={() => setEditing(!editing)}
      />{' '}
      {!editing ? (
        <p>{editVal.name}</p>
      ) : (
        <div className='cohortChange'>
          <form onSubmit={handleEdit} style={{ display: 'flex' }}>
            <div className='tagContainer'>
              <input
                type='text'
                value={editVal.name}
                onChange={(e) =>
                  setEditVal({ ...editVal, name: e.target.value })
                }
              />
              <input
                type='date'
                value={editVal.start_date}
                onChange={(e) =>
                  setEditVal({ ...editVal, start_date: e.target.value })
                }
              />
              <input
                type='date'
                value={editVal.end_date}
                onChange={(e) =>
                  setEditVal({ ...editVal, end_date: e.target.value })
                }
              />
            </div>
            <div
              style={{
                padding: '0 3px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <button type='submit'>
                <Check />
              </button>
              <button type='button'>
                <DeleteForever onClick={handleDelete} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EachProgram;
