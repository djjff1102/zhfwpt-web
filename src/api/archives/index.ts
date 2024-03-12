import request from "@/utils/request";
import {
  SearchData,
  CompanyDataResult,
  AttentionData,
  AttentionResult,
  UserInfo,
  TotalAtentionResult,
  ProvinceSearch,
  ProvinceResult,
  WarehouseSearch,
  WarehouseResult,
  GoodSearch,
  SelectSearch,
  SelectResult,
} from "./type";
import { useUserStoreHook } from "@/store/modules/user";

const userStore = useUserStoreHook();
let userId = userStore.user.id;

/**
 * 企业资信档案库-企业搜索
 */
export function companyList(
  data: SearchData
): CustomAxiosPromise<CompanyDataResult> {
  return request({
    url: "/base/company_base",
    method: "post",
    data,
  });
}

/**
 * 关注取消关注公司
 */
export function payAttention(
  data: AttentionData
): CustomAxiosPromise<AttentionResult> {
  return request({
    url: "/base/qyzx_attention_company_map/attentionOperate",
    method: "post",
    data,
  });
}

/**
 * 获取关注企业的数据统计：关注总数、高风险总数、一般风险总数
 */
export function attentionTotal(
  data: UserInfo
): CustomAxiosPromise<TotalAtentionResult> {
  return request({
    url: "/base/qyzx_attention_company_map/attentionTotal",
    method: "post",
    data,
  });
}

/**
 * 获取省份地区分组统计
 */
export function groupByProvince(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/company_base/groupByProvince",
    method: "post",
    data,
  });
}

/**
 * 主订单列表及详情
 */
export function qyzxOrder(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_order",
    method: "post",
    data,
  });
}

/**
 * 子订单查询
 */
export function qyzxOrderSub(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_order_sub",
    method: "post",
    data,
  });
}

/**
 * 发票信息查询
 */
export function qyzxInvoice(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_invoice",
    method: "post",
    data,
  });
}

/**
 * 物流仓储信息查询
 */
export function qyzxWarehouse(
  data: WarehouseSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_warehouse",
    method: "post",
    data,
  });
}

/**
 * 主营商品查询
 */
export function qyzxGood(data: GoodSearch): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_good",
    method: "post",
    data,
  });
}

/**
 * 交易凭证查询
 */
export function qyzxTransactionCertificate(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_transaction_certificate",
    method: "post",
    data,
  });
}

/**
 * 银行流水查询
 */
export function qyzxBankStatement(
  data: ProvinceSearch
): CustomAxiosPromise<WarehouseResult> {
  return request({
    url: "/base/qyzx_bank_statement",
    method: "post",
    data,
  });
}

/**
 * 主营商品-下拉框
 */
export function goodDropDownBox(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/qyzx_good/dropDownBox",
    method: "post",
    data,
  });
}

/**
 * 物流仓储信息-下拉框
 */
export function warehouseDropDownBox(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/qyzx_warehouse/dropDownBox",
    method: "post",
    data,
  });
}

/**
 * 主订单查询-下拉框
 */
export function orderDropDownBox(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/qyzx_order/dropDownBox",
    method: "post",
    data,
  });
}

/**
 * 子订单查询-下拉框
 */
export function suborderDropDownBox(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/qyzx_order_sub/dropDownBox",
    method: "post",
    data,
  });
}

/**
 * 我关注的企业列表查询
 */
export function attentionCompanyQuery(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/company_base/attentionCompanyQuery",
    method: "post",
    data: {
      userId: userId,
      ...data,
    },
  });
}

/**
 * 我关注的企业导出
 */
export function attentionCompanyExport(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/company_base/attentionCompanyExport",
    method: "post",
    data: {
      userId: userId,
      ...data,
    },
  });
}