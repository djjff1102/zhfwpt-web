import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useApprovalStore = defineStore("approvalstore", () => {
  const count = ref(0);
  const DDList = ref([]);
  const HTList = ref([]);
  const FPList = ref([]);
  const YHList = ref([]);
  const CCList = ref([]);
  const WLList = ref([]);

  function setListData(data: any, type: any) {
    switch (type) {
      case "1":
        HTList.value = data;
        break;
      case "2":
        DDList.value = data;
        break;
      case "3":
        FPList.value = data;
        break;
      case "4":
        YHList.value = data;
        break;
      case "5":
        CCList.value = data;
        break;
      case "6":
        WLList.value = data;
        break;
    }
  }

  // 表单提交前，整合数据
  function updateData(form: any) {
    const businessDataMaterialList: any = [];
    DDList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    HTList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    FPList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    YHList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    CCList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    WLList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        delete item.businessDataMaterialList;
      }
    });
    form.businessDataMaterialList = businessDataMaterialList;
  }

  return {
    count,
    setListData,
    updateData,
  };
});
