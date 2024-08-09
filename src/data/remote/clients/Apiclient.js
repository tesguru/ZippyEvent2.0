import axios from "axios";
import { HEADER } from "../../../Utils/constants";
import { HEADER2 } from "../../../Utils/constants";
import { HEADER3 } from "../../../Utils/constants";
export const apiClient = axios.create({
    baseURL: 'https://eventapi.zippyworld.app/zippy_event',
    headers: HEADER,
  });

export const axiosInstance = axios.create({
    baseURL: 'https://eventapi.zippyworld.app/',
    timeout: 60000,
    headers: HEADER,
});
export const axiosInstance2 = axios.create({
  baseURL: 'https://eventapi.zippyworld.app/',
  timeout: 60000,
  headers: HEADER3,
});

export const apiLive = axios.create({
  baseURL: 'https://zippyworld.net/zippy_world_live_api/v1/api/',
  headers: HEADER2,
});

export const apiTest = axios.create({
  baseURL: 'http://161.35.56.41/zippy_world_live_api/v1/api/',
  headers: HEADER2,
});