<template>
  <div class="notice-popover-content">
    <div class="notice-item" v-for="item in [1,2,3,4,5,6,7,8]" :key="item">
      <span>待审批</span> -
      <span>CXL23232莱佛金属（天津）有限公司测试测试测试测试测试测试</span>
    </div>
    <div class="no-more">-- 暂无更多 --</div>
  </div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.notice-popover-content {
  padding: 24px 16px 8px;
  height: 300px;
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
  .notice-item span:first-child { 
    color: #0594EB;
  }
  .notice-item:first-child {
    margin-top: 0;
  }
  .no-more {
    text-align: center
  }
}
</style>
