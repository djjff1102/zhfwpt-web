<template>
  <div class="tab-wrap">
    <div
      class="tab-item" 
      :class="[!item.hasValue ? 'disable-tab' : 'enable-tab', modelValue == item.itemCode ? 'active-tab' : '']"
      v-for="(item, i) in TabData"
      :key="item.itemCode"
      @click="handleTab(item, i)"
    >{{ item.itemName }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  TabData: {
    default: []
  },
  modelValue: {
    type: [String, Number],
  },
  loading: {
    defaultL: false
  }
})

const emits = defineEmits(["update:modelValue", 'updateTable'])

function handleTab(item , i) {
  if(props.loading || !item.hasValue) return // 加载中禁止切换
  emits("update:modelValue", item.itemCode);
  emits('updateTable', item ,i)
}
</script>

<style lang="scss">
.tab-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.tab-item {
  // padding: 8px 24px;
  // font-size: 16px;
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 400;
  color: #6A6A6A;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: #F8F8F8;
  border-radius: 4px;
  margin-right: 12px;
  line-height: 22px;
  margin-bottom: 8px;
}

.enable-tab {
  cursor: pointer;
  &:hover {
    color: #3470FF;
  }
}

.active-tab {
  color: #3470FF;
}

.disable-tab {
  background: #F8F8F8;
  color: #B3B3B3;
}
</style>
