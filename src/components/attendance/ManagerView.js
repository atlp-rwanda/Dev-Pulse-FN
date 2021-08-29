import React from 'react'
import Add from '@material-ui/icons/Add';
import DataTable from 'react-data-table-component';

const customStyles = {

  headCells: {
    style: {
      backgroundColor: '#3359DF',
      fontSize: '17px',
      color: '#fff'
    },
  },
  cells: {
    style: {
      fontSize: '15px',
      color: "#3359DF"
    },
  },
};

const columns = [
  {
    name: 'Names',
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Standup',
    selector: 'standup',
    sortable: true,
  },
  {
    name: 'Professional Skills',
    selector: 'professional',
    sortable: true,
    right: true,
  },
  {
    name: 'Demo',
    selector: 'demo',
    sortable: true,
    right: true,
  },
  {
    name: 'one on one',
    selector: 'one_on_one',
    sortable: true,
    right: true,
  },
  {
    name: 'Average',
    selector: 'average',
    sortable: true,
    right: true,
  },
];

const data = [
  {name:'UMUHIRE heritier',standup:1,professional:2,demo:1,one_on_one:0,average:1 },
  {name:'IRADUKUNDA heritier',standup:1,professional:2,demo:1,one_on_one:0,average:1 },
  {name:'UKWIZAGIRA heritier',standup:1,professional:2,demo:1,one_on_one:0,average:1 },
  {name:'Eric niyonkuru',standup:1,professional:2,demo:1,one_on_one:0,average:1 }, 
];

const ManagerView = ({history}) => {
  const takeAttendance = () => {
history.push('/attendance/new');
  }
  return (
    <div className='attendance-wrapper'>
      <div className='att-header'>
        <h4>Attendance</h4>
      </div>
      <div className='att-controls'>
        <div className='att-btn'>
            <button className='btn' onClick={takeAttendance}>
              <Add />
            </button>
        </div>
        <div className='att-filters'>
          <select className='filter-data'>
            <option>All</option>
          </select>

          <select className='filter-data'>
            <option>All</option>
          </select>
        </div>


      </div>
      <div>
      <DataTable columns={columns} data={data} customStyles={customStyles} noHeader responsive />
      </div>
    </div>
  )
}

export default ManagerView
