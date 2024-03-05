<template>
  <w-table v-bind="$attrs">
    <template v-slot:empty>
      <NoData></NoData>
    </template>
    <template v-for="slot in Object.keys(slots)" :key="slot" v-slot:[slot]>
      <slot :name="slot"></slot>
    </template>
  </w-table>
</template>
<script setup>
import { useSlots, useAttrs } from "vue";
const slots = useSlots();
</script>
<style lang="">
</style>
