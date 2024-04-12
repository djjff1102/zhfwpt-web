import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useApprovalStore = defineStore("approvalstore", () => {
  const count = ref(0);

  const countData = computed(() => {
    return 2;
  });

  function increment() {
    count.value++;
  }
  return {
    count,
    increment,
  };
});
