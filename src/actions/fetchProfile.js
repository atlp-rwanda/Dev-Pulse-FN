import db from '../config/dbCall';
import { FETCH_PROFILE, FETCH_PROFILE_ERROR } from './actionType';

export const fetchProfile = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pulseToken')}`,
            }
        }
        console.log("Tkennnnn", localStorage.getItem('pulseToken'))
        const response = await db.get('/users/my-profile', config)
        dispatch({
            type: FETCH_PROFILE,
            response: response.data,
        });

        //console.log("response from the db", response.data)
    } catch(error) {

        console.log("Error", error);
        dispatch({
            type: FETCH_PROFILE_ERROR,
            response: error.response.data.message,
        });
    } 
   };
