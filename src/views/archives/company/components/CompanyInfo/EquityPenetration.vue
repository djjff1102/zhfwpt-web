<template>
  <div>
    <!-- 股权 -->
    <guquan id="companyGid" :data="data"></guquan>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { stockQuery } from "@/api/archives";
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
  stockQuery({
    // companyId: '04bbe3814ee17efb0d2e3e0b3b1ed2c4'
    companyId: props.companyId,
  })
    .then((res) => {
      // 股权穿透，过滤掉法定代表人
      let path = []
      let point = res.data.point_list.filter(e => {
        if(e.point_type !== '法定代表人') {
          return e
        } else {
          path = res.data.line_list.filter(p => p.target_id != e.point_id )
        }
      })
      const d = arrayToTree(point, path);
      data.value = d;
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
