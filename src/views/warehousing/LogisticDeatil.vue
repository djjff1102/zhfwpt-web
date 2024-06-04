<template>
  <div class="warehouse-detail">
    <BaseCom :data="data[1]"></BaseCom>
    <BaseDescriptLogistic></BaseDescriptLogistic>
  </div>
</template>

<script setup>
import BaseCom from "./components/BaseCom.vue";
import BaseDescriptLogistic from './components/BaseDescriptLogistic.vue'
import { data } from './data'

</script>

<style lang="scss" scoped>
.warehouse-detail {
  width: 1100px;
  margin: 0 auto;
}
</style>