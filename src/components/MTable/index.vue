<template>
  <w-table v-bind="$attrs" :show-overflow-tooltip="true">
    <template v-slot:empty>
      <NoData></NoData>
    </template>
    <template v-for="slot in Object.keys(slots)" :key="slot" v-slot:[slot]="cell">
      <slot :name="slot" v-bind="cell"></slot>
    </template>
  </w-table>
</template>
<script setup>
import { useSlots, useAttrs } from "vue";
const slots = useSlots();
</script>
<style lang="">
</style>
