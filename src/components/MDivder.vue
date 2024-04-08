<template>
  <!-- <el-divider> -->
  <div class="open-icon-bg">
    <img src="@/assets/base/openclose.svg">
    <span @click="handleOpen" class="text-[#3470FF] open-btn">
      {{ isOpen ? "收起" : "展开" }}<el-icon :class="[!isOpen?'more-icon':'close-more-icon']" style="margin-top: -4px"><DArrowRight /></el-icon>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, 40%);
}
.more-icon {
  margin-left: 8px;
  transform: rotate(90deg);
}
.close-more-icon {
  margin-left: 8px;
  transform: rotate(270deg);
}
</style>
