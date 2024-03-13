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
