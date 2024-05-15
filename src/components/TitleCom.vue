<template>
  <div class="title">
    <div>{{ titleText }}</div>
    <slot name="dateRange">
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  titleText: {
    default: '标题'
  }
})
</script>


<style scoped lang="scss">
.title {
  position: relative;
  padding: 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
</style>