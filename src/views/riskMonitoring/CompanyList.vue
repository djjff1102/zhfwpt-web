<template>
  <div class="attention">
    <!-- 只查询授权公司isAuthCompany  企业信用等级type-->
    <Rank :isAuthCompany="'1'"></Rank>
  </div>
</template>

<script lang="ts" setup>
// 导出
//  function handleExport() {
//   if(loadingExport.value) return
//   loadingExport.value = true
//   const data = {
//     companyName: searchPar.value.companyName,
//     approveStatus: searchPar.value.approveStatus,
//     startTime: searchPar.value.startTime,
//     endTime: searchPar.value.endTime
//   }
//   riskExport(data).then(res => {
//     exportBlob(res);
//     loadingExport.value = false
//   }).catch(err => {
//     loadingExport.value = false
//   })
// }

// // 导出
// function exportBlob(b: any) {
//   const now = dayjs().format('YYYY-MM-DD');
//   const fileName = `风险-${now}`
//   const typeValue = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//   const blob = new Blob([b.data], { type: typeValue});
//   const a = document.createElement('a');
//   a.download = fileName;
//   a.href = URL.createObjectURL(blob);
//   a.style.display = 'none';
//   document.body.appendChild(a);
//   a.click();
//   URL.revokeObjectURL(a.href);
//   document.body.removeChild(a);
// }
</script>

<style lang="scss" scoped>
.attention {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
}
</style>

