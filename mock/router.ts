import { MockMethod } from "vite-plugin-mock";
const url = "/dev-api/api/v1/menus/routes";
const method = "get";
const data = {
  code: "00000",
  data: [],
  msg: "一切ok？",
};

export default [
  {
    url: url,
    method: method,
    response: () => {
      return data;
    },
  },
] as MockMethod[];
