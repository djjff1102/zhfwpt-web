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

export interface WarehouseSearch {
  page_size: number;
  page: number;
  companyName: string;
  locationProvince: string;
  locationAddress: string;
  shortName: string;
}

export interface Warehouse {
  code: string;
  companyName: string;
  createDate: string;
  creditNo: string;
  deleteFlag: number;
  id: string;
  locationAddress: string;
  locationCity: string;
  locationProvince: string;
  modifyDate: string;
  page: number;
  page_size: number;
  reserveGoodType: string;
  shortName: string;
  tenantId: string;
}

export interface WarehouseResult extends BaseResult {
  data: Warehouse[];
}

export interface GoodSearch {
  page_size: number;
  page: number;
  measureUnit: string;
  good: string;
  standard: string;
  companyName: string;
}

export interface SelectSearch {
  page_size: number;
  page: number;
  companyName: String;
}

export interface SelectResult extends BaseResult {
  data: string[];
}

export interface ExportSearch {
  companyName: string;
  provinceShort: string;
  legalPerson: string;
  creditNo: string;
  companyAddress: string;
}