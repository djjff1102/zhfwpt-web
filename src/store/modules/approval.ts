import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import {
  qyzxBankStatement,
  forReportDD,
  qyzxInvoic,
  qyzxTransactionCertificate,
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
    PF: {
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

  // 订单1
  function getqyzxOrder() {
    forReportDD(searchPar.value)
      .then((res) => {
        DDList.value = res.data;
        tabData.value.DD.status = validateType(res.data);
      })
      .catch((err) => {});
  }

  // 合同2
  function getqyzxTransactionCertificate() {
    qyzxTransactionCertificate(searchPar.value)
      .then((res) => {
        HTList.value = res.data;
        tabData.value.HT.status = validateType(res.data);
      })
      .catch((err) => {});
  }

  // 发票列表3
  function getqyzxInvoic() {
    qyzxInvoic(searchPar.value)
      .then((res) => {
        FPList.value = res.data;
        tabData.value.FP.status = validateType(res.data);
      })
      .catch((err) => {});
  }

  // 银行流水4
  function getqyzxBankStatement() {
    qyzxBankStatement(searchPar.value)
      .then((res) => {
        YHList.value = res.data;
        tabData.value.YH.status = validateType(res.data);
      })
      .catch((err) => {});
  }

  // 附件上传完，刷新接口
  function setListData(type: any) {
    switch (type) {
      case pro.DD:
        getqyzxOrder();
      // DDList.value[index].businessDataMaterialList = businessDataMaterialList;
      case pro.HT:
        getqyzxTransactionCertificate();
        // HTList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case pro.FP:
        getqyzxInvoic();
        // FPList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case pro.YH:
        getqyzxBankStatement();
        // YHList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case pro.CC:
        // CCList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
      case pro.WL:
        // WLList.value[index].businessDataMaterialList = businessDataMaterialList;
        break;
    }
  }

  function formateMaterial(material: any, type: any) {
    const data = {
      fileType: type, // 附件
      fileUrl: material.fileUrl || "",
      judgeId: material.judgeId || "",
    };
    return data;
  }

  // 表单提交前，整合数据
  function updateData(form: any, errdata: any) {
    const businessDataMaterialList: any = [];
    // if (fileInfo.value && JSON.stringify(fileInfo.value) != "{}") {
    //   businessDataMaterialList.push(fileInfo.value);
    // }
    console.log("表单------------------：", form);
    if (
      form.businessDataMaterialList &&
      form.businessDataMaterialList[0] &&
      form.businessDataMaterialList[0].fileType == 7
    ) {
      businessDataMaterialList.push(form.businessDataMaterialList[0]);
    }
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
          errdata.DD.title = "订单附件异常";
          errdata.DD.list.push(item);
        }
      }
      // if (item?.businessDataMaterialList) {
      //   const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
      //   businessDataMaterialList.push(d);
      //   delete item.businessDataMaterialList;
      // }
    });
    HTList.value.forEach((item: any) => {
      HTcode.push(item.code);
      if (item.material) {
        const d = formateMaterial(item.material, pro.HT);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.HT.title = "合同附件异常";
          // errdata.HT.list.push(item);
        }
      }
      // if (item?.businessDataMaterialList) {
      //   const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
      //   businessDataMaterialList.push(d);
      //   delete item.businessDataMaterialList;
      // }
    });
    FPList.value.forEach((item: any) => {
      FPcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.FP);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.FP.title = "发票附件异常";
          // errdata.FP.list.push(item);
        }
      } else {
        errdata.flag = true;
        errdata.FP.title = "发票附件待上传";
        // errdata.FP.emptyList.push(item);
      }
      // if (item?.businessDataMaterialList) {
      //   const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
      //   businessDataMaterialList.push(d);
      //   delete item.businessDataMaterialList;
      // }
    });
    YHList.value.forEach((item: any) => {
      YHcode.push(item.id);
      if (item.material) {
        const d = formateMaterial(item.material, pro.YH);
        businessDataMaterialList.push(d);
        if (item.material.judgeCode == 2) {
          errdata.flag = true;
          errdata.YH.title = "银行附件异常";
          // errdata.YH.list.push(item);
        }
      } else {
        errdata.flag = true;
        errdata.YH.title = "银行附件待上传";
        // errdata.YH.emptyList.push(item);
      }
      // if (item?.businessDataMaterialList) {
      //   const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
      //   businessDataMaterialList.push(d);
      //   delete item.businessDataMaterialList;
      // }
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
    tabData,
    setListData,
    updateData,
    getTableData,
    setFileInfo,
    clearTable,
  };
});
