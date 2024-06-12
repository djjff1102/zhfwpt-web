<template>
  <el-date-picker
    v-model="monthRange"
    type="monthrange"
    range-separator="到"
    start-placeholder="开始月份"
    end-placeholder="结束月份"
    value-format="YYYY-MM-DD"
    :clearable="false"
    :shortcuts="shortcuts"
    :popper-options="{
        modifiers: [
            {
                name: 'flip',
                options: {
                    fallbackPlacements: ['bottom'],
                    allowedAutoPlacements: ['bottom'],
                }
            }
        ]
    }"
    width="300px"
    @change="changeMonth"
  />
</template>

<script setup>
import { ref, } from 'vue';
import dayjs from "dayjs"

const emits = defineEmits(['hanleMonth'])

const shortcuts = ref([
  {
    text: '近一年',
    value: () => {
      const now = dayjs();
      const twelveMonthsAgo = now.subtract(11, 'month');
      return [ twelveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    }
  },
  {
    text: '近半年',
    value: () => {
      const now = dayjs();
      const fiveMonthsAgo = now.subtract(5, 'month');
      return [ fiveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    },
  },
  {
    text: '今年至今',
    value: () => {
      const firstday = dayjs().startOf('year')
      const now = dayjs();
      return [ firstday.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
    },
  },
])
const monthRange = ref('') // 时间月份

// 切换时间
function changeMonth(v) {
  emits('hanleMonth', [dayjs(monthRange.value[0]).startOf('month').format('YYYY-MM-DD'), dayjs(monthRange.value[1]).endOf('month').format('YYYY-MM-DD')])
}

const now = dayjs();
const twelveMonthsAgo = now.subtract(11, 'month');
monthRange.value = [ twelveMonthsAgo.format('YYYY-MM-DD'), now.format('YYYY-MM-DD') ]
</script>