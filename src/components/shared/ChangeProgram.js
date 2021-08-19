import React from 'react';
import { CgArrowsExchangeAltV } from 'react-icons/cg';

class ChangeProgram extends React.Component {
  render() {
    return (
      <div className="cohorts-change">
        <CgArrowsExchangeAltV
          style={{ fontSize: '24px' }}
        />
        <div className="change-cohort">
          <p>Bootcamp</p>
          <p>Project Work</p>
          <p>Apprenticeship</p>
        </div>
      </div>
    );
  }
}

export default ChangeProgram;
