import { SEARCH_TEXT } from './actionType';

export const searchByName = (byName) => (dispatch) => dispatch({
  type: SEARCH_TEXT,
  byName,
});
