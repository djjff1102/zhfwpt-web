<template>
  <div class="ratio card">
    <TitleCom title-text="企业信用占比"></TitleCom>
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="chart" id="ratioChart"></div>
      </el-col>
      <el-col :span="16">
        <div class="table">
          <el-tabs v-model="tabsValue" type="card" :before-leave="beforeLeave">
            <el-tab-pane label="高风险指标" :key="1" :name="1">
            </el-tab-pane>
            <el-tab-pane label="中风险指标" :key="2" :name="2">
            </el-tab-pane>
            <el-tab-pane label="低风险指标" :key="3" :name="3">
            </el-tab-pane>
          </el-tabs>
          <div class="list-row list-row-header" >
            <div class="list-column"
              :class="'column'+i" 
              v-for="(item, i) in columns"
              :key="item.index"
              :style="{'width': (item.width || autoWidth ) +'px'}">{{  item.title }}</div>
          </div>
          <div ref="listwrap" class="table-list-wrap">
            <div 
              class="list-row"
              v-for="(row, i) in tableData"
              :key="i"
              v-infinite-scroll="handleInfiniteOnLoad"
              :infinite-scroll-immediate-check="false"
              :infinite-scroll-disabled="scrollDisabled"
              :infinite-scroll-watch-disabled="scrollDisabled"
              :infinite-scroll-distance="20">
              <div 
                v-for="(item, j) in columns" 
                :key="item.index"
                class="list-column"
                :class="'column'+j"
                :style="{'width': (item.width || autoWidth ) +'px'}">
                  <span v-if="j === 0">{{ i+1 }}</span>
                  <!-- <el-button type="text" v-else-if="j === columns.length - 1" @click="toDetail(row)">详情</el-button> -->
                  <span v-else>
                    <span v-if="row[item.dataIndex] && (checkWith(item.width) < row[item.dataIndex].length)">
                      <w-tooltip>
                        <span v-if="item.slotName && item.slotName == 'riskCompanyName'">
                          <el-button type="text" @click="toDetail(row)">{{ row[item.dataIndex].substring(0, checkWith(item.width)) }}...</el-button>
                        </span>
                        <span v-else>{{ row[item.dataIndex].substring(0, checkWith(item.width)) }}...</span>
                        <template #content>{{ row[item.dataIndex] }}</template>
                      </w-tooltip>
                    </span>
                    <span v-else>
                      <span v-if="item.slotName && item.slotName == 'riskCompanyName'">
                        <el-button type="text" @click="toDetail(row)">{{ row[item.dataIndex] }}</el-button>
                      </span>
                      <span v-else>{{ row[item.dataIndex] }}</span>
                    </span>
                  </span>
              </div>
            </div>
            <div class="load-end" v-if="scrollDisabled && tableData.length > 0">全部加载</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as echarts from "echarts";
import { pieOption } from "../option";
import TitleCom from '@/components/TitleCom.vue';
import { riskIndicator } from '@/api/riskmonitor'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
  riskData: {}
})

watch(() => props.riskData, (v) => {
  if(v) {
    nextTick(() => {
      const option = pieOption()
      option.series[0].data[0].value = v.high.count || 0
      option.series[0].data[1].value = v.middle.count || 0
      option.series[0].data[2].value = v.low.count || 0
      const ratioDom = document.getElementById("ratioChart"); // 风险占比
      const ratioChart = echarts.init(ratioDom, null, {
        width: "auto",
        height: '260'
      });
      ratioChart.setOption(option);
    })
  }
}, {
  deep: true
})

const listwrap = ref()
const tabsValue = ref(1)
const tableData = ref([])
const columns = reactive([
  {
    title: "序号",
    width: '80',
  },
  {
    title: "风险分类",
    dataIndex: "secondCategory",
    width:'140',
  },
  {
    title: "风险细则名称",
    dataIndex: "name",
  },
  {
    title: "涉风险企业",
    dataIndex: "riskCompanyName",
    slotName: 'riskCompanyName'
  },
]);
const searchPar = ref({
  page_size: 10,
  page: 1,
  riskIndexLevel: 1
})
const loading = ref(false)
const total = ref(0)
const autoWidth = ref(0) // 没有定义宽的列，实时监听获取宽度

watch(() => tabsValue.value, (v) => {
  tableData.value = []
  total.value = 0
  searchPar.value.page = 1
  searchPar.value.riskIndexLevel = v;
  getriskIndicator()
})

// 跳转公司详情
function toDetail(d) {
  router.push({ 
    path: '/riskMonitoring/detail', 
    query: {
      companyId: d.riskCompanyId,
      companyName: d.riskCompanyName,
      type: 'risk'
    }
  });
}

// 加载全部
const scrollDisabled = computed(() => {
  return tableData.value.length >= total.value;
})

function handleInfiniteOnLoad() {
  if(loading.value || scrollDisabled.value ) return;
  searchPar.value.page += 1;
  getriskIndicator()
}

function checkWith(w) {
  w = w || autoWidth.value;
  let n = Math.floor((w - 24) / 16)
  return n -1
}

// 数据加载中禁止切换
function beforeLeave(d) {
  if(loading.value) return false;
}


function getriskIndicator() {
  if(loading.value) return;
  loading.value = true;
  riskIndicator(searchPar.value).then(res => {
    tableData.value.push(...res.data)
    total.value = res.total;
    loading.value = false
  }).catch(err => {
    loading.value = false
    console.log('整体概况企业风险指标分页查询，异常：', err)
  })
}

function getTableWidth() {
  autoWidth.value = (listwrap.value.clientWidth - 220) / 2
}

onMounted(() => {
  window.addEventListener('resize', getTableWidth)
  getTableWidth()
});

getriskIndicator()
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
}
.table-list-wrap {
  height: 200px;
  overflow-y: scroll;
}
.list-row {
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color:#383B40;
  height: 42px;
  border-bottom: 1px solid var(--color-neutral-3);
  &:hover {
    background: rgba(0,0,0,0.02);
  }
}
.list-row-header {
  background: #eef6ff;
  border-bottom: none;
}
.list-column {
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 12px;
}

.ratio {
  .ratio-content {
    display: flex;
  }
}
.load-end {
  color: #383B40;
  text-align: center;
  padding-top: 12px;
}

</style>
