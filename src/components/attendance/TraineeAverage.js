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
    name: 'Standup',
    selector: 'title',
    sortable: true,
  },
  {
    name: 'Professional Skills',
    selector: 'year',
    sortable: true,
    right: true,
  },
  {
    name: 'Demo',
    selector: 'year',
    sortable: true,
    right: true,
  },
  {
    name: 'one on one',
    selector: 'year',
    sortable: true,
    right: true,
  },
  {
    name: 'Average',
    selector: 'year',
    sortable: true,
    right: true,
  },
];

const data = [{ id: 1, title: 1, year: 1 }];

const TraineeAverage = () => {
  return (
    <div>
      <DataTable columns={columns} data={data} customStyles={customStyles} noHeader responsive />
    </div>
  )
}

export default TraineeAverage
