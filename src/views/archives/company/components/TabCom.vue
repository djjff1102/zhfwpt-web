<template>
  <div class="tab-wrap">
    <div
      class="tab-item" 
      :class="[item.disable ? 'disable-tab' : 'enable-tab', modelValue == i ? 'active-tab' : '']"
      v-for="(item, i) in TabData"
      :key="item.name"
      @click="handleTab(item, i)"
    >{{ item.name }}</div>
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
  if(props.loading) return // 加载中禁止切换
  emits("update:modelValue", i);
  emits('updateTable', item ,i)
}
</script>

<style lang="scss">
.tab-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.tab-item {
  padding: 8px 24px;
  font-weight: 400;
  font-size: 16px;
  color: #6A6A6A;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  background: #F8F8F8;
  border-radius: 4px;
  margin-right: 12px;
  line-height: 22px;
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
