<template>
   <el-transfer
      v-model="checkedValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="['key']"
      :right-default-checked="['2']"
      :titles="['Source', 'Target']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :data="data"
      @change="handleChange"
    >
    </el-transfer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const data = ref([
  {
    label:'label',
    key:'key',
  },
  {
    label:'label2',
    key:'2',
  }
])

const checkedValue = ref([])


function handleChange() {

}
</script>