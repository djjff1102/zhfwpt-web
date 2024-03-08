export interface SearchData {
  pageSize: number;
  pageNumber: number;
  allContentSearch: string;
  provinceShort: string;
}

export interface CompanyData {
  authority?: string;
  businessScope?: string;
  capital?: string;
  companyAddress?: string;
  [key: string]: any;
}
interface BaseResult {
  result: number;
}
export interface CompanyDataResult extends BaseResult {
  data: CompanyData[];
  total: number;
}

export interface AttentionData {
  companyIdList: String[];
  userId: string;
  attention: boolean;
}

export interface AttentionResult extends BaseResult {
  success_count: number;
}

export interface UserInfo {
  userId: string;
}

export interface TotalAtentionResult extends BaseResult {
  data: {
    attentionCount: number;
    highRiskCount: number;
    normalRiskCount: number;
  };
}

export interface ProvinceSearch {
  provinceShort: string;
  allContentSearch: string;
}

export interface ProvinBase {
  count: string;
  province_short: string;
}

export interface ProvinceResult extends BaseResult {
  data: ProvinBase[];
}
