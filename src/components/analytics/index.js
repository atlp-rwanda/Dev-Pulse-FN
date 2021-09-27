import React, { Component } from 'react';
import TraaineesTable from '../shared/TraaineesTable';

class Analytics extends Component {
  render() {
    return (
      <>
        <div className='emailsContainer'>
          <p className='tableHeader'>Analytics</p>
          <div className='flex'>
            <TraaineesTable />
          </div>
        </div>
      </>
    );
  }
}

export default Analytics;
