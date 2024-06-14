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
  ExportSearch,
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
    url: "/base/qyzx_warehouse_out",
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
    url: "/base/qyzx_warehouse_out/dropDownBox",
    method: "post",
    data,
  });
}

/**
 * 物流
 */
export function transportationWL(
  data: SelectSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    url: "/base/qyzx_transportation",
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
  data: ExportSearch
): CustomAxiosPromise<SelectResult> {
  return request({
    responseType: "blob",
    url: "/base/company_base/attentionCompanyExport",
    method: "post",
    data,
  });
}
/**
 * 关联发票列表
 */
export function qyzxInvoic(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_invoice",
    method: "post",
    data: {
      userId: userId,
      ...data,
    },
  });
}

/**
 *  企业用票需求预测 - 销项、进项
 */
export function groupByInvoiceDate(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_invoice/groupByInvoiceDate",
    method: "post",
    data,
  });
}

/**
 *  评估建议和风险项
 */
export function suggestion(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/fxjk_index_fxzph/suggestion",
    method: "post",
    data,
  });
}

/**
 *  公司维度查询风险信息
 */
export function queryRiskInfoByCompanyInfo(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/fxjk_index_data/queryRiskInfoByCompanyInfo",
    method: "post",
    data,
  });
}

/**
 *  行政许可
 */
export function companyLicenseInfoCreditchinaNew(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/company_license_info_creditchina_new",
    method: "post",
    data,
  });
}

/**
 *  一般纳税人
 */
export function tbGeneralTaxpayer(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/tb_general_taxpayer",
    method: "post",
    data,
  });
}

/**
 *  进出口信用
 */
export function companybusinessimportexportcredit(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/company_business_import_export_credit",
    method: "post",
    data,
  });
}
/**
 * 许可机关下拉
 */
export function BDaeegmnopprrttuy(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/company_license_info_creditchina_new/groupByDepartment",
    method: "post",
    data,
  });
}

// 公司基本信息
export function getCompany(params: any): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: `/base/company_base/${params.id}`,
    method: "get",
    params,
  });
}

/**
 * 商品查询
 */
export function goods(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/qyzx_invoice_good",
    method: "post",
    data,
  });
}

// 风险下钻
export function fxjkFieldMapping(
  data: ProvinceSearch
): CustomAxiosPromise<ProvinceResult> {
  return request({
    url: "/base/fxjk_field_mapping",
    method: "post",
    data,
  });
}

// 关联仓储
export function qyzxWarehouseGood(data: any) {
  return request({
    // url: "base/qyzx_warehouse_good",
    url: "base/qyzx_warehouse_out_good",
    method: "post",
    data,
  });
}

// 物流仓储
export function getwarehouseList(data: any) {
  return request({
    url: "/base/qyzx_warehouse_out_good/get_warehouse",
    method: "post",
    data,
  });
}

// 物流仓储-关联订单-下拉框
export function getAssociationDropDownBox(data: any) {
  return request({
    url: "/base/qyzx_order/getAssociationDropDownBox",
    method: "post",
    data,
  });
}

// 风险分类展示
export function queryRiskInfoCountByCompanyInfo(data: any) {
  return request({
    url: "/base/fxjk_index_data/queryRiskInfoCountByCompanyInfo",
    method: "post",
    data,
  });
}

// 企业图谱
export function getenterpriseMapQuery(params: any) {
  return request({
    url: `base/company_base/enterpriseMapQuery/${params.companyId}`,
    method: "get",
    params,
  });
}

export function getenterpriseMapQueryTree(params: any) {
  return request({
    url: `base/company_base/enterpriseMapTreeQuery/${params.companyId}`,
    method: "get",
    params,
  });
}

// 股权
export function stockQuery(params: any) {
  return request({
    url: `base/company_base/stockQuery/${params.companyId}`,
    method: "get",
    params,
  });
}

// 物流关联订单
export function getwarehouseAsscoiationOrderList(data: any) {
  return request({
    url: `base/qyzx_order/warehouseAsscoiationOrderList`,
    method: "post",
    data,
  });
}

// 合同关联产品
export function getqyzxcertificategood(data: any) {
  return request({
    url: `base/qyzx_certificate_good`,
    method: "post",
    data,
  });
}

// 通用接口（变更信息、经营风险、法律诉讼）
export function changeInfo(data: any) {
  return request({
    url: ``,
    method: "post",
    data,
  });
}

// 获取ta标签
export function companyItemSetting(params: any) {
  return request({
    url: `base/company_base/companyItemSetting/${params.company_id}`,
    method: "get",
    params,
  });
}

// 命中tab标签下的数据
export function companyItemData(data: any) {
  return request({
    url: `base/company_base/companyItemData`,
    method: "post",
    data,
  });
}

// 关联仓储-仓储详情-提取一条过户单或者出库单数据
export function qyzxwarehouseoutgood(params: any) {
  return request({
    url: `base/qyzx_warehouse_out_good/${params.id}`,
    method: "get",
    params,
  });
}

// 关联仓储-仓储详情-提取过户单或者出库单详细数据
export function getOutGoodItems(data: any) {
  return request({
    url: `base/qyzx_warehouse_out_good/getOutGoodItems`,
    method: "post",
    data,
  });
}

