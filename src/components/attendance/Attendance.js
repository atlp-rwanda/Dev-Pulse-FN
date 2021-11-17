import React, { useEffect } from 'react'
import { getUserInfo } from '../../helpers/token';
import ManagerView from './ManagerView';
import TraineeView from './TraineeView';
import { connect } from 'react-redux'
import { getAllCohorts } from '../../actions/cohorts'
import { getAllPrograms } from '../../actions/programs'
import { getAllAttendaceRecords } from '../../actions/attendance';

const Attendance = (props) => {
  const {state, history } = props;
  useEffect(() => {
    if(state.cohorts.loading) {
      props.getAllCohorts();
      props.getAllPrograms();
      props.getAllAttendaceRecords();
    }
    props.getAllAttendaceRecords();
  }, [history]);

  const { role } = getUserInfo();
  if (role === 'Trainee' ) {
    return (
      <TraineeView {...props} />
    );
  }
  if (role === 'Manager') {
    return (
      <ManagerView {...props} />
    );
  }
}

const mapStateToProps = state => {
  return { state };
}
const mapDispatchToProps = {
getAllCohorts,
getAllPrograms,
getAllAttendaceRecords,
  
}
export default connect(mapStateToProps, mapDispatchToProps)(Attendance);