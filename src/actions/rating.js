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

export const approveRating=(id,refferencedRateId)=>async(dispatch)=>{
    try {
        await dbCall.post(`/ratings/approve/${id}/${refferencedRateId}`);
        dispatch({type:'APPROVED_RATING',payload:id});
        toast.success("Rating Approved successfully !");
    } catch (error) {
        const errormessage = error.response.data || error;
        toast.error(errormessage.message);
    }
}

export const rejectRating=(id)=>async(dispatch)=>{
    try {
        await dbCall.post(`/ratings/reject/${id}`);
        dispatch({type:'REJECTED_RATING',payload:id});
        toast.success("Rating Rejected successfully !");
    } catch (error) {
        const errormessage = error.response.data || error;
        toast.error(errormessage.message);
    }
}

export default rateAllTrainees;