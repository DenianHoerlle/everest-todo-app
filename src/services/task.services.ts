import { ApiRequest } from "types";

import api from "./api";

// TODO add error handling
const getTaskList = async () => {
  const response = await api.get<ApiRequest>("/input.json");

  return response;
};

export { getTaskList };
