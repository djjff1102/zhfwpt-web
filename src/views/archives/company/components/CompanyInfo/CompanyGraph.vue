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
      deep(res.data, 0)
      data.value = res.data
    })
    .catch((err) => {
      console.log("err:", err);
    });
};

// 为企业图谱加上索引，梳理当数据很多时，根据索引控制显示隐藏
function deep(data, i) {
  data.index = i
  data.children && data.children.forEach((item, j) => {
    if(j < 10) {
      deep(item, j)
    } else if(j == 10 && data.children.length == 11 && !item.moreData) {
      deep(item, j)
    } else if(j == 10 && !item.moreData) {
      let moreData = data.children.splice(10)
      data.children.push({
        id:'more-node',
        name:'更多',
        sum: moreData.length,
        moreData
      })
    }
    
  })
}
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
