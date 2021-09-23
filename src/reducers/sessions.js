import { FETCHING_SESSIONS_SUCCESS,CREATING_SESSIONS_SUCCESS,DELETING_SESSIONS_SUCCESS} from "../actions/actionType";


const sessions = (state = { loading: true, sessions: [] }, { payload, type }) => {

  switch (type) {
    case FETCHING_SESSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        sessions: payload
      }
      case CREATING_SESSIONS_SUCCESS:
        return{
          ...state,
          sessions:[...state.sessions,...payload]
        }
        case DELETING_SESSIONS_SUCCESS:
          const currentSessions = state.sessions;
          const toRemoveSessions = payload;
          const remainingSessions = currentSessions.filter((currentSession) => toRemoveSessions.filter((toRem) => toRem === currentSession.id).length === 0);
          console.log(remainingSessions,"ssssssssssssss")
          
          return {
            ...state,
            sessions: remainingSessions,
          };
      default:
        return state
  }

}

export default sessions;