import React from 'react';
import { Link } from 'react-router-dom';
import Table from './table';
import ProgramDropDown from './shared/ProgramDropDown';
import CohortDropDown from './shared/CohortDropDown';

const HomePage = () => (
  <div className="container">
<div className='tableHeading'>
 <div className='flex space-between items-center'>
 <div> My Developers Average Score</div>
  <Link className='btn mt-10' to='/ratings/rate/all'>Rate all</Link>
 </div>
</div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/list" className="btn">
        Edit My List
      </Link>
      <div className="filters">
        <CohortDropDown />
        <ProgramDropDown />
      </div>
    </div>
    <Table />
  </div>
);

export default HomePage;
