<template>
  <div>
    <el-button>在先查看pdf</el-button>
     <pdf :src="fileUrl"></pdf>
  </div>
</template>

<script setup>
// import pdf from 'vue-pdf';

const props = defineProps({
   fileUrl: {
    default: ''
  }
})

</script>