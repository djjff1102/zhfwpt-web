import request from "@/utils/request";
import { SearchInvoice, InvoiceDataResult, DetailResult } from "./type";
import { useUserStoreHook } from "@/store/modules/user";

const userStore = useUserStoreHook();
let userId = userStore.user.id;

/**
 * 发票智能审批-列表
 */
export function fpspReport(
  data: SearchInvoice
): CustomAxiosPromise<InvoiceDataResult> {
  return request({
    url: "/base/fpsp_report",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-详情
 */
export function searcht(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_report/search",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-新增
 */
export function add(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_report/add",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-更新
 */
export function update(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_report/update",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-导出
 */
export function approvalExport(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    responseType: "blob",
    url: "/base/fpsp_report/export",
    method: "post",
    data,
  });
}
/**
 * 发票智能审批-获取当前企业基本信息
 */
export function getOneByCompanyName(
  data: SearchInvoice
): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/company_base/getOneByCompanyName",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-审批列表
 */
export function fpspApproveDetail(
  data: SearchInvoice
): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_approve_detail",
    method: "post",
    data,
  });
}

/**
 * 发票智能审批-审批
 */
export function approveSave(
  data: SearchInvoice
): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_approve_detail/save",
    method: "post",
    data,
  });
}

/**
 * 发票申报历史
 */
export function reporthistroy(data: SearchInvoice): CustomAxiosPromise<DetailResult> {
  return request({
    url: "/base/fpsp_report/histroy",
    method: "post",
    data,
  });
}

/**
 * 发票-删除
 */
export function delReport(params: any): CustomAxiosPromise<DetailResult> {
  return request({
    url: `/base/fpsp_report/delete/${params.id}`,
    method: "get",
    params,
  });
}

/**
 * 近期申报
 */
export function queryFpspReport(params: any): CustomAxiosPromise<DetailResult> {
  return request({
    url: `/base/fpsp_report/queryFpspReport/${params.id}`,
    method: "get",
    params,
  });
}

/**
 * 发票智能审批-校验表单
 *
 * @param file
 */
export function importData(data: any){
  return request({
    url: "base/fpsp_report/importData",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

/**
 * 发票智能审批-删除上传文件
 
 */
export function deleteDataAfterDeleteExcel(params: any) {
  return request({
    url: `base/fpsp_report/deleteDataAfterDeleteExcel/${params.reportId}`,
    method: "get",
    params,
  });
}

