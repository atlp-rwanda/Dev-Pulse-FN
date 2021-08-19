import React from 'react'
import { getUserInfo } from '../../helpers/token';
import ManagerView from './ManagerView';
import TraineeView from './TraineeView';

getUserInfo
const Attendance = (props) => {
  const { role } = getUserInfo();
  if (role === 'Trainee') {
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

export default Attendance;
