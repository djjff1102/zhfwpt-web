<template>
  <div class="area mb-12px">
    <span class="label">{{ title }}：</span>
    <div class="label-value area-list">
      <span class="area-tag" :class="{'active': !cur}" @click="handleSearch">全部</span>
      <span 
        v-for="(item, i) in dataList"
        :key="i" 
        class="area-tag"
        :class="{'active': cur === item.key }"
        @click="handleSearch(item)"
      >{{ item.value }}
        <span v-if="extraContent">({{ formatNumber(item.extra) }})</span>
      </span>
      <w-popover
        v-model:popup-visible="showPopover"
        placement="bottom"
        trigger="click">
        <template #content>
          <input-range :selectForm="selectForm" @update="update"></input-range>
        </template>
        <span
          v-if="customFun && customFunType == 'number' && !selectForm.start && !selectForm.end"
          class="area-tag"
          :class="{'active': cur === 'custom' }"
          @click="cur='custom'"
        >自定义</span>
      </w-popover>
      <span 
        v-if="customFun && (selectForm.start || selectForm.end)"
        :class="{'active': cur === 'custom' }"
        @click="showPopover = true">
        <span v-if="selectForm.start && selectForm.end">{{ selectForm?.start }} - {{ selectForm?.end }}</span>
        <span v-if="!selectForm.start && selectForm.end">{{ selectForm?.end }}以内</span>
        <span v-if="selectForm.start && !selectForm.end">{{ selectForm?.end }}以上</span>
      </span>
      <span
        v-if="customFun && customFunType == 'date' && cur != 'customdate' && !dateValue"
        class="area-tag"
        :class="{'active': cur === 'customdate' }"
        @click="handleShowDate"
      >自定义</span>
      <el-date-picker
        ref="datePickRef"
        v-if="customFun && customFunType == 'date' && cur == 'customdate'"
        style="height: 22px"
        v-model="dateValue"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleDateSelect"
        @blur="handleBlur"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script setup>
import { formatNumber } from '@/utils/common'
import { watch } from 'vue'

const datePickRef = ref()
const dateValue = ref('') // 时间
const dataList = ref([])
const cur = ref('')
const selectForm = ref({
  start:'',
  end: ''
})
const showPopover = ref(false)

const props = defineProps({
  list: {
    default: []
  },
  title: {
    default: '标题'
  },
  transformLabel: {
    default: {}
  },
  extraContent: { // 额外显示的内容
    default: false
  },
  customFun: { // 是否需要自定义功能
    default: false
  },
  customFunType: { // 自定义功能类型  number、date
    default: ''
  }
})

const emits = defineEmits(['updateSeach'])

watch(() => props.list, (v) => {
  if(JSON.stringify(props.transformLabel) != '{}' && v) {
    formateList(v)
  } else if(JSON.stringify(props.transformLabel) == '{}' && v) {
    dataList.value = v
  }
}, {
  deep: true,
  immediate: true
})

// 时间选择框失去焦点
function handleBlur() {
  if(!dateValue.value) {
    cur.value = ''
  }
}

// 选择完日期
function handleDateSelect() {
  if(!dateValue.value) { // 清除时间，默认选择到全部
    cur.value = ''
    const item = {
      start: '',
      end: '',
    }
    emits('updateSeach', item, 0) // 第二个参数，针对成立时间，0是创建时间段  1是时间范围
  } else {
    emits('updateSeach', {
      start: dateValue.value[0],
      end: dateValue.value[1]
    }, 1) // 第二个参数，针对成立时间，0是创建时间段  1是时间范围
  }
}

// 点击自定义-弹出日期框
function handleShowDate() {
  console.log('11111111111111')
  cur.value ='customdate'
  nextTick(() => {
    datePickRef.value.focus()
  })
 
}

// 确认注册资本
function update(data) {
  selectForm.value = data;
  showPopover.value = false
  if(!data.start && !data.end) {
    cur.value = ''
  }
}

// 数据规范化
function formateList(d) {
  let arr = []
  d.forEach(item => {
    let v = props.transformLabel.value
    let k = props.transformLabel.key
    let e = props.transformLabel.extra
    let curItem = {
      value: item[v],
      key: item[k],
      extra: item[e]
    }
    arr.push(curItem)
  });
  dataList.value = arr
}

function handleSearch(item) {
  dateValue.value = ''
  if(item) {
    cur.value = item.key
  } else {
    cur.value = ''
  }
  emits('updateSeach', item, 0) // 第二个参数，针对成立时间，0是创建时间段  1是时间范围
}
</script>

<style lang="scss" scoped>
:deep(.el-range__icon) {
  display: none;
}
.area {
  display: flex;
}
.area-list {
  width: calc(100% - 100px);
  display: flex;
  flex-wrap: wrap;
}
.area-tag {
  cursor: pointer;
  margin-right: 16px;
  margin-bottom: 5px;
  &:nth-last-child(1) {
    margin-right: 0;
  }
}
.label {
  display: inline-block;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
  line-height: 22px;
  width: 94px;
  text-align: right;
}
.label-value {
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  color: #6a6a6a;
  line-height: 22px;
}
.active {
  color: rgba(52, 112, 255, 1);
}
</style>
