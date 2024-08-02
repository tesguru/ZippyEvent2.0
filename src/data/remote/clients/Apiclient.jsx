import Axios from "axios";
import { HEADER } from "../../../Utils/constants";
import { HEADER2 } from "../../../Utils/constants";

export const apiClient = Axios.create({
    baseURL: 'https://eventapi.zippyworld.app/zippy_event/',
    headers: HEADER,
  });

export const apiTest = Axios.create({
  baseURL: 'https://zippyworld.net/zippy_world_live_api/v1/api/',
  headers: HEADER2,
});