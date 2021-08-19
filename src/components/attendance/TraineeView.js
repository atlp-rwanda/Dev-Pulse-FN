import React, { useState } from 'react'
import '../../styles/attendance.scss'
import TraineeAverage from './TraineeAverage';
import Detailed from './Detailed'

const TraineeView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const TabList = [
    { id: 0, label: 'Average' },
    { id: 1, label: 'Detailed' }
  ];
  return (
    <div className='attendance-wrapper'>
      <div className='view-toggler'>
        {TabList.map(({ id, label }) => (
          <div onClick={() => setActiveTab(id)} key={id} className={activeTab === id ? 'item active' : 'item'}>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className='data'>
        {activeTab == 0 ? (<TraineeAverage />) : (<Detailed />)}
      </div>
    </div>
  )
}

export default TraineeView
