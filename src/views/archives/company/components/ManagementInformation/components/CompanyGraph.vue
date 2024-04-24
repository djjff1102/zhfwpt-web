<template>
  <div>
    <guquan id="companyGid"></guquan>
    </div>
</template>
<script setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { getenterpriseMapQuery } from '@/api/archives'

const props = defineProps({
  companyName: {
    default: ''
  },
  companyId: {
    default: ''
  }
})

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
  getenterpriseMapQuery({
    companyId: '04bbe3814ee17efb0d2e3e0b3b1ed2c4'
  }).then(res => {

  }).catch(err => {})
};
</script>

<style lang="scss" scoped>
.container {
}
.table-warp {
  height: calc(100% - 100px);
}
</style>
