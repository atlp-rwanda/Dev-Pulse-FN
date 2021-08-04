import axios from "axios";
import getUsersApi from "../api/usersApi";
import {
	MY_ENGINEERS,
	REMOVE_ENGINEERS,
	REPLACE_ENGINEERS,
	SAVE_ENGINEERS,
	GET_USERS,
	ADD_ENGINEER,
	REDIRECT_USER,

} from "./actionType";

const editUsers = (users) =>
	users.map((eng) => ({
		id: eng.id,
		name: `${eng.firstName} ${eng.lastName}`,
		email: eng.email,
	}));

export const myEngineers = () => (dispatch) => {
	console.log("In  myEngineers ===>");
	const token = localStorage.getItem("pulseToken");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	axios
		.get(`${process.env.API_URL}/api/v1/users`, config)
		.then((res) => {
			const engineers = editUsers(res.data.data);
			dispatch({
				type: MY_ENGINEERS,
				payload: engineers,
			});
		})
		.catch((error) => {
			console.log("Error==>", error);
			if (error.status === 401) {
				dispatch({
					type: REDIRECT_USER,
					payload: { isLoggedOut: true },
				});
			}
		});
};

export const deleteEngineer = (user) => (dispatch) => {
	dispatch({
		type: REMOVE_ENGINEERS,
		payload: user,
	});
};

export const replaceEngineer = (user) => (dispatch) => {
	dispatch({
		type: REPLACE_ENGINEERS,
		payload: user,
	});
};

export const saveEngineers = (engineers) => (dispatch) => {
	const token = localStorage.getItem("pulseToken");
	console.log("Going to save Engineers", engineers);
	dispatch({
		type: SAVE_ENGINEERS,
		payload: engineers,
		flashMessage: 'Successfully saved',
	});

	const engineerIds = engineers.map((eng) => eng.id);
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};
	const body = { engineers: engineerIds };
	console.log("IDeeeeeessss,", body);
	axios
		.post(`${process.env.API_URL}/api/v1/group`, body, config)
		.then((res) => {
			console.log(res.data);
			//dispatch(alertMessageActions.success('Successfully saved!'))

		})
		.catch((error) => {
			//console.log("Errorrrrrrr=>");
			//console.log(error.response.status);
			if (error.response.status === 401) {
				dispatch({
					type: REDIRECT_USER,
					payload: { isLoggedOut: true },
				});
			}
			/*** show a failure message */
			dispatch(alertMessageActions.error(error.toString()));
		});
};

export const getUsers = () => (dispatch) => {
	const token = localStorage.getItem("pulseToken");
	let allUsers;
	getUsersApi(token)
		.then((data) => {
			console.log("all users ====>");
			allUsers = data.data.data.filter((user) => user.role === "Trainee");
			const allEngineers = editUsers(allUsers);
			dispatch({
				type: GET_USERS,
				payload: allEngineers,
			});
		})
		.catch((error) => {
			console.log(error.response);
		});
};

export const addEngineer = (engineer) => (dispatch) => {
	dispatch({
		type: ADD_ENGINEER,
		payload: engineer,
	});
};

