<template>
  <div 
    ref="scrolldom"
    class="notice-popover-content">
    <div ref='innerDom' style="height: auto">
      <div class="notice-item" v-for="item in tableData" :key="item" @click="handleDetail(item)">
        <span :class="[roleLevel == 1 ? 'wait-status' : 'reject-status']">({{ roleLevel == 1 ? '待审批' : '驳回' }})</span> -
        <span class="notice-company">{{ item.companyName }}</span>
      </div>
      <div v-if="tableData.length == 0" class="no-more">暂无通知</div>
    </div>
    <div v-if="scrollDisabled" class="no-more">-- 暂无更多 --</div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useNoticeApprovalStore } from '@/store/modules/notice'

const noticeStore = useNoticeApprovalStore();

const tableData = computed(() => noticeStore.tableData)
const scrollDisabled = computed(() => noticeStore.scrollDisabled)
const roleLevel = computed(() => noticeStore.roleLevel) // 1税务 2企业

const scrolldom = ref();
const innerDom = ref()

function handleInfiniteOnLoad() {
  let scrollTop = scrolldom.value.scrollTop;
  let domH = innerDom.value.clientHeight;
  noticeStore.getNoticeApprovalList()
}

// 跳转详情页
function handleDetail(item: any) {
  noticeStore.toNoticeApprovalDetail(item)
}

onMounted(() => {
  scrolldom.value.addEventListener('scroll', handleInfiniteOnLoad)
  handleInfiniteOnLoad()
})
</script>
<style lang="scss" scoped>
.notice-company:hover {
  color: #1454EC;
}
.notice-popover-content {
  padding: 24px 16px;
  max-height: 300px;
  overflow-y: scroll;
  .notice-item {
    width:375px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    margin-top: 12px;
    padding: 0 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    &:hover {
      background: linear-gradient( 270deg, #EBF3FF 0%, #EBF3FF 100%);
    }
  }
  .wait-status {
    color: #0594EB;
  } 
  .reject-status {
    color: #F76161;
  }
  .notice-item:first-child {
    margin-top: 0;
  }
  .no-more {
    text-align: center
  }
}
</style>
