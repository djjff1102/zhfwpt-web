<template>
  <div>
    <div class="flex-base-start">
      <span class="input-label">从</span>
      <el-input v-model="form.start" @change="validateStart" style="width: 97px; height: 24px"/>
      <span class="input-label">-</span>
      <el-input v-model="form.end" @change="validateEnd" style="width: 97px; height: 24px"/>
    </div>
    <div class="operate-btn flex-base-end">
      <el-button style="width: 41px;height:22px" @click="reset">重置</el-button>
      <el-button type="text" style="width: 41px;height:22px" @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  selectForm: {
    deafault: {
      start:'',
      end: ''
    }
  }
})

// 监听是否有传入的值
watch(() => props.selectForm, (v) => {
  if(v.start || v.end) {
    nextTick(() => {
      form.value = JSON.parse(JSON.stringify(v))
    })
  }
}, {
  deep: true,
  immediate: true
})

const emits = defineEmits(['update'])

const numberRegex = /^\d+(\.\d+)?$/; // 匹配整数或带有小数的数字

const form = ref({
  start: '',
  end: ''
})

// 确认
function confirm() {
  if(form.value.start && form.value.end && form.value.start > form.value.end) {
    let end = form.value.end;
    form.value.end = form.value.start
    form.value.start = end
  }
  emits('update', form.value)
}

function reset() {
  form.value.start = ''
  form.value.end = ''
}

function validateStart() {
  if(!numberRegex.test(form.value.start)) {
    form.value.start = '';
  } else {
    form.value.start = Number(form.value.start);
  }
}

function validateEnd() {
  if(!numberRegex.test(form.value.end)) {
    form.value.end = '';
  } else {
    form.value.end = Number(form.value.end);
  }
}
</script>

<style scoped>
.operate-btn {
  margin-top: 12px;
}
.input-label {
  display: inline-block;
  padding: 0 8px;
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #383B40;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}
:deep(.el-button--default) {
  color: rgba(153, 153, 153, 1);
}
:deep(.el-button--text) {
  color: rgba(52, 112, 255, 1);
}
:deep(.el-button) {
  border: none !important;
}
:deep(.el-button:hover) {
  background: rgba(0,0,0,0) !important;
}

</style>