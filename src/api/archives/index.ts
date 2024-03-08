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
} from "./type";

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

