import axios from "axios";

const apiId = process.env.REACT_APP_APIId;
const baseURL = process.env.REACT_APP_BASE_URL;
const corsURL = process.env.REACT_APP_CORS_URL;
const apiPassword = process.env.REACT_APP_APIpassword;

const combined = btoa(apiId + ":" + apiPassword);

const client = axios.create({
  baseURL: corsURL + baseURL,
  timeout: 5000,
  headers: {
    Authorization: `Basic ${combined}`,
    "Content-Type": "application/json"
  }
});

export default client;
