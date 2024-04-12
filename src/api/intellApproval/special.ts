import request from "@/utils/request";

/**
 * 发票智能审批-订单
 */
export function forReportDD(data: any) {
  return request({
    url: "base/qyzx_order/forReport",
    method: "post",
    data,
  });
}
