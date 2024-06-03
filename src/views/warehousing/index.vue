<template >
  <div class="warehousing">
    <Warehousing v-if="currentCom == 'Warehousing'"></Warehousing>
    <Logistics v-if="currentCom == 'Logistics'"></Logistics>
    <MyRelation v-if="currentCom == 'MyRelation'"></MyRelation>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import Warehousing from './Warehousing.vue'
import MyRelation from './MyRelation.vue'
import Logistics from './Logistics.vue'
import { useRoute } from 'vue-router';
const route = useRoute()

const currentCom = ref('')

watch(() => route.name, (v)=> {
  currentCom.value = v
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
