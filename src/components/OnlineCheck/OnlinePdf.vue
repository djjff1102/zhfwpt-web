<template>
  <div>
    <w-button>在先查看pdf</w-button>
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