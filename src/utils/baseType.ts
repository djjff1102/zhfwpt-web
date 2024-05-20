export enum riskstatus {
  high = 1,
  middle = 2,
  low = 3,
}

export const riskLeval = {
  [riskstatus.high]: "高信用",
  [riskstatus.middle]: "中信用",
  [riskstatus.low]: "低信用",
};

// 登记状态
export const signStatus = [
  {
    label: "存续",
  },
  {
    label: "吊销",
  },
  {
    label: "注销",
  },
  {
    label: "撤销",
  },
  {
    label: "正常",
  },
  {
    label: "迁出",
  },
  {
    label: "在营（开业）企业",
  },
  {
    label: "歇业",
  },
];

// 企业类型
export const companyType = [
  "有限责任公司",
  "股份有限公司",
  "集体所有制",
  "股份合作制",
  "国有企业",
  "个体工商户",
  "个人独资企业",
  "有限合伙",
  "普通合伙",
  "外商投资企业",
  "港、澳、台",
  "联营企业",
  "私营企业",
];

export const companyTypeObj = [
  {
    value: "有限责任公司",
    key: "有限责任公司",
  },
  {
    value: "股份有限公司",
    key: "股份有限公司",
  },
  {
    value: "集体所有制",
    key: "集体所有制",
  },
  {
    value: "股份合作制",
    key: "股份合作制",
  },
  {
    value: "国有企业",
    key: "国有企业",
  },
  {
    value: "个体工商户",
    key: "个体工商户",
  },
  {
    value: "个人独资企业",
    key: "个人独资企业",
  },
  {
    value: "有限合伙",
    key: "有限合伙",
  },
  {
    value: "普通合伙",
    key: "普通合伙",
  },
  {
    value: "外商投资企业",
    key: "外商投资企业",
  },
  {
    value: "港、澳、台",
    key: "港、澳、台",
  },
  {
    value: "联营企业",
    key: "联营企业",
  },
  {
    value: "私营企业",
    key: "私营企业",
  },
];

// 成立时间
export const establishDate = [
  {
    value: "半年内",
    key: "1",
    start: 0,
    end: 0.5,
  },
  {
    value: "1年内",
    key: "2",
    start: 0,
    end: 1,
  },
  {
    value: "1~3年",
    key: "3",
    start: 1,
    end: 3,
  },
  {
    value: "3~5年",
    key: "4",
    start: 3,
    end: 5,
  },
  {
    value: "5~10年",
    key: "5",
    start: 5,
    end: 10,
  },
  {
    value: "10年以上",
    key: "6",
    start: 10,
    end: "",
  },
];

// 注册资本
export const registerMoney = [
  {
    value: "0-100万",
    min: 0,
    max: 100,
    key: "100",
  },
  {
    value: "100-200万",
    min: 100,
    max: 200,
    key: "200",
  },
  {
    value: "200-500万",
    min: 200,
    max: 500,
    key: "300",
  },
  {
    value: "500-1000万",
    min: 500,
    max: 1000,
    key: "1000",
  },
  {
    value: "1000万以上",
    min: 1000,
    key: "1000",
  },
];

export const registerMoneyType = [
  {
    value: "人民币",
    key: "人民币",
  },
  {
    value: "美元",
    key: "美元",
  },
  {
    value: "欧元",
    key: "欧元",
  },
  {
    value: "日元",
    key: "日元",
  },
  {
    value: "英镑",
    key: "英镑",
  },
  {
    value: "澳大利亚元",
    key: "澳大利亚元",
  },
  {
    value: "加拿大元",
    key: "加拿大元",
  },
  {
    value: "新加坡元",
    key: "新加坡元",
  },
  {
    value: "挪威克朗",
    key: "挪威克朗",
  },
  {
    value: "瑞典克朗",
    key: "瑞典克朗",
  },
  {
    value: "港币",
    key: "港币",
  },
];

// 企业信用等级
export const companyCreditType = [
  {
    name: "全部",
    value: "",
  },
  {
    name: "高信用",
    value: "1",
  },
  {
    name: "中信用",
    value: "2",
  },
  {
    name: "低信用",
    value: "3",
  }
];
