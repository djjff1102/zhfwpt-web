<template>
  <qiyetupu id="companyGid2" :data="data"></qiyetupu>
</template>
<script setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import {
  getenterpriseMapQuery,
  getenterpriseMapQueryTree,
} from "@/api/archives";
import { arrayToTree } from "@/utils/common";

const props = defineProps({
  companyName: {
    default: "",
  },
  companyId: {
    default: "",
  },
});
const data = ref();

watch(
  () => props.companyId,
  (v) => {
    if (v) {
      nextTick(() => {
        init();
      });
    }
  },
  {
    immediate: true,
  }
);

const init = async () => {
  getenterpriseMapQueryTree({
    companyId: props.companyId,
  })
    .then((res) => {
      data.value = res.data;
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
