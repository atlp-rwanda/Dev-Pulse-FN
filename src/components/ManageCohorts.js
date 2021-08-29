import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AddCohort from './shared/admin/AddCohort';
import CohortDropDown from './shared/CohortDropDown';
import EachProgram from './shared/admin/EachProgram';
import {
  addCohort,
  updateCohort,
  removeCohort,
  addProgram,
  removeProgram,
  updateProgram,
  fetchPrograms,
} from '../actions/EngineerActions';

class ManageCohorts extends Component {
  componentDidMount() {}

  handleRemove = (e) => {
    console.log(e.target.id);
    navigator.clipboard.writeText(e.target.id);
  };

  render() {
    const {
      programs,
      selectedCohort,
      addCohort,
      cohorts,
      removeCohort,
      addProgram,
      removeProgram,
      updateProgram,
      updateCohort,
      fetchPrograms,
    } = this.props;
    return (
      <>
        <div className='emailsContainer'>
          <p className='tableHeader'>Manage Cohorts</p>
          <div className='maincontainer'>
            <div className='addRemoveWrapper'>
              <div className='addSection'>
                <AddCohort scope='cohort' handleSubmit={addCohort} />
              </div>
              <div className='removeSection'>
                <AddCohort
                  type='remove'
                  scope='cohort'
                  handleSubmit={(name) => {
                    const { id } = cohorts.find((c) => c.name === name);
                    removeCohort(id);
                  }}
                />
              </div>
            </div>
            <div className='viewEmailsContainer'>
              <div className='flex'>
                <CohortDropDown default='Select Cohort' />
                {selectedCohort && (
                  <AddCohort
                    style={{ width: '200px', zIndex: '0', padding: '0' }}
                    dated
                    type='add'
                    scope='program'
                    handleSubmit={(program) =>
                      addProgram(
                        program.name,
                        program.start,
                        program.end,
                        selectedCohort
                      )
                    }
                  />
                )}
              </div>
              <div className='allEmails'>
                {!programs || programs.length ? null : (
                  <h5>No program(s) saved yet!</h5>
                )}
                {programs &&
                  programs
                    .filter((p) => p.cohortId === selectedCohort)
                    .map((program) => (
                      <EachProgram
                        onEdit={(program) =>
                          updateProgram(program.id, program, selectedCohort)
                        }
                        onDelete={(id) => removeProgram(id)}
                        program={program}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedCohort: state.engineer.selectedCohort || '',
  cohorts: state.engineer.cohorts || [],
  programs: state.engineer.programs || [],
});
const mapDispatchToProps = {
  addCohort,
  updateCohort,
  removeCohort,
  addProgram,
  updateProgram,
  removeProgram,
  fetchPrograms,
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ManageCohorts);
