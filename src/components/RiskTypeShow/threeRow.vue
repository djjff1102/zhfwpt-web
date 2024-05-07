<template>
  <div>
    <w-tooltip placement="bottom" :width="800">
      <div class="three-row">{{ info || '暂无'}}</div>
      <template #content>
        <div class="tip-content">{{info}}</div>
      </template>
    </w-tooltip>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    default: ''
  }
})
</script>
<style scoped>
.three-row {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;/*省略几行写几*/
    -webkit-box-orient: vertical;
    cursor: pointer;
}
.tip-content {
  max-height: 400px;
  overflow-y: scroll;
  font-size: 12px;
  line-height: 18px;
}
</style>