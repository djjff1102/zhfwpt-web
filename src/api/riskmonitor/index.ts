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
 * 风显列表-导出
 */
export function riskExport(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    responseType: "blob",
    url: "/base/fpsp_report/export",
    method: "post",
    data,
  });
}
