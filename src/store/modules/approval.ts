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
    orderCodeList: [],
  });
  const totalMoney = ref({
    count: 0,
    totalMoneySum: 0,
  });
  const curTab = ref(1);
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
  const submitFlag = ref(false); // 默认为提交加锁 几个tab的数据加载完，置为true，可提交
  const rediusReportId = ref(""); // 后端缓存id 申报资料上传时后端生成

  // 更新缓存id
  function setRediusReportId(id: any) {
    rediusReportId.value = id;
  }

  // 将金额和已选重置
  function resetMoney() {
    totalMoney.value = {
      count: 0,
      totalMoneySum: 0,
    };
  }

  function getMoneyAndLen(type: any, flag?: any) {
    curTab.value = type;
    if (flag == 1) return;
    if (type == pro.DD) {
      let sum = 0;
      DDList.value.forEach((item) => (sum += Math.floor(item.totalMoney)));
      totalMoney.value = {
        count: DDList.value.length,
        totalMoneySum: sum,
      };
    } else if (type == pro.HT) {
      let sum = 0;
      HTList.value.forEach((item) => (sum += Math.floor(item.amount)));
      totalMoney.value = {
        count: HTList.value.length,
        totalMoneySum: sum,
      };
    } else if (type == pro.FP) {
      let sum = 0;
      FPList.value.forEach((item) => (sum += Math.floor(item.allGoodMoneySum)));
      totalMoney.value = {
        count: FPList.value.length,
        totalMoneySum: sum,
      };
    } else if (type == pro.YH) {
      let sum = 0;
      YHList.value.forEach((item) => (sum += Math.floor(item.paymentAmount)));
      totalMoney.value = {
        count: YHList.value.length,
        totalMoneySum: sum,
      };
    } else if (type == pro.CC) {
      totalMoney.value = {
        count: CCList.value.length,
        totalMoneySum: 0,
      };
    } else if (type == pro.WL) {
      totalMoney.value = {
        count: WLList.value.length,
        totalMoneySum: 0,
      };
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

  // 获取订单、合同、 发票、 银行流水（企业手动导入数据）
  function getTableData(reportId?: any) {
    submitFlag.value = false; // 重新加载时，为提交加锁
    searchPar.value.dataType = reportId;
    return new Promise((resolve, reject) => {
      Promise.all([
        getqyzxOrder(),
        getqyzxTransactionCertificate(),
        getqyzxInvoic(),
        getqyzxBankStatement(),
        getCC(),
        getWL(),
      ])
        .then((res) => {
          submitFlag.value = true; // 加载完成后，为提交加锁
          setTimeout(() => {
            getMoneyAndLen(curTab.value);
          }, 0);
          resolve(1);
        })
        .catch((err) => {
          reject(0);
        });
    });
  }

  // 获取订单、合同、 发票、 银行流水（企业自动导入数据）
  function getTableDataAuto(orderCodeList: any) {
    submitFlag.value = false; // 重新加载时，为提交加锁
    searchPar.value.orderCodeList = orderCodeList;
    searchPar.value.dataType = "";
    return new Promise((resolve, reject) => {
      Promise.all([
        getqyzxOrder(),
        getqyzxTransactionCertificate(),
        getqyzxInvoic(),
        getqyzxBankStatement(),
        getCC(),
        getWL(),
      ])
        .then((res) => {
          submitFlag.value = true; // 加载完成后，为提交加锁
          setTimeout(() => {
            getMoneyAndLen(curTab.value);
          }, 0);
          resolve(1);
        })
        .catch((err) => {
          reject(0);
        });
    });
  }

  // 重置tab状态
  function resetTab(type: any) {
    submitFlag.value = false;
    pageType.value = type;
    tabData.value.DD.status = 0;
    tabData.value.HT.status = 0;
    tabData.value.FP.status = 0;
    tabData.value.YH.status = 0;
    tabData.value.CC.status = 0;
    tabData.value.WL.status = 0;
  }

  // 更新tab状态
  function resreshTab(type: any) {
    switch (type) {
      case pro.DD:
        tabData.value.DD.status = validateType(DDList.value);
        break;
      case pro.HT:
        tabData.value.HT.status = validateType(HTList.value);
        break;
      case pro.FP:
        tabData.value.FP.status = validateType(FPList.value);
        break;
      case pro.YH:
        tabData.value.YH.status = validateType(YHList.value);
        break;
      case pro.CC:
        tabData.value.CC.status = validateType(CCList.value);
        break;
      case pro.WL:
        tabData.value.WL.status = validateType(WLList.value);
        break;
    }
  }

  // 订单1
  function getqyzxOrder() {
    return new Promise((resole, reject) => {
      forReportDD(searchPar.value)
        .then((res) => {
          DDList.value = res.data;
          if (pageType.value != "detail") {
            tabData.value.DD.status = validateType(res.data);
          }
          resole(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 合同2
  function getqyzxTransactionCertificate() {
    return new Promise((resolve, reject) => {
      qyzxTransactionCertificate(searchPar.value)
        .then((res) => {
          HTList.value = res.data;
          if (pageType.value != "detail") {
            tabData.value.HT.status = validateType(res.data);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 发票列表3
  function getqyzxInvoic() {
    return new Promise((resolve, reject) => {
      qyzxInvoic(searchPar.value)
        .then((res) => {
          FPList.value = res.data;
          if (pageType.value != "detail") {
            tabData.value.FP.status = validateType(res.data);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 银行流水4
  function getqyzxBankStatement() {
    return new Promise((resolve, reject) => {
      qyzxBankStatement(searchPar.value)
        .then((res) => {
          YHList.value = res.data;
          if (pageType.value != "detail") {
            tabData.value.YH.status = validateType(res.data);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 仓储5
  function getCC() {
    return new Promise((resolve, reject) => {
      forReportCC(searchPar.value)
        .then((res) => {
          CCList.value = res.data || [];
          if (pageType.value != "detail") {
            tabData.value.CC.status = validateType(res.data);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 物流6
  function getWL() {
    return new Promise((resolve, reject) => {
      forReportWL(searchPar.value)
        .then((res) => {
          WLList.value = res.data;
          if (pageType.value != "detail") {
            tabData.value.WL.status = validateType(res.data);
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
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
      judgeResult: material.judgeResult || [],
    };
    return data;
  }

  // 表单暂存前，整合数据（不做附件必传校验）
  function updateDataSave(form: any) {
    const businessDataMaterialList: any = [];
    if (rediusReportId.value) {
      form.id = rediusReportId.value;
    }
    if (fileInfo.value && JSON.stringify(fileInfo.value) != "{}") {
      businessDataMaterialList.push(fileInfo.value);
    }
    // let HTEmptyflag = false; // 合同有待上传的附件
    // let YHEmptyflag = false; // 银行有待上传的附件
    const DDcode: any = [];
    const HTcode: any = [];
    const FPcode: any = [];
    const YHcode: any = [];
    const CCcode: any = [];
    const WLcode: any = [];
    DDList.value &&
      DDList.value.forEach((item: any) => {
        DDcode.push(item.code);
        if (item.material) {
          const d = formateMaterial(item.material, pro.DD);
          businessDataMaterialList.push(d);
        }
      });
    HTList.value &&
      HTList.value.forEach((item: any) => {
        HTcode.push(item.code);
        if (item.material) {
          const d = formateMaterial(item.material, pro.HT);
          businessDataMaterialList.push(d);
        }
      });
    FPList.value &&
      FPList.value.forEach((item: any) => {
        FPcode.push(item.id);
        if (item.material) {
          const d = formateMaterial(item.material, pro.FP);
          businessDataMaterialList.push(d);
        }
      });
    YHList.value &&
      YHList.value.forEach((item: any) => {
        YHcode.push(item.id);
        if (item.material) {
          const d = formateMaterial(item.material, pro.YH);
          businessDataMaterialList.push(d);
        }
      });
    CCList.value &&
      CCList.value.forEach((item: any) => {
        CCcode.push(item.id);
        if (item.material) {
          const d = formateMaterial(item.material, pro.CC);
          businessDataMaterialList.push(d);
        }
      });

    WLList.value &&
      WLList.value.forEach((item: any) => {
        WLcode.push(item.id);
        if (item.material) {
          const d = formateMaterial(item.material, pro.WL);
          businessDataMaterialList.push(d);
        }
      });
    form.businessDataMaterialList = businessDataMaterialList;
    form.orderMapRequestList = DDcode;
    form.transactionCertificateMapRequestList = HTcode;
    form.invoiceMapRequestList = FPcode;
    form.bankStatementMapRequestList = YHcode;
    form.warehouseMapRequestList = CCcode; // 仓储
    form.transportationRequestList = WLcode; // 物流
  }

  // 表单提交前，整合数据
  function updateData(form: any, errdata: any) {
    const businessDataMaterialList: any = [];
    if (rediusReportId.value) {
      form.id = rediusReportId.value;
    }
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
    DDList.value &&
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
    HTList.value &&
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
    FPList.value &&
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
    YHList.value &&
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

    CCList.value &&
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

    WLList.value &&
      WLList.value.forEach((item: any) => {
        WLcode.push(item.id);
        if (item.material) {
          const d = formateMaterial(item.material, pro.WL);
          businessDataMaterialList.push(d);
          if (item.material.judgeCode == 2) {
            errdata.flag = true;
            errdata.WL.title = "物流附件异常，请核实";
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
    totalMoney,
    submitFlag,
    rediusReportId,
    resreshTab,
    setListData,
    updateData,
    updateDataSave,
    getTableData,
    getTableDataAuto,
    setFileInfo,
    clearTable,
    resetTab,
    getMoneyAndLen,
    setRediusReportId,
    resetMoney,
  };
});
