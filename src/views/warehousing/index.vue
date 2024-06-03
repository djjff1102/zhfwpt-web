<template >
  <div class="warehousing">
    <Warehousing
      v-if="currentCom == 'Warehousing' ||currentCom == 'Logistics'"
      :data="curData"
      :type="currentCom"
      ></Warehousing>
    <MyRelation v-if="currentCom == 'MyRelation'" :data="curData"></MyRelation>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import Warehousing from './Warehousing.vue'
import MyRelation from './MyRelation.vue'
import { data } from './data'
import { useRoute } from 'vue-router';
const route = useRoute()

const currentCom = ref('')
const curData = ref()

watch(() => route.name, (v)=> {
  currentCom.value = v
  if(v == 'Warehousing') {
    curData.value = data[0]
  } else if(v == 'Logistics') {
    curData.value = data[1]
  } else {
    curData.value = data
  }
}, {
  immediate: true
})

</script>
<style lang="scss">
.warehousing {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
}
</style>
