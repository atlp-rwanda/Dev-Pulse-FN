import React,{useEffect} from 'react'
import { getUserInfo } from '../../helpers/token';


const AttendanceForm = ({history}) => {
  useEffect(()=>{
    const { role } = getUserInfo();
    if(role!=='Manager'){
        history.push('/attendance');
    }
  })

  return (
    <div>
      attendance form
    </div>
  )
}

export default AttendanceForm
