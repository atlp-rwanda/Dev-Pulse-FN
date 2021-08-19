import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';

class ChangeCohort extends React.Component {
  render() {
    return (
      <div className="cohorts-change">
        <CgArrowsExchangeAltV
          style={{ fontSize: '24px' }}
        />
        <div className="change-cohort">
          <p>cohort 1</p>
          <p>cohort 2</p>
          <p>cohort 3</p>
        </div>
      </div>
    );
  }
}

export default ChangeCohort;
