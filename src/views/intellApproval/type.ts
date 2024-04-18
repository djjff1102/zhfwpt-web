export enum status {
  wait = 1,
  pass = 2,
  reject = 3,
}
export const approveStatus = {
  [status.wait]: "待审批",
  [status.pass]: "通过",
  [status.reject]: "驳回",
};

export const approveStatusColor = {
  [status.wait]: "#0594EB",
  [status.pass]: "#5ECF69",
  [status.reject]: "#F76161 ",
};
enum tasks {
  stop = 1,
  doing = 2,
  did = 3,
}

export const taskStatus = {
  [tasks.stop]: "已暂停",
  [tasks.doing]: "评估中",
  [tasks.did]: "已完成",
};

export const taskStatusColor = {
  [tasks.stop]: "#FF9100",
  [tasks.doing]: "#0594EB",
  [tasks.did]: "#5ECF69",
};

export const statusList = [
  {
    value: 1,
    label: "待审批",
  },
  {
    value: 2,
    label: "通过",
  },
  {
    value: 3,
    label: "驳回",
  },
];

export const statusListHis = [
  {
    value: 2,
    label: "通过",
  },
  {
    value: 3,
    label: "驳回",
  },
];

export enum pro {
  HT = "1", // 合同
  DD = "2", // 订单
  FP = "3", // 发票
  CC = "4", // 仓储
  YH = "5", // 银行流水
  WL = "6", // 物流
}

export const nameMap = {
  [pro.HT]: "合同",
  [pro.DD]: "订单",
  [pro.FP]: "发票",
  [pro.CC]: "仓储",
  [pro.YH]: "银行流水",
  [pro.WL]: "物流",
};

// 适配穿梭组件自定义属性
export const prosMap = {
  [pro.HT]: {
    key: "code",
    label: "contractName",
  },
  [pro.DD]: {
    key: "code",
    label: "sellerCompanyName",
  },
  [pro.FP]: {
    key: "code",
    label: "invoicingCompanyName",
  },
  [pro.CC]: {
    key: "code",
    label: "companyName",
  },
  [pro.YH]: {
    key: "orderCode",
    label: "collectionCompany",
  },
};

export const appravalResultList = [
  {
    value: 2,
    label: "通过",
  },
  {
    value: 3,
    label: "驳回",
  },
];

export const columnsHT = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "合同编号",
    dataIndex: "code",
    fixed: "left",
  },
  {
    title: "甲方（买方/采购方/需方）",
    dataIndex: "partyA",
    fixed: "left",
  },
  {
    title: "乙方（卖方/销售方/供方）",
    dataIndex: "partyB",
    fixed: "left",
  },
  {
    title: "签订地点",
    dataIndex: "signAddress",
  },
  {
    title: "签订日期",
    dataIndex: "signDate",
  },
  {
    title: "合同金额",
    dataIndex: "amount",
  },
]);

export const columnsDD = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "订单编号",
    dataIndex: "code",
    width: 180,
    fixed: "left",
  },
  {
    title: "订单创建日期",
    dataIndex: "orderCreateDate",
    fixed: "left",
  },
  {
    title: "商品类别",
    dataIndex: "goodType",
    fixed: "left",
  },
  {
    title: "买方名称",
    dataIndex: "buyerCompanyName",
  },
  {
    title: "买方信用代码",
    dataIndex: "buyerCreditNo",
  },
  {
    title: "卖方名称",
    dataIndex: "sellerCompanyName",
  },
  {
    title: "卖方信用代码",
    dataIndex: "sellerCreditNo",
  },
  // {
  //   title: "商品所在地址",
  //   dataIndex: "goodAddress",
  // },
  // {
  //   title: "仓库名称",
  //   dataIndex: "warehouseName",
  // },
  // {
  //   title: "总金额",
  //   dataIndex: "totalMoney",
  // },
  // {
  //   title: "合同编号",
  //   dataIndex: "certificateCode",
  // },
]);

export const columnsFP = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "发票号码",
    dataIndex: "code",
    //width: 180,
    fixed: "left",
  },
  {
    title: "开票日期",
    dataIndex: "invoicingDate",
    //width: 180,
    fixed: "left",
  },
  {
    title: "发票类别",
    dataIndex: "type",
    width: 180,
  },
  {
    title: "开票单位",
    dataIndex: "invoicingCompanyName",
    //width: 180,
  },
  {
    title: "开票单位统一社会信用代码",
    dataIndex: "invoicingCreditNo",
    //width: 220,
  },
  {
    title: "收票单位",
    dataIndex: "receivingCompanyName",
    //width: 180,
  },
  {
    title: "收票单位统一社会信用代码",
    //width: 220,
    dataIndex: "receivingCreditNo",
  },
  // {
  //   title: "项目名称",
  //   dataIndex: "goodName",
  //   //width: 180,
  // },
  // {
  //   title: "规格型号",
  //   dataIndex: "standard",
  //   // width: 80,
  // },
  // {
  //   title: "数量",
  //   dataIndex: "quantity",
  //   width: 80,
  // },
  // {
  //   title: "计量单位",
  //   dataIndex: "measureUnit",
  //   width: 100,
  // },
  // {
  //   title: "含税金额",
  //   dataIndex: "amountIncludeTax",
  //   width: 180,
  // },
  // {
  //   title: "税率",
  //   dataIndex: "taxRate",
  //   width: 180,
  // },
  // {
  //   title: "税额",
  //   dataIndex: "taxAmount",
  //   width: 180,
  // },
  // {
  //   title: "单价",
  //   dataIndex: "unitPrice",
  //   width: 180,
  // },
  // {
  //   title: "价税合计",
  //   dataIndex: "amountTotal",
  //   width: 180,
  // },
  // {
  //   title: "操作",
  //   width: 100,
  //   dataIndex: "operations",
  //   slotName: "operations",
  //   fixed: "right",
  // },
]);

export const columnsCC = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "仓库简称",
    dataIndex: "shortName",
    width: 180,
    fixed: "left",
  },
  {
    title: "所属地区",
    dataIndex: "locationProvince",
    fixed: "left",
  },
  {
    title: "仓库地址",
    dataIndex: "locationAddress",
    fixed: "left",
  },
  {
    title: "涉及订单数量",
    dataIndex: "",
  },
  {
    title: "货物运输总金额",
    dataIndex: "",
  },
  {
    title: "仓库企业名称",
    dataIndex: "companyName",
  },
  {
    title: "企业纳税人识别号",
    dataIndex: "creditNo",
  },
]);

export const columnsYH = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "付款编号",
    dataIndex: "paymentCode",
    width: 180,
    fixed: "left",
  },
  {
    title: "付款日期",
    dataIndex: "paymentDate",
    fixed: "left",
  },
  {
    title: "付款状态",
    dataIndex: "paymentStatus",
    fixed: "left",
  },
  {
    title: "付款银行",
    dataIndex: "paymentBank",
  },
  {
    title: "付款额度",
    dataIndex: "paymentAmount",
  },
  {
    title: "付款方",
    dataIndex: "paymentCompany",
  },
  {
    title: "付款账号",
    dataIndex: "paymentAccount",
  },
  // {
  //   title: "收款时间",
  //   dataIndex: "collectionDate",
  // },
  // {
  //   title: "收款方",
  //   dataIndex: "collectionCompany",
  // },
  // {
  //   title: "收款银行",
  //   dataIndex: "collectionBank",
  // },
  // {
  //   title: "收款账号",
  //   dataIndex: "collectionAccount",
  // },
  // {
  //   title: "关联订单编号",
  //   dataIndex: "orderCode",
  // },
]);
