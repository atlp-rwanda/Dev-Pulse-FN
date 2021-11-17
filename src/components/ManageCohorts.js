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
  addSprint,
  fetchSprints
} from '../actions/EngineerActions';
import AddSprintPopup from './shared/AddSprint';

class ManageCohorts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progId:'',
      program: {
        name: '',
        start: '',
        end: ''
      },
      openDialog: false,
      openListDialog: false,
    };
  }
  async getSprints() {
    console.log('getting all sprints mount');
    await this.props.fetchSprints();
  }

  componentDidMount() {
    this.getSprints();
  }

  handleRemove = (e) => {
    console.log(e.target.id);
    navigator.clipboard.writeText(e.target.id);
  };

  closeDialog = () => this.setState({ openDialog: false, openListDialog: false });

  openConfirDialog = () => {
    console.log('changing click');
    this.setState({ openDialog: true });
  };

  handleConfirmCreate = (sprintName) =>{
    console.log('allltogether', this.state.progId,sprintName);
    this.props.addSprint(
      sprintName,
      this.state.progId,
    );
    this.setState({ openDialog: false, progId: ''});
  }

  openCreateDialog = (progId) => {
    console.log('changing click', progId);
    this.setState({ openDialog: true, progId });
  };
  openListDialog = (progId) => {
    console.log('changing click', progId);
    this.setState({ openListDialog: true, progId });
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
      sprints,
    } = this.props;
    return (
      <>
      {console.log('state', this.state.progId)}
        <div className='emailsContainer'>
          <p className='tableHeader'>Manage Cohorts</p>
          <AddSprintPopup
            openDialog={this.state.openDialog}
            closeDialog={this.closeDialog}
            confirmed={this.handleConfirmCreate}
            title="Create a new sprint"
           />
           <AddSprintPopup 
            openDialog={this.state.openListDialog}
            closeDialog={this.closeDialog}
            title="All sprints"
            list={{state:true, data: sprints, progId: this.state.progId}}
           />
          <div className='maincontainer'>
            <div className='addRemoveWrapper'>
              <div className='addSection'>
                <AddCohort scope='cohort' handleSubmit={addCohort} />
              </div>
              <div className='removeSection'>
                <AddCohort
                  type='remove'
                  scope='cohort'
                  list={cohorts.map((c) => c.name)}
                  handleSubmit={(name) => {
                    const { id } = cohorts.find((c) => c.name === name);
                    removeCohort(id);
                  }}
                />
              </div>
            </div>
            <div className='viewEmailsContainer'>
              <div className='flex cohorts'>
                <CohortDropDown default='Select Cohort' />
                {selectedCohort && (
                  <div className="programSprints">
                    <AddCohort
                      style={{ width: '200px', zIndex: '0', padding: '0' }}
                      dated
                      popUp={{open:true, popModal: this.openConfirDialog}}
                      type='add'
                      scope='program'
                      handleSubmit={(program) =>{
                        addProgram(
                          program.name,
                          program.start,
                          program.end,
                          selectedCohort,
                        )
                      }}
                    />
                  </div>
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
                        onAddSprint={this.openCreateDialog}
                        onListSprint={this.openListDialog}
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
  sprints: state.engineer.sprints || [],
});
const mapDispatchToProps = {
  addCohort,
  updateCohort,
  removeCohort,
  addProgram,
  updateProgram,
  removeProgram,
  fetchPrograms,
  addSprint,
  fetchSprints,
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ManageCohorts);
