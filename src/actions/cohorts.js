import dbCall from "../config/dbCall";
import { FETCHING_COHORTS_FAILED,FETCHING_COHORTS_SUCCESS,FETCHING_COHORTS } from "./actionType";

export const getAllCohorts = ()=>(dispatch)=>{
  dispatch({type:FETCHING_COHORTS,payload:null});
  dbCall.get('/cohorts').then((response)=>{
    const {data} = response;
    dispatch({type:FETCHING_COHORTS_SUCCESS,payload:data.data});
  }).catch(error=>{
    const respErr = (error.response?error.response:error);
    dispatch({type:FETCHING_COHORTS_FAILED,payload:respErr});
  });
}

