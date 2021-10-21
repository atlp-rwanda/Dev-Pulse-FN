import dbCall from "../config/dbCall";
import { toast } from 'react-toastify';
import { FAILED_RATING_ALL } from "./actionType";



const rateAllTrainees=(data,sprint)=>async(dispatch)=>{
    try {
        await dbCall.post(`/ratings/rate/all?sprintId=${sprint}`,data);
        toast.success("Ratings Recorded successfully !");
        return 1;
    } catch (error) {
        dispatch({type:FAILED_RATING_ALL,payload:error});
        const errormessage = error.response.data || 'rating failed';
        toast.error(errormessage.message);
        return 0;
    }
}



export default rateAllTrainees;