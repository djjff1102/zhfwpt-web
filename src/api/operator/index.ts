import request from "@/utils/request";
import { OperatorPageVO, OperatorQuery } from "./types";

/**
 * 获取角色分页数据
 *
 * @param queryParams
 */
export function getOperatorPage(
  queryParams?: OperatorQuery
): Promise<CustomAxiosResponse<OperatorPageVO[]>> {
  return request({
    url: "/org/log/select",
    method: "get",
    params: queryParams,
  });
}
