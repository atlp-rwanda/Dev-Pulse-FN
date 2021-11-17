import React, { useState, useEffect } from 'react'
import '../../styles/attendance.scss'
import TraineeAverage from './TraineeAverage';
import Detailed from './Detailed'
import { connect } from 'react-redux'
import { myEngineers } from '../../actions/engineerList';
import { getAllAttendaceRecords } from '../../actions/attendance';




const TraineeView = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [profile, setProfile] = useState(null);
  const [trainee, setTrainee] = useState(null);
  const [id, setId] = useState(null);
  const myTrainees = props.state.engineersReducer.engineers;

  useEffect(() => {
    if (props.state.profile.success && props.state.profile.success.data) {
      setProfile(props.state.profile.success.data)
      const {role} = props.state.profile.success.data;
      if (role === 'Trainee') {
        setTrainee(props.state.profile.success.data);
        const tempId = props.state.profile.success.data.id;
        setId(tempId);
      }
      if (role === 'Manager') {

        const info = myTrainees.find(t=>t.id==parseInt(id));
        const x = myTrainees.filter(t=>t.id==7);
        const tempId = props.match.params.id;
        console.log('Manager',x);
        console.log('tempId',props.match)
        setId(tempId);
        setTrainee(info);
      }
    }

  }, [props.state.profile]);

  useEffect(() => {
    try {
      props.myEngineers();
      props.getAllAttendaceRecords();
    } catch (error) {
    }
   
  },[props.history]);

  const TabList = [
    { id: 0, label: 'Average' },
    { id: 1, label: 'Detailed' }
  ];
  return (
    <div className='attendance-wrapper'>
      <div className='heading'>
      <div className='view-toggler'>
        {TabList.map(({ id, label }) => (
          <div onClick={() => setActiveTab(id)} key={id} className={activeTab === id ? 'item active pointer' : 'item pointer'}>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className='view-toggler'>
        {trainee && <p>{trainee.firstName} {trainee.lastName}</p>}

        {trainee && trainee.name && <p>{trainee.name}</p>}
      </div>
      </div>
      
      {profile && <div className='data'>
        {activeTab == 0 ? (<TraineeAverage profile={profile} id={id} {...props} />) : (<Detailed profile={profile} id={id} {...props} />)}
      </div>}

    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    state: state
  }
}
const mapDispatchToProps = {
  myEngineers,
  getAllAttendaceRecords
}
export default connect(mapStateToProps,mapDispatchToProps)(TraineeView);
