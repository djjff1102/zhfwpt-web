import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { fpspReport } from "@/api/intellApproval";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";

export const useNoticeApprovalStore = defineStore("noticeApprovalstore", () => {
  // 同发票智能审批
  enum status {
    wait = 1,
    pass = 2,
    reject = 3,
  }
  const approveStatus = {
    [status.wait]: "待审批",
    [status.pass]: "通过",
    [status.reject]: "驳回",
  };

  const useStorage = useUserStore();
  const roleLevel = useStorage.user.roleLevel; // 1是税务   2是企业

  const router = useRouter();

  const searchPar = ref({
    page_size: 10,
    page: 1,
    // companyName: "", // 申报单位
    approveStatus: "", // 审批状态
  });
  const tableData = ref<any>([]);
  const total = ref(0);
  const loading = ref(false);

  // 禁止滚动加载
  const scrollDisabled = computed(() => {
    return tableData.value.length > total.value;
  });

  // 获取审批消息
  function getNoticeApprovalList() {
    if (loading.value || scrollDisabled.value) return;
    loading.value = true;
    if (roleLevel == 1) {
      // 税务查询待审批
      searchPar.value.approveStatus = "1";
    } else {
      // 企业查询驳回
      searchPar.value.approveStatus = "3";
    }
    fpspReport(searchPar.value)
      .then((res: any) => {
        tableData.value.push(...res.data);
        total.value = res.total as any;
        searchPar.value.page++;
        loading.value = false;
      })
      .catch((err) => {
        loading.value = false;
      });
  }

  function refreshNotice() {
    tableData.value = [];
    searchPar.value.page = 1;
    total.value = 0;
    getNoticeApprovalList();
  }

  // 跳转审批详情
  function toNoticeApprovalDetail(data: any) {
    router.push({
      name: "IntellApprovalOperate",
      query: {
        id: data?.id || "-1",
        reportCode: data?.reportCode,
        approveStatus: approveStatus[data?.approveStatus],
        applyUserId: data?.applyUserId || "-1",
        type: "detail",
      },
    });
  }

  return {
    roleLevel,
    tableData,
    loading,
    scrollDisabled,
    getNoticeApprovalList,
    toNoticeApprovalDetail,
    refreshNotice,
  };
});
