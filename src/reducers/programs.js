import { FETCHING_PROGRAMS, FETCHING_PROGRAMS_FAILED, FETCHING_PROGRAMS_SUCCESS } from "../actions/actionType";

const programs = (state = { loading: true }, { payload, type }) => {
  switch (type) {
    case FETCHING_PROGRAMS:
      return { ...state, loading: true };
    case FETCHING_PROGRAMS_SUCCESS:
      return { ...state, loading: false,programs: payload };
    case FETCHING_PROGRAMS_FAILED:
      return { ...state, loading: false,error:payload };
    default:
      return state;

  }

}

export default programs;