import { FETCHING_SESSIONS_SUCCESS } from "../actions/actionType";


const sessions = (state = { loading: true, sessions: [] }, { payload, type }) => {

  switch (type) {
    case FETCHING_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: payload
      }
      default:
        return state
  }

}

export default sessions;