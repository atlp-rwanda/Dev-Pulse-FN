import {
  CHANGE_PROGRAM,
  FETCH_ENGINEER,
  FETCH_RATING,
  SELECTED_COHORT,
  SELECTED_PROGRAM,
} from '../actions/actionType';

const initialState = {
  user: { programInfo: '' },
  average: [],
  ratings: [],
  selectedCohort: 0,
  selectedProgram: 0,
  cohorts: [],
  programs: [],
};

const EngineerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ENGINEER:
      return {
        ...state,
        user: payload,
      };
    case CHANGE_PROGRAM:
      return {
        ...state,
        programs: payload,
      };
    case SELECTED_PROGRAM:
      return { ...state, selectedProgram: payload };
    case SELECTED_COHORT:
      return { ...state, selectedCohort: payload };
    case FETCH_RATING:
      return {
        ...state,
        average: payload.average,
        ratings: payload.ratings,
      };
    default:
      return state;
  }
};

export default EngineerReducer;
