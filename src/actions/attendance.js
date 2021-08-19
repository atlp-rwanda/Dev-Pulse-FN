import dbCall from "../config/dbCall";
import { FETCHING_ATTENDANCE,FETCHING_ATTENDANCE_SUCCESS,FETCHING_ATTENDANCE_FAILED } from "./actionType";

export const getAllAttendaceRecords = ()=>(dispatch)=>{
  dispatch({type:FETCHING_ATTENDANCE,payload:null});
  dbCall.get('/attendance').then((response)=>{
    const {data} = response;
    dispatch({type:FETCHING_ATTENDANCE_SUCCESS,payload:data.data});
  }).catch(error=>{
    console.log(error,"$$$$$$$$$$$$$$$$$$$$$$$44444444");
    const respErr = (error.response?error.response:error);
    dispatch({type:FETCHING_ATTENDANCE_FAILED,payload:respErr});
  });
}

export const SaveAttendance = (data)=>(dispatch)=>{
 return dbCall.post('/attendance',data).then((response)=>{
    const {data} = response;
    return {success:true,data};
  }).catch(error=>{
    const respErr = (error.response?error.response:error);
    return {success:false,error:respErr};
  });
}