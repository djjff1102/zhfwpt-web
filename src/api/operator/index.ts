import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { OperatorPageVO, OperatorQuery } from "./types";

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getOperatorPage(
  queryParams?: OperatorQuery
): AxiosPromise<OperatorPageVO[]> {
  return request({
    url: "/org/log/select",
    method: "get",
    params: queryParams,
  });
}
