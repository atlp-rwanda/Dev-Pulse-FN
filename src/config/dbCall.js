/* eslint-disable import/prefer-default-export */
import axios from "axios";

const dbCall = axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
});

/**
 * Redirect user to the login page when token expires
 * @author Patrick TUNEZERWANE
 * @since 29.07.2021
 */

dbCall.interceptors.response.use(
  (response) =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  (error) => {
    /**
     * Handle when the error is not coming from server, EX: User's internect con issue
     */
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    /**
     * Check for 401 error and redirect user to login
     */
    if (error.response.status == 401) {
      localStorage.removeItem("pulseToken");
      window.location = "/";
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  }
);
export default dbCall;
