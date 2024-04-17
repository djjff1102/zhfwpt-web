import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import {
  qyzxBankStatement,
  forReportDD,
  qyzxInvoic,
  qyzxTransactionCertificate,
} from "@/api/intellApproval/special";

export const useApprovalStore = defineStore("approvalstore", () => {
  const DDList = ref([]);
  const HTList = ref([]);
  const FPList = ref([]);
  const YHList = ref([]);
  const CCList = ref([]);
  const WLList = ref([]);
  const searchPar = ref({
    page_size: 100,
    page: 1,
    dataType: "",
  });
  const fileInfo = ref(); // 记录上传的附件

  function clearTable() {
    DDList.value = [];
    HTList.value = [];
    FPList.value = [];
    YHList.value = [];
    CCList.value = [];
    WLList.value = [];
  }

  // 保存上传的文件
  function setFileInfo(d: any) {
    fileInfo.value = d;
  }

  // 获取订单、合同、 发票、 银行流水
  function getTableData(reportId: any) {
    searchPar.value.dataType = reportId;
    getqyzxOrder();
    getqyzxTransactionCertificate();
    getqyzxInvoic();
    getqyzxBankStatement();
  }

  // 订单
  function getqyzxOrder() {
    forReportDD(searchPar.value)
      .then((res) => {
        DDList.value = res.data;
      })
      .catch((err) => {});
  }

  // 合同
  function getqyzxTransactionCertificate() {
    qyzxTransactionCertificate(searchPar.value)
      .then((res) => {
        HTList.value = res.data;
      })
      .catch((err) => {});
  }

  // 发票列表
  function getqyzxInvoic() {
    qyzxInvoic(searchPar.value)
      .then((res) => {
        FPList.value = res.data;
      })
      .catch((err) => {});
  }

  // 银行流水
  function getqyzxBankStatement() {
    qyzxBankStatement(searchPar.value)
      .then((res) => {
        YHList.value = res.data;
      })
      .catch((err) => {});
  }

  function setListData(type: any, index: any, businessDataMaterialList: any) {
    switch (type) {
      case "1":
        HTList.value[index].businessDataMaterialList = businessDataMaterialList;
      case "2":
        DDList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case "3":
        FPList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case "4":
        YHList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case "5":
        CCList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case "6":
        WLList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
    }
  }

  // 表单提交前，整合数据
  function updateData(form: any) {
    const businessDataMaterialList: any = [];
    if (fileInfo.value && JSON.stringify(fileInfo.value) != "{}") {
      businessDataMaterialList.push(fileInfo.value);
    }
    const DDcode: any = [];
    const HTcode: any = [];
    const FPcode: any = [];
    const YHcode: any = [];
    const CCcode: any = [];
    const WLcode: any = [];
    DDList.value.forEach((item: any) => {
      DDcode.push(item.code);
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    HTList.value.forEach((item: any) => {
      HTcode.push(item.code);
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    FPList.value.forEach((item: any) => {
      FPcode.push(item.code);
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    YHList.value.forEach((item: any) => {
      YHcode.push(item.id);
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    // CCList.value.forEach((item: any) => {
    //   // CCcode.push(item.code);
    //   if (item?.businessDataMaterialList) {
    //     const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
    //     businessDataMaterialList.push(d);
    //     delete item.businessDataMaterialList;
    //   }
    // });
    // WLList.value.forEach((item: any) => {
    //   // WLcode.push(item.code);
    //   if (item?.businessDataMaterialList) {
    //     const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
    //     businessDataMaterialList.push(d);
    //     delete item.businessDataMaterialList;
    //   }
    // });

    form.businessDataMaterialList = businessDataMaterialList;
    form.orderMapRequestList = DDcode;
    form.transactionCertificateMapRequestList = HTcode;
    form.invoiceMapRequestList = FPcode;
    form.bankStatementMapRequestList = YHcode;
    form.warehouseMapRequestList = CCcode; // 仓储
  }

  return {
    DDList,
    HTList,
    FPList,
    YHList,
    CCList,
    WLList,
    setListData,
    updateData,
    getTableData,
    setFileInfo,
    clearTable,
  };
});
