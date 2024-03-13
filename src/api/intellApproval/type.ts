export interface SearchInvoice {}

export interface InvoiceDataResult {}

export interface DetailList {
  taxAuthority: string; // 主管税务机关
  limitType: string; // 申请额度调整类型
  companyName: string; // 申请单位
  adjustType: string; // 发票短期调整类型
  registerAddress: string; // 注册地址
  validDateStart: string; // 起始有效期-开始
  validDateEnd: string; // 起始有效期-结束
  applyUserName: string; // 操作人
  reason: string; // 申请理由
  bankStatementMapResponseList: []; // 银行流水
  invoiceMapResponseList: []; // 发票
  orderMapResponseList: []; // 订单
  transactionCertificateMapResponseList: []; // 合同
  warehouseMapResponseList: []; // 仓储
  otherMaterialsResponseList: [];
}

export interface DetailResult {
  data: DetailList[];
  result: number;
}
