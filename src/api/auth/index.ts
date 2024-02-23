import request from "@/utils/request";
import { LoginData } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): CustomAxiosPromise<string> {
  return request({
    url: "/auth/login",
    method: "get",
    params: data,
  });
}
