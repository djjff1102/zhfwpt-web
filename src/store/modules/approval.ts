import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import {
  qyzxBankStatement,
  forReportDD,
  qyzxInvoic,
  qyzxTransactionCertificate,
  forReportCC,
  forReportWL,
} from "@/api/intellApproval/special";
import { validateType } from "@/utils/common";

enum pro {
  DD = "1", // 订单
  HT = "2", // 合同
  FP = "3", // 发票
  YH = "4", // 银行流水
  CC = "5", // 仓储
  WL = "6", // 物流
}

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
  const tabData = ref({
    DD: {
      name: "订单",
      key: pro.DD,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
    HT: {
      name: "合同",
      key: pro.HT,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
    FP: {
      name: "发票",
      key: pro.FP,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
    YH: {
      name: "银行流水",
      key: pro.YH,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
    CC: {
      name: "仓储",
      key: pro.CC,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
    WL: {
      name: "物流",
      key: pro.WL,
      status: 3, // 默认状态为0 1为附件有误 2为正确
    },
  });
  const pageType = ref(""); // 当前页面类型 add operate detail

  function getListLength(type: any) {
    if (type == "CC") {
      return CCList.value.length;
    } else if (type == "WL") {
      return WLList.value.length;
    }
  }
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
    getCC();
    getWL();
  }

  // 重置tab状态
  function resetTab(type: any) {
    pageType.value = type;
    tabData.value.DD.status = 0;
    tabData.value.HT.status = 0;
    tabData.value.FP.status = 0;
    tabData.value.YH.status = 0;
    tabData.value.CC.status = 0;
    tabData.value.WL.status = 0;
  }

  // 订单1
  function getqyzxOrder() {
    forReportDD(searchPar.value)
      .then((res) => {
        DDList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.DD.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 合同2
  function getqyzxTransactionCertificate() {
    qyzxTransactionCertificate(searchPar.value)
      .then((res) => {
        HTList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.HT.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 发票列表3
  function getqyzxInvoic() {
    qyzxInvoic(searchPar.value)
      .then((res) => {
        FPList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.FP.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 银行流水4
  function getqyzxBankStatement() {
    qyzxBankStatement(searchPar.value)
      .then((res) => {
        YHList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.YH.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 仓储5
  function getCC() {
    forReportCC(searchPar.value)
      .then((res) => {
        CCList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.CC.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 物流6
  function getWL() {
    forReportWL(searchPar.value)
      .then((res) => {
        WLList.value = res.data;
        if (pageType.value != "detail") {
          tabData.value.WL.status = validateType(res.data);
        }
      })
      .catch((err) => {});
  }

  // 附件上传完，刷新接口
  function setListData(type: any) {
    switch (type) {
      case pro.DD:
        getqyzxOrder();
      case pro.HT:
        getqyzxTransactionCertificate();
        break;
      case pro.FP:
        getqyzxInvoic();
        break;
      case pro.YH:
        getqyzxBankStatement();
        break;
      case pro.CC:
        getCC();
        break;
      case pro.WL:
        getWL();
        break;
    }
  }

  function formateMaterial(material: any, type: any) {
    const data = {
      fileType: type, // 附件
      fileUrl: material.fileUrl || "",
      judgeId: material.judgeId || "",
      judgeCode: material.judgeCode || 0,
    };
    return data;
  }

  // 表单提交前，整合数据
  function updateData(form: any, errdata: any) {
    const businessDataMaterialList: any = [];
    if (fileInfo.value && JSON.stringify(fileInfo.value) != "{}") {
      businessDataMaterialList.push(fileInfo.value);
    }
    let HTEmptyflag = false; // 合同有待上传的附件
    let YHEmptyflag = false; // 银行有待上传的附件
    const DDcode: any = [];
    const HTcode: any = [];
    const FPcode: any = [];
    const YHcode: any = [];
    const CCcode: any = [];
    const WLcode: any = [];
    DDList.value.forEach((item: any) => {
      DDcode.push(item.code);
      if (item.material) {
        const d = formateMaterial(item.material, pro.DD);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.DD.title = "订单附件异常，请核实";
          errdata.DD.list.push(item);
        }
      }
    });
    HTList.value.forEach((item: any) => {
      HTcode.push(item.code);
      if (item.material) {
        const d = formateMaterial(item.material, pro.HT);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.HT.title = "合同附件异常，请核实";
        }
      } else {
        errdata.flag = true;
        HTEmptyflag = true;
        errdata.HT.title = "合同附件待上传，请核实";
      }
    });
    FPList.value.forEach((item: any) => {
      FPcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.FP);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.FP.title = "发票附件异常，请核实";
        }
      }
    });
    YHList.value.forEach((item: any) => {
      YHcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.YH);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.YH.title = "银行附件异常，请核实";
        }
      } else {
        errdata.flag = true;
        YHEmptyflag = true;
        errdata.YH.title = "银行流水附件待上传，请核实";
      }
    });

    CCList.value.forEach((item: any) => {
      CCcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.CC);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.CC.title = "仓储附件异常，请核实";
          errdata.CC.list.push(item);
        }
      }
    });

    WLList.value.forEach((item: any) => {
      WLcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.WL);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.WL.title = "仓储附件异常，请核实";
          errdata.WL.list.push(item);
        }
      }
    });
    if (YHEmptyflag && HTEmptyflag) {
      // 合同和银行都有待上传的附件，显示成一条提示信息
      errdata.YH.title = "";
      errdata.HT.title = "合同、银行流水附件待上传，请核实";
    }
    form.businessDataMaterialList = businessDataMaterialList;
    form.orderMapRequestList = DDcode;
    form.transactionCertificateMapRequestList = HTcode;
    form.invoiceMapRequestList = FPcode;
    form.bankStatementMapRequestList = YHcode;
    form.warehouseMapRequestList = CCcode; // 仓储
    form.transportationRequestList = WLcode; // 物流
  }

  return {
    DDList,
    HTList,
    FPList,
    YHList,
    CCList,
    WLList,
    tabData,
    setListData,
    updateData,
    getTableData,
    setFileInfo,
    clearTable,
    resetTab,
    getListLength,
  };
});
