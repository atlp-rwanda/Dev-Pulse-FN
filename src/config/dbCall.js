/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.API_URL}/api/v1`,
});
