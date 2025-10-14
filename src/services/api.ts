import axios from "axios";

const baseUrl = "https://everest-interview-public-files.s3.amazonaws.com";

const ONE_SECOND_IN_MS = 1000;

const api = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  timeout: ONE_SECOND_IN_MS,
});

export default api;
