<template>
  <div class="no-match">
    <img :src="noMath" alt="" />
    <span class="text-#BFC4CD">没有匹配的搜索结果</span>
  </div>
</template>
<script setup>
import noMath from "@/assets/images/no-match.png";
</script>
<style lang="scss">
.no-match {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  img {
    width: 250px;
  }
}
</style>
