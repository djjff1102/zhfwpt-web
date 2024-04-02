<template>
  <div>
    <el-button v-loading.fullscreen.lock="loading" type="text" @click="exportPDF">导出PDF</el-button>
   
  </div>
</template>
 
<script setup>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';

const props = defineProps({
  domId: {
    default: ''
  },
  pointId: {
    default: ''
  },
  title: {
    default: ''
  }
})

const emits = defineEmits(['handleExport'])

const loading = ref(false)

async function exportPDF() {
  if(loading.value) return;
  loading.value = true;
  emits('handleExport', true)
  nextTick(async() => {
    const element = document.getElementById(props.domId);
    const canvas = await html2canvas(element, { scale: 2 });
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
    emits('handleExport', false)
    loading.value = false
  });
}

// function exportPDF() {
//   if(loading.value) return;
//   loading.value = true
//   emits('handleExport', true)
//   nextTick(async() => {
//     const content = document.getElementById(props.domId);
//     // 设置导出选项
//     const options = {
//       margin: 10,
//       pagebreak: {avoid: '.pagebreak'},
//       filename: `${props.title}.pdf`,
//       image: { type: 'jpeg', quality: 1 },
//       html2canvas: { scale: 3 },
//       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };
//     // 将内容导出为 PDF
//     html2pdf().from(content).set(options).save();
//     emits('handleExport', false)
//     loading.value = false
//   })
// }
</script>