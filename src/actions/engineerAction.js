import { RATE_ENGINEER_SUCCESS } from "./actionType";
import { apiCallError } from "../redux/actions/apiStatusAction";
import * as ratingApi from "../api/rateApi";
import { toast } from "react-toastify";

// actions creator => this is what is dispatched
export const rateEngineerSuccess = (savedRatings) => {
	return { type: RATE_ENGINEER_SUCCESS, savedRatings };
};

//make a thunk to dispatch the RATE_ENGINEER action after hitting the rating API
export const rateEngineer = (ratings) => {
	console.log("Ratings to save from Actions", ratings);
	return ratingApi
		.rateEngineer(ratings)
		.then((savedRatings) => {
			toast.success("Done Saving");
			// console.log("Done Saving", savedRatings);
			return dispatch(rateEngineerSuccess(savedRatings));
		})
		.catch((error) => toast.error(error));
};
