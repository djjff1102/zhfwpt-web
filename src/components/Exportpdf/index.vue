<template>
  <div>
    <el-button type="text" @click="exportPDF">导出PDF</el-button>
  </div>
</template>
 
<script setup>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const props = defineProps({
  domId: {
    default: ''
  },
  title: {
    default: ''
  }
})
const loading = ref(false)

async function exportPDF() {
  if(loading.value) return;
  loading.value = true
  const element = document.getElementById(props.domId);
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  });

  const imgProps= pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth, pdfHeight);
  pdf.save(`${props.title}.pdf`);
   loading.value = false
}
</script>