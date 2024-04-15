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


/**
 * 合同
 */
export function qyzxTransactionCertificate( data: any){
  return request({
    url: "/base/qyzx_transaction_certificate/forReport",
    method: "post",
    data,
  });
}

/**
 * 发票
 */
export function qyzxInvoic(data: any) {
  return request({
    url: "/base/qyzx_invoice/forReport",
    method: "post",
    data,
  });
}

/**
 * 银行流水查询
 */
export function qyzxBankStatement(data: any) {
  return request({
    url: "/base/qyzx_bank_statement/forReport",
    method: "post",
    data,
  });
}

/**
 * 算法校验
 */
export function judgeMaterial(data: any) {
  return request({
    url: "base/fpsp_report/judgeMaterial",
    method: "post",
    data,
  });
}