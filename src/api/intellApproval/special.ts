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

/**
 * 已选的订单、合同、发票、银行流水的总金额
 */
export function getTotalMoney(data: any) {
  return request({
    url: "base/fpsp_report/getTotalMoney",
    method: "post",
    data,
  });
}
/**
 * 上传的附件进行保存和更新
 */
export function fileSave(data: any) {
  return request({
    url: "base/fpsp_other_materials/saveAndUpdateMaterials",
    method: "post",
    data,
  });
}