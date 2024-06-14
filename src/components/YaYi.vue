<template>
  <Teleport to="body">
    <div @click="toYayi">
      <img src="@/assets/yayi.png" style="width: 24px">
    </div>
  </Teleport>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getKnowledgeId } from '@/api/yayi'

const route = useRoute()

function toYayi() {
  let reportId = route.query.id
  const data = {}
  if(reportId) {
    data.reportId = reportId
    data.knowledgeType = 1 // 发票智能审批
  } else {
    data.knowledgeType = 0 // 大宗政策
  }

  getKnowledgeId(data).then(res => {
    if(res.data.yayitoken && res.data.knowledgeId) {
      let result = res.data;
      let base = 'http://dzmy-dev.quesoar.com:20000/knowledge/#/knowledge/'
      let url = `${base}${result.knowledgeId}?token=${encodeURIComponent(result.yayitoken)}&type=${data.knowledgeType}`
      window.open(url, '_blank');
    } else {
      ElMessage.warning(res.data)
    }
  }).catch(err => {
    console.log('获取用户token失败')
  })
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