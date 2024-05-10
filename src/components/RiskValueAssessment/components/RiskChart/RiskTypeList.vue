<template>
  <div class="riskChart" id="riskTypeChart" style="height: 240px">
    <NoData></NoData>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, reactive } from "vue";

const props = defineProps({
  riskTypeChart: {
    default: {
      x: [],
      y: []
    }
  }
})

watch(
  () => props.riskTypeChart,
  (v) => {
    if(v && v.x && v.x.length > 0) {
      nextTick(() => {
        option.value.series[0].data = v.y[0];
        option.value.series[1].data = v.y[1];
        option.value.series[2].data = v.y[2];
        option.value.xAxis[0].data = v.x;
        init()
      })
    }
  }, {
    deep: true
  }
);

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
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
      data: [],
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
      data: [1,2,3],
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
      data: []
    },
    {
      name: '中风险',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      color: '#FF9100',
      data: []
    },
    {
      name: '低风险',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series'
      },
      color: '#5ECF69',
      data: []
    }
  ]
})


onMounted(() => {
  // init();
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
