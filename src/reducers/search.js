import { SEARCH_TEXT } from '../actions/actionType';

const initialState = {
  byName: '',
};
const searchReducer = (state = initialState, action) => {
  console.log('invoked to change the state', action);

  switch (action.type) {
    case SEARCH_TEXT: {
      return { ...state, byName: action.byName };
    }
    default:
      return state;
  }
};
export default searchReducer;
