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

export interface CompanyDataResult {
  data: CompanyData[];
  result: number;
  total: number;
}
