import dbCall from "../config/dbCall";
import { toast } from 'react-toastify';
import { FAILED_RATING_ALL } from "./actionType";



const rateAllTrainees=(data)=>async(dispatch)=>{
    try {
        await dbCall.post('/ratings/rate/all',data);
        toast.success("Ratings Recorded successfully !");
        return 1;
    } catch (error) {
        toast.error("Error in rating trainees!");
        dispatch({type:FAILED_RATING_ALL,payload:error});
        return 0;
    }
}



export default rateAllTrainees; 