<template>
  <Teleport to="body">
    <div @mousedown="mouseDownHandler" :style="`right:${elRight}px;bottom:${elBottom}px`" v-hasPerm="btnApprovalCode.YYBtn" @click="toYayi" style="z-index: 999;">
      <img src="@/assets/yayi.png" style="width: 24px">
    </div>
  </Teleport>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { getKnowledgeId } from '@/api/yayi'
import { btnApprovalCode } from '@/router/permissionCode'

const route = useRoute();
const startclientX = ref(0); //记录开始的横坐标位置
const startclientY = ref(0); //记录开始的纵坐标位置
const elRight = ref(50); //定位-初始位置
const elBottom = ref(60); //定位-初始位置
let flag = false;//阻止拖拽时触发点击事件

// 处理鼠标按下事件
// 用户拖拽时触发
const mouseDownHandler = function(e) {
    // 获取到鼠标位置
    e.preventDefault && e.preventDefault();
    startclientX.value = e.clientX;
    startclientY.value = e.clientY;
    
    // 对document增加监听鼠标移动事件和鼠标松开事件
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
  let clientX = e.clientX;
  let clientY = e.clientY;
  //拖拽边界
  if(clientX<30)clientX = 30
  if(clientX > window.innerWidth - 40)clientX = window.innerWidth - 40
  if(clientY<30)clientY = 30
  if(clientY > window.innerHeight - 40)clientY = window.innerHeight - 40
  flag = true;
  let x = startclientX.value - clientX; // 计算偏移量
  let y = startclientY.value - clientY;
  elRight.value += x; // 实现拖拽元素随偏移量移动
  elBottom.value += y;
  startclientX.value = clientX;
  startclientY.value = clientY;
};

const mouseUpHandler = function() {
    // 取消对document对象的事件监听
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

function toYayi() {
  if(flag) {
    return flag = false
  }
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
      let base = import.meta.env.VITE_APP_YAYI_URL;
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
  bottom: 60px;
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