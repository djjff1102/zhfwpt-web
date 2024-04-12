import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useApprovalStore = defineStore("approvalstore", () => {
  const count = ref(0);
  const DDList = ref([]);

  const countData = computed(() => {
    return 2;
  });

  function setListData(data: any) {
    console.log("更新订单----------：", data);
    DDList.value = data;
  }

  function updateData(form: any) {
    const businessDataMaterialList: any = [];
    DDList.value.forEach((item: any) => {
      if (item?.businessDataMaterialList) {
        const d = JSON.parse(JSON.stringify(item?.businessDataMaterialList));
        businessDataMaterialList.push(d);
        // delete item.businessDataMaterialList;
      }
    });
    console.log(
      "businessDataMaterialList-----------：",
      businessDataMaterialList
    );
    form.businessDataMaterialList = businessDataMaterialList;
  }

  return {
    count,
    setListData,
    updateData,
  };
});
