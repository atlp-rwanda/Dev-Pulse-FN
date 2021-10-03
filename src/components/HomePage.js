import React from 'react';
import { Link } from 'react-router-dom';
import Table from './table';
import ProgramDropDown from './shared/ProgramDropDown';
import CohortDropDown from './shared/CohortDropDown';
import BelowAverage from './shared/AverageDropDown';

const HomePage = () => (
  <div className="container">
    <p className="tableHeader">
      My Developers Average Score
    </p>
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
        <BelowAverage />
        <CohortDropDown />
        <ProgramDropDown />
      </div>
    </div>
    <Table />
  </div>
);

export default HomePage;
