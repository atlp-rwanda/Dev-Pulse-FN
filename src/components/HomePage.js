import React from 'react';
import { Link } from 'react-router-dom';
import Table from './table';
import ProgramDropDown from './shared/ProgramDropDown';
import CohortDropDown from './shared/CohortDropDown';
import BelowAverage from './shared/AverageDropDown';

const HomePage = () => (
  <div className="container">
<div className='tableHeading'>
 <div className='flex space-between items-center'>
 <div> My Developers Average Score</div>
  <Link className='btns mt-10' to='/ratings/rate/all'>Rate all</Link>
 </div>
</div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/list" className="btns">
        Edit My List
      </Link>
      <div className="filters">
        <BelowAverage />
        <CohortDropDown />
        <ProgramDropDown />
      </div>
    </div>
    <Table />
  </div>
);

export default HomePage;
