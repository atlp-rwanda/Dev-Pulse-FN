import { FETCHING_COHORTS, FETCHING_COHORTS_FAILED, FETCHING_COHORTS_SUCCESS } from "../actions/actionType";

const pendingRatings = (state = {}, { payload, type }) => {
  switch (type) {
    case 'FETCHED_PENDING_RATINGS':
      return {loading: false, data: payload};
    case 'UPDATED_ENGINEER_RATING':
      return {...state,data:[...state.data|| null,payload.data]}
    case 'APPROVED_RATING':
      return {...state,data:[...state.data.filter(rate=>rate.id!=payload)]}
    case 'REJECTED_RATING':
      return {...state,data:[...state.data.filter(rate=>rate.id!=payload)]}
    default:
      return state;
  }
  
}

export default pendingRatings;