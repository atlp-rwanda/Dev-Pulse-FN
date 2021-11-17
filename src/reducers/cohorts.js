import { FETCHING_COHORTS, FETCHING_COHORTS_FAILED, FETCHING_COHORTS_SUCCESS } from "../actions/actionType";

const cohorts = (state = { loading: true }, { payload, type }) => {
  switch (type) {
    case FETCHING_COHORTS:
      return { ...state, loading: true };
    case FETCHING_COHORTS_SUCCESS:
      return { ...state, loading: false, cohorts: payload };
    case FETCHING_COHORTS_FAILED:
      return { ...state, loading: false,error:payload };
    default:
      return state;

  }

}

export default cohorts;