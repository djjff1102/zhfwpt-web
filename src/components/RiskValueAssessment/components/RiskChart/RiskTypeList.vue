<template>
  <div class="riskChart" id="riskTypeChart">
    <!-- <img src="@/assets/base/empty.png" class="empty-img"> -->
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, reactive } from "vue";

const props = defineProps({
  riskData: {
    default: 0
  },
  leval: { // 1高风险 2 中风险 3低风险
    default: -1
  }
})

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '高风险',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      color: '#F76161',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '中风险',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      color: '#FF9100',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '低风险',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      color: '#5ECF69',
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
})


// watch(
//   () => props.riskData,
//   (d) => {
//     init();
//   }
// );

onMounted(() => {
  init();
  nextTick(() => {
    window.addEventListener('resize', handleResize);
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})

function handleResize() {
  const chart = echarts.getInstanceByDom(document.getElementById('riskTypeChart'));
  if (chart) {
    chart.resize();
  }
}

function init() {
  const riskDom = document.querySelector("#riskTypeChart");
  const riskChart = echarts.init(riskDom, null, {
    width: "auto",
    height: "240",
  });
  riskChart.setOption(option.value);
}

</script>
<style lang="scss">
.empty-img {
  width: 256px;
  display: block;
  margin-top: 40px;
}
</style>
