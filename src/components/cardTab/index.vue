<template>
  <w-tabs :default-active-key="defaultActive" type="card-gutter" @tab-click="handleTabClick" >
    <w-tab-pane
      v-for="(item) in Object.keys(tabData)"
      :key="tabData[item]?.key">
      <template #title>
        <div class="tab-item">{{ tabData[item]?.name }}
          <img v-if="tabData[item]?.status == 1" class="success-img" src="@/assets/base/success.svg">
          <div v-if="tabData[item]?.status == 2" class="file-error">附件有误</div>
        </div>
      </template>
    </w-tab-pane>
  </w-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  showExtra: {
    type: Boolean,
    default: false
  },
  defaultKey: {
    type: String,
    default: '1'
  },
  tabData: {
    default: {}
  }
});

const emits = defineEmits(['handleTab']);

const defaultActive = ref(props.defaultKey) // 默认打开的tab

// 切换tab
function handleTabClick(value) {
  emits('handleTab', value)
}

</script>

<style lang="scss" scoped>
.tab-item {
  position: relative;
}
.success-img {
  position: absolute;
  top: 50%;
  transform: translate(8px, -50%);
}
.file-error {
  position: absolute;
  top: -25%;
  left: 80%;
  width: 72px;
  height: 28px;
  background: #F76161;
  border-radius: 14px;
  border: 1px solid #FFFFFF;
  color: #fff;
  font-size: 12px;
  line-height: 28px;
}
:deep(.w-tabs-nav-tab-list) {
  width: 100%;
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
    background: linear-gradient( to top,rgba(21,118,242,0) 0%, rgba(21, 118, 242, 0.1) 100%,);
  }
}
:deep(.w-tabs-tab-active, .w-tabs-tab-closable) {
  font-weight: 500;
  color: #3470FF;
  border-top: solid 2px rgba(52, 112, 255, 1);
  border-bottom: solid 2px rgba(237, 241, 252, 0);
  background: linear-gradient( to top,rgba(21,118,242,0) 0%, rgba(21, 118, 242, 0.1) 100%,);
}
:deep(.w-tabs-content) {
  border: none;
}
:deep(.w-tabs-nav) {
  position: static;
}
</style>

