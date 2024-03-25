<template>
   <el-backtop :target="target" :right="40" :bottom="100">
    <div class="back-top">
      <el-icon><ArrowUp /></el-icon>
      <span class="top-text">TOP</span>
    </div>
   </el-backtop>
</template>

<script lang="ts" setup>
const props = defineProps({
  target: {
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.back-top {
  height: 64px;
  width: 54px;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  color: #1989fa;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #000;
  &:hover {
    color: rgba(52, 112, 255, 1);
  }
  &:active {
    color: rgba(19, 70, 192, 1);}
}
.top-text {
  display: block;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-align: center;
  // margin-top: -8px;
}
</style>