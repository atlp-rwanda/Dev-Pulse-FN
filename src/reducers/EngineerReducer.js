import { FETCH_ENGINEER, FETCH_RATING } from '../actions/actionType';
//import { engineerConstants } from '../actions/actionType'

const initialState = {
  user: {},
  average: [],
  ratings: [],
};

const EngineerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ENGINEER:
      return { ...state, user: payload };
    case FETCH_RATING:
      return { ...state, average: payload.average, ratings: payload.ratings };

    //block code for flashing message
    /*case engineerConstants.SAVE_REQUEST:
      return { Saving: true };
    case engineerConstants.SAVE_SUCCESS:
      return {};
    case engineerConstants.SAVE_FAILURE:
      return {};

    // codes to remove engenners from the list
    case engineerConstants.REVOVE_REQUEST:
      // add 'removing:true' property to engineer being deleted
      return {
        ...state,
        items: state.items.map(engineer =>
          engineer.id === action.id
            ? { ...engineer, deleting: true }
            : engineer
        )
      };
    case engineerConstants.REMOVE_SUCCESS:
      // remove deleted engineers from state
      return {
        items: state.items.filter(engineer => engineer.id !== action.id)
      };
    case engineerConstants.REMOVE_FAILURE:

      return {
        ...state,
        items: state.items.map(engineer => {
          if (engineer.id === action.id) {
            const { deleting, ...engineerCopy } = engineer;
            return { ...engineerCopy, deleteError: action.error };
          }

          return engineer;
        })
      }*/

    default:
      return state;
  }
};

export default EngineerReducer;

