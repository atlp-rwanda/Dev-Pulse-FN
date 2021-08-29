import { DeleteForever, Edit } from '@material-ui/icons';
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
      <Edit onClick={() => setEditing(!editing)} />{' '}
      {!editing ? (
        <p>{editVal.name}</p>
      ) : (
        <div className='cohortChange'>
          <form onSubmit={handleEdit} className='tagContainer'>
            <input
              type='text'
              value={editVal.name}
              onChange={(e) => setEditVal({ ...editVal, name: e.target.value })}
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
          </form>
          <button>
            <DeleteForever onClick={handleDelete} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EachProgram;
