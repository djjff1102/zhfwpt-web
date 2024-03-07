import request from "@/utils/request";
import { SearchData, CompanyDataResult } from "./type";

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
