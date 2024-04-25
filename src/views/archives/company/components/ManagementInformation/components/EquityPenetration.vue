<template>
  <div>
    <qiyetupu id="companyGid2" :data="data"></qiyetupu>
    </div>
</template>
<script setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { stockQuery } from '@/api/archives'
import { arrayToTree } from '@/utils/common'

const props = defineProps({
  companyName: {
    default: ''
  },
  companyId: {
    default: ''
  }
})
const data = ref()

watch( () => props.companyId, (v) => {
  if(v) {
    nextTick(() =>{
      init()
    })
  }
}, {
  immediate: true
})

const init = async () => {
  stockQuery({
    companyId: '04bbe3814ee17efb0d2e3e0b3b1ed2c4'
  }).then(res => {
    const d = arrayToTree(res.data.point_list, res.data.line_list)
    data.value = d
  }).catch(err => {
    console.log('err:', err)
  })
};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
