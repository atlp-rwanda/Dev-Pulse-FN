import dbCall from "../config/dbCall";
import {
    CREATING_SESSIONS,
    CREATING_SESSIONS_SUCCESS,
    CREATING_SESSIONS_FAILED,
    FETCHING_SESSIONS,
    FETCHING_SESSIONS_SUCCESS,
    FETCHING_SESSIONS_FAILED,
    DELETING_SESSIONS,
    DELETING_SESSIONS_SUCCESS,
    DELETING_SESSIONS_FAILED
} from "./actionType";

export const getAllSessions = () => (dispatch) => {
    dispatch({ type: FETCHING_SESSIONS, payload: null });
    dbCall.get('/sessions').then((response) => {
        const { data } = response;
        dispatch({ type: FETCHING_SESSIONS_SUCCESS, payload: data.data });
    }).catch(error => {
        const respErr = (error.response ? error.response : error);
        console.log(error);
        dispatch({ type: FETCHING_SESSIONS_FAILED, payload: respErr });
    });
}



export const createSessions = (data) => (dispatch) => {
    dispatch({ type: CREATING_SESSIONS, payload: null });
    dbCall.post('/sessions', data).then((response) => {
        const { data } = response;
        dispatch({ type: CREATING_SESSIONS_SUCCESS, payload: data.data });
    }).catch(error => {
        const respErr = (error.response ? error.response : error);
        dispatch({ type: CREATING_SESSIONS_FAILED, payload: respErr });
    });
}


export const removeSessions = (data) => (dispatch) => {
    console.
    dispatch({ type: DELETING_SESSIONS, payload: null });
    dbCall.post('/sessions', data).then((response) => {
        const { data } = response;
        dispatch({ type: DELETING_SESSIONS_SUCCESS, payload: data.data });
    }).catch(error => {
        const respErr = (error.response ? error.response : error);
        dispatch({ type: DELETING_SESSIONS_FAILED, payload: respErr });
    });

}