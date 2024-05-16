import request from "@/utils/request";

/**
 * 重点风险企业 - 风险值
 */
export function attentionCreditInfo(data: any) {
  return request({
    url: "/base/fxjk_index_fxzph/attentionCreditInfo",
    method: "post",
    data,
  });
}

/**
 * 重点风险企业 - 企业信用值排行
 */
export function attentionCreditCompanyList(data: any) {
  return request({
    url: "/base/fxjk_index_fxzph/attentionCreditCompanyList",
    method: "post",
    data,
  });
}

/**
 * 风险企业列表
 */
export function fxjkIndexFxzph(data: any) {
  return request({
    url: "/base/fxjk_index_fxzph",
    method: "post",
    data,
  });
}

/**
 * 风显列表-导出 TODO:
 */
export function riskExport(data: any) {
  return request({
    responseType: "blob",
    url: "/base/fpsp_report/export",
    method: "post",
    data,
  });
}

/**
 * 整体概况首页介入
 */
export function groupByRisk(params: any) {
  return request({
    url: "/base/fxjk_index_fxzph/groupByRisk",
    method: "get",
    params,
  });
}

/**
 * 整体概况企业风险指标分页查询
 */
export function riskIndicator(data: any) {
  return request({
    url: "/base/fxjk_index_fxzph/riskIndicator",
    method: "post",
    data,
  });
}

/**
 * 整体概况发票审批情况按月份查询
 */
export function invoiceCheckByDate(data: any) {
  return request({
    url: "/base//fxjk_index_fxzph/invoiceCheckByDate",
    method: "post",
    data,
  });
}
