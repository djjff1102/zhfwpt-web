<template>
  <div>
    <span v-if="!results || results.length==0"></span>
    <w-popover v-else>
      <template #content>
        <div v-for="(item, i) in results" :key="i">{{i+1}}、{{item}}</div>
      </template>
      <span style="cursor: pointer;">{{ getMaterial() }}</span>
    </w-popover>
  </div>
</template>

<script setup>
const props = defineProps({
  results: {
    default: []
  }
})

function getMaterial() {
  let str = ''
  props.results.forEach(item => {
    str += item
  })
  if(str.length > 5) {
    return str.substring(0,5) + '...'
  } else {
    return 22
  }
}
</script>
<style lang="scss">
.w-popover-popup-content {
    color: #fff;
    background-color: rgba(0, 0, 0, 1);
}
.w-popover-popup-arrow {
  background-color: rgba(0, 0, 0, 1);
}
</style>
