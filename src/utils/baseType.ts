// 一般处理（经营状态、信用状态、行政处罚、严重违法）
export const JYriskCode = [
  "QYFX_XFQY_JYZT", // 天津技嘉信息技术咨询有限公司存在经营异常情况-经营
  "QYFX_XFQY_XZCF", // 艳明凤香（天津）商贸有限公司存在行政处罚行为-行政处罚
  "QYFX_XFQY_XYZT", // 天津永义国际贸易有限公司信用状态异常-信用
  "QYFX_GFQY_YZWF", // 天津裕敏科技有限公司-严重违法
  "QYFX_XFQY_YZWF", //  天津裕敏科技有限公司-严重违法
  "QYFX_XGFQY_YZWF", // 天津裕敏科技有限公司-严重违法
  "QYFX_XFQY_GQCZ", // 天津胜利一号租赁有限公司 - 股权出质
];

// 特殊处理 - 工商状态
export const TSriskCode = [
  "QYFX_GFQY_GSZT", // 天津孟茹电子商务有限公司
  "QYFX_XFQY_GSZT", // 天津孟茹电子商务有限公司
  "QYFX_XGFQY_GSZT", // 天津孟茹电子商务有限公司
];

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
  },
  {
    value: "1年内",
    key: "2",
  },
  {
    value: "1~3年",
    key: "3",
  },
  {
    value: "3~5年",
    key: "4",
  },
  {
    value: "5~10年",
    key: "5",
  },
  {
    value: "10年以上",
    key: "6",
  },
];

// 注册资本
export const registerMoney = [
  {
    value: "0-100万",
    key: "100",
  },
  {
    value: "100-200万",
    key: "200",
  },
  {
    value: "200-500万",
    key: "300",
  },
  {
    value: "500-1000万",
    key: "1000",
  },
  {
    value: "1000万以上",
    key: "2000",
  },
];
