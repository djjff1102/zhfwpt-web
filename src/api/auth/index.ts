import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginData } from "./types";

/**
 * 登录API
 *
 * @param data {LoginData}
 * @returns
 */
export function loginApi(data: LoginData): AxiosPromise<string> {
  return request({
    url: "/auth/login",
    method: "get",
    params: data,
  });
}
