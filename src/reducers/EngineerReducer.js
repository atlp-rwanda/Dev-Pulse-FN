import {
  CHANGE_PROGRAM,
  FETCH_ENGINEER,
  FETCH_RATING,
  SELECTED_COHORT,
  SELECTED_PROGRAM,
  GET_COHORTS,
  UPDATE_ENGINEER_COHORT,
  AVERAGE_RATING,
  ADD_COHORT,
  ADD_PROGRAM,
  REMOVE_PROGRAM,
  REMOVE_COHORT,
  UPDATE_COHORT,
  UPDATE_PROGRAM,
  FTECH_ALL_USER_SUCCESS,
  EXPORT_TRAINEE_RATINGS_SUCCESS
} from '../actions/actionType';

const initialState = {
  user: { programInfo: '' },
  average: [],
  ratings: [],
  selectedCohort: 0,
  averageRating: '0.9',
  selectedProgram: 0,
  cohorts: [],
  programs: [],
  changeProgramName: '',
  trainees: [],
  ratingsToExport: []
};

const EngineerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ENGINEER:
      return {
        ...state,
        user: payload
      };
    case UPDATE_ENGINEER_COHORT:
      return {
        ...state,
        user: { ...state.user, ...payload }
      };
    case GET_COHORTS:
      return {
        ...state,
        cohorts: payload
      };
    case CHANGE_PROGRAM:
      return { ...state, programs: payload };
    case SELECTED_PROGRAM:
      return { ...state, selectedProgram: payload };
    case SELECTED_COHORT:
      return { ...state, selectedCohort: payload };
    case FETCH_RATING:
      return { ...state, ...payload };
    case AVERAGE_RATING:
      return { ...state, averageRating: payload };
    case ADD_COHORT:
      return {
        ...state,
        cohorts: [...state.cohorts, payload],
      };
    case ADD_PROGRAM:
      return {
        ...state,
        programs: [...state.programs, payload],
      };
    case REMOVE_PROGRAM:
      return {
        ...state,
        programs: state.programs.filter(
          (p) => p.id !== payload.id
        ),
      };
    case REMOVE_COHORT:
      return {
        ...state,
        cohorts: state.cohorts.filter(
          (c) => c.id !== payload.id
        ),
      };
    case UPDATE_COHORT:
      return {
        ...state,
        cohorts: state.cohorts.map((c) =>
          c.id === payload.id ? payload : c
        ),
      };
    case UPDATE_PROGRAM:
      return {
        ...state,
        programs: state.programs.map((p) => (p.id === payload.id ? payload : p))
      };
    case FTECH_ALL_USER_SUCCESS:
      return {
        ...state,
        trainees: [...payload]
      };
    case EXPORT_TRAINEE_RATINGS_SUCCESS:
      return {
        ...state,
        ratingsToExport: [...payload]
      };
    default:
      return state;
  }
};

export default EngineerReducer;
