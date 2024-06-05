<template>
  <Teleport to="body">
    <div @click="toYayi">
      <img src="@/assets/yayi.png" style="width: 24px">
    </div>
  </Teleport>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'

function toYayi() {
  window.open('http://localhost:7030/file#/knowledge/1795632897803874305', '_blank');
}

</script>

<style lang="scss" scoped>
div {
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>