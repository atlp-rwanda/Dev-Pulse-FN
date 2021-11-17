import dbCall from "../config/dbCall";
import { FETCHING_PROGRAMS_FAILED,FETCHING_PROGRAMS_SUCCESS,FETCHING_PROGRAMS } from "./actionType";

export const getAllPrograms = ()=>(dispatch)=>{
  dispatch({type:FETCHING_PROGRAMS,payload:null});
  dbCall.get('/programs').then((response)=>{
    const {data} = response;
    dispatch({type:FETCHING_PROGRAMS_SUCCESS,payload:data.data});
  }).catch(error=>{
    const respErr = (error.response?error.response:error);
    dispatch({type:FETCHING_PROGRAMS_FAILED,payload:respErr});
  });
}

