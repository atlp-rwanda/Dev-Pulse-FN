import { FETCHING_ATTENDANCE,FETCHING_ATTENDANCE_FAILED,FETCHING_ATTENDANCE_SUCCESS } from "../actions/actionType";


const attendance = (state = { loading: true }, { payload, type }) => {
    switch (type) {
      case FETCHING_ATTENDANCE:
        return { ...state, loading: true };
      case FETCHING_ATTENDANCE_SUCCESS:
        return { ...state, loading: false, records: payload };
      case FETCHING_ATTENDANCE_FAILED:
        return { ...state, loading: false,error:payload };
      default:
        return state;
  
    }
  
  }
  
  export default attendance;