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
      type: 'shadow',
      // lineStyle: {
      //   type: 'solid',
      //   width: 36, // 设置阴影的宽度
      //   color: 'rgba(236, 238, 245, 0.7)', // 设置阴影的颜色和透明度
      // }
    }
  },
  legend: {},
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: ['经营备案', '物流仓储', '合同数据风险', '风险', '票据政务风险', '超限量申请风险'],
      axisTick: {
        //y轴刻度线
        show: false,
      },
      axisLine: {
        //轴线
        // show: true,
        lineStyle: {
          color: "#ccc",
        },

      },
      axisLabel: {
        textStyle: {
        color: '#6A6A6A',// x轴字体颜色
        interval: 5//轴显示所有的数据
      }
    },
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine :{    //网格线
        lineStyle:{
          color: 'rgba(82, 100, 122, 0.2)',
            type:'dashed'    //设置网格线类型 dotted：虚线   solid:实线
        },
        show:true //隐藏或显示
      }
    }
  ],
  series: [
    {
      name: '高风险',
      type: 'bar',
      stack: 'Ad',
      barWidth: 18,
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
