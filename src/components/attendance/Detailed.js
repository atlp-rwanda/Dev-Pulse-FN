import React from 'react'
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
    name: 'Date',
    selector: 'date',
    sortable: true,
  },
  {
    name: 'Session',
    selector: 'session',
    sortable: true,
  },
  {
    name: 'Record',
    selector: 'record',
    sortable: true,
  },

];

const data = [
  { date: '19/08/2021', session: 'Standup', record: 2 },
  { date: '19/08/2021', session: 'Standup', record: 2 },
  { date: '20/08/2021', session: 'Professional skills', record: 0 },
  { date: '20/08/2021', session: 'Demo', record: 2 },
  { date: '18/08/2021', session: 'One on one', record: 1 },
  { date: '21/08/2021', session: 'Standup', record: 1 },
  { date: '23/08/2021', session: 'Standup', record: 3 },
  { date: '23/08/2021', session: 'Professional skills', record: 1 },
  { date: '23/08/2021', session: 'Demo', record: 3 },
  { date: '24/08/2021', session: 'One on one', record: 0 }
];

const TraineeAverage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} customStyles={customStyles} noHeader responsive pagination />
    </div>
  )
}

export default TraineeAverage
