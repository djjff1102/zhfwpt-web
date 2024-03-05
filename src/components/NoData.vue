<template>
  <div class="no-data">
    <img :src="noData" alt="" />
    <span class="text-#BFC4CD">暂无数据</span>
  </div>
</template>
<script setup>
import noData from "@/assets/images/no-data.png";
</script>
<style lang="scss">
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
