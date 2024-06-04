<template>
  <div class="warehouse-detail">
    <BaseCom :data="data[0]"></BaseCom>
    <BaseDescript></BaseDescript>
  </div>
</template>

<script setup>
import BaseCom from "./components/BaseCom.vue";
import BaseDescript from './components/BaseDescript.vue'
import { data } from './data'

</script>

<style lang="scss" scoped>
.warehouse-detail {
  width: 1100px;
  margin: 0 auto;
}
</style>