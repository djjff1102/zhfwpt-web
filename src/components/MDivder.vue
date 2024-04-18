<template>
  <!-- <el-divider> -->
  <div class="open-icon-bg">
    <img src="@/assets/base/openclose.svg" style="cursor: pointer;">
    <span class="text-[#3470FF] open-btn" @click="handleOpen">
      <spn style="line-height: 16px">{{ isOpen ? "收起" : "展开" }}</spn>
      <el-icon :class="[!isOpen?'more-icon':'close-more-icon']"><DArrowRight /></el-icon>
    </span>
  </div>
    
  <!-- </el-divider> -->
</template>

<script setup>
const props = defineProps({
  isOpen: {
    default: false
  }
})
const emits = defineEmits(['handleShow'])

function handleOpen() {
  emits('handleShow')
}
</script>

<style scoped lang="scss">
.open-icon-bg {
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
.open-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  padding: 12px 30px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
}
.more-icon {
  margin: 0 4px;
  transform: rotate(90deg);
}
.close-more-icon {
  margin: 0 4px;
  transform: rotate(270deg);
}
</style>
