<template>
  <div>
   <el-transfer
      v-model="checkedValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[]"
      :right-default-checked="rightDefaultChecked"
      :titles="['全选', '全选']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :props="transferProps"
      :data="dataList"
      @change="handleChange"
      @right-check-change="rightCheckChange"
    >
      <template #default="{option}">
        <span>{{ option[transferProps.key] }} - {{ option[transferProps.label] }}</span>
      </template>
      <template #left-footer>
        <!-- <w-button v-if="total == dataList.length" type="primary" size="small" @click="loadMore">继续加载</w-button>
        <span v-else>已加载完</span> -->
      </template>
    </el-transfer>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  dataList: {
    default: []
  },
  transferProps: {
    default: {}
  },
  rightDefaultChecked: {
    default: []
  },
  total: {
    default: 0
  }
})

const emits = defineEmits(['updateChecked', 'load'])

const checkedValue = ref([])

// 右侧数据选中、取消时触发--本次采用这种方式
// 返回选中的数据
function rightCheckChange(v) {
  emits('updateChecked', v)
}

function loadMore() {
  emits('load')
}

// 右侧穿梭框的数据变化触发
function handleChange(v) {}
</script>