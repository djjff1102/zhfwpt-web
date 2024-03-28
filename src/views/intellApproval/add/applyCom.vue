<template>
  <w-tabs type="card-gutter">
    <template #extra>
      <w-button type="primary">新增</w-button>
    </template>
    <w-tab-pane key="1" title="合同">
      hetong
    </w-tab-pane>
    <w-tab-pane key="2" title="订单">
      订单
    </w-tab-pane>
    <w-tab-pane key="3" title="发票">
      发票
    </w-tab-pane>
    <w-tab-pane key="4" title="仓储">
      仓储
    </w-tab-pane>
    <w-tab-pane key="5" title="银行流水">
      银行流水
    </w-tab-pane>
  </w-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const form = ref({
  name: '',
  post: '',
  isRead: false,
})

</script>

<style lang="scss" scoped>
:deep(.w-tabs-nav-tab-list) {
  width: 94%;
  height: 48px;
  display: flex !important;
}
:deep(.w-tabs-tab) {
  font-weight: 400;
  color: #6A6A6A;
  flex: 1;
  display: flex;
  justify-content: center;
  text-align: center;
  border: none;
  border-top: solid 2px #fff;
  border-bottom: solid 2px rgba(237, 241, 252, 0.5);
  background: linear-gradient( 180deg, rgba(21, 118, 242, 0)  0%, rgba(209, 229, 254, 0.1) 100%);
  &:hover {
    background: linear-gradient( to bottom,rgba(21,118,242,0) 0%, rgba(21, 118, 242, 0.1) 100%,);
  }
}
:deep(.w-tabs-tab-active, .w-tabs-tab-closable) {
  font-weight: 500;
  color: #3470FF;
  border-top: solid 2px rgba(52, 112, 255, 1);
  border-bottom: solid 2px rgba(237, 241, 252, 0);
  background: linear-gradient( to bottom,rgba(21,118,242,0) 0%, rgba(21, 118, 242, 0.1) 100%,);
}
:deep(.w-tabs-content) {
  border: none;
}
:deep(.w-tabs-nav) {
  position: static;
}
</style>

