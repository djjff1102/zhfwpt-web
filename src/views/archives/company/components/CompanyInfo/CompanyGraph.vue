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

let moreNumber = 10
// 为企业图谱加上索引，梳理当数据很多时，根据索引控制显示隐藏
function deep(data, i) {
  data.index = i
  data.children && data.children.forEach((item, j) => {
    if(j < moreNumber) {
      deep(item, j)
    } else if(j == moreNumber && data.children.length == moreNumber + 1 && !item.moreData) {
      deep(item, j)
    } else if(j == moreNumber && !item.moreData) {
      let moreData = data.children.splice(moreNumber)
      data.children.push({
        id:'more-node',
        name: `展开(${moreData.length})`,
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
