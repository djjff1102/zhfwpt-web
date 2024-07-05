<template>
  <div id="suggestdom">
    <div class="container-risk-wrap">
      <div class="chart">
        <RiskChart :riskData="riskData" :leval="riskOrCreditLevel" :colorStyle="colorStyle" :currentType="currentType"/>
      </div>
      <div class="information">
        <div class="suggest">
          <div class="icon flex-base-start">
            <span style="flex-grow: 1;" class="pinggu-suggest">
               <img :src="suggest" alt="" style="width: 64px"/>
              评估建议
            </span>
            <Exportpdf v-show="!exportFlag" domId="suggestdom" pointId="allPoint" :title="companyName+`信用值评估`" @handleExport="handleExport"></Exportpdf>
          </div>
          <div class="info">
            <p>
              本次评估分值为 <span class="risk-leval" :class="`leval-${currentType==1?riskOrCreditLevel:4 - riskOrCreditLevel}`">{{ riskData >=0 ? riskData : '--' }}</span>
              分，该分值处于<span class="risk-leval" :class="`leval-${currentType==1?riskOrCreditLevel: 4 - riskOrCreditLevel}`">{{ riskOrCreditLevel && fxtype[Number(riskOrCreditLevel) - 1].label || '--' }}</span>，以下为风险点，请根据实际情况研判额度申报。
            </p>
            <!-- <p>
              本次评估分值为 <span class="risk-leval" :class="'leval-' + suggestData.riskLevel">{{ suggestData.riskScore || '--' }}</span>
              分，该分值处于<span class="risk-leval" :class="'leval-' + suggestData.riskLevel">{{ suggestData?.riskLevel && fxtype[Number(suggestData?.riskLevel) - 1].label || '--' }}</span>，以下为风险点，请根据实际情况研判额度申报。
            </p> -->
            <p>
              风险点总结：本次评估检测到 {{ getTotal() }} 个风险点，高风险
              <span class="leval-1"> {{ suggestData.highRiskNum }} </span> 个，中风险 <span class="leval-2">{{ suggestData.mediumRiskNum }}</span>
              个，低风险 <span class="leval-3"> {{ suggestData.lowRiskNum }} </span> 个
            </p>
          </div>
        </div>
        <div class="danger-point">
          <div class="danger-point-title">
            <img :src="highPoint" alt="" style="width: 64px"/>
            风险分类展示
          </div>
          <div class="danger-point-content">
            <RiskTypeList :riskTypeChart="riskTypeChart"></RiskTypeList>
            <!-- <Dangershow :data="suggestData.riskInfoVoList"></Dangershow> -->
          </div>
        </div>
      </div>
    </div>
    <div v-show="!exportFlag" class="danger-point-container" :class="{'open-divder': isOpen}" style="margin-top: 38px">
      <div class="title">风险点</div>
      <div class="search_box">
        <el-form :model="searchPar" :inline="true" class="demo-form-inline">
          <el-form-item field="indexName" label="风险名称">
            <el-input v-model="searchPar.indexName" placeholder="请输入风险名称" clearable/>
          </el-form-item>
          <el-form-item class="mr-16px" field="riskType" label="风险程度">
            <el-select v-model="searchPar.riskType" placeholder="全部" clearable>
              <el-option v-for="(item, i) in fxtype" :key="i" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <w-button type="primary" class="mr-8px" @click="search">搜索</w-button>
            <w-button @click="reset">重置</w-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-warp">
        <m-table
          style="height: 100%"
          :data="tableDataCom"
          :columns="columns"
          :scroll="scroll"
          :pagination="isOpen ?pagination : false"
          :bordered="false"
          @page-change="changepage"
          @page-size-change="changePagesize"
        >
          <template v-slot:index="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template v-slot:nameSlot="{ rowIndex }">
            <div class="risk-name-level">
              <img :src="getRiskIcon(tableData[rowIndex].level)" style="width: 16px">
              <span v-if="tableData[rowIndex].name.length < 8">
                {{ tableData[rowIndex].name }}
              </span>
              <w-tooltip v-else>
                <span >
                  {{ tableData[rowIndex].name.substring(0, 7) }}...
                </span>
                <template #content>{{ tableData[rowIndex].name }}</template>
              </w-tooltip>


            </div>
          </template>
          <template v-slot:resultSlot="{ rowIndex }">
            <RiskTypeShow :info="tableData[rowIndex]"></RiskTypeShow>
          </template>
        </m-table>
      </div>
      <m-divder v-if="tableDataCom && tableDataCom.length > 0" :isOpen="isOpen" @handleShow="handleShow"></m-divder>
    </div>

    <!-- 用作导出 -->
    <div v-if="exportFlag" id="allPoint" class="danger-point-container">
      <div class="title" style="margin-top: 16px">风险点</div>
      <div class="table-warp">
        <m-table
          style="height: 100%;width: 100%"
          :data="allTableData"
          :columns="columnsAll"
          :scroll="scroll"
          :pagination="false"
          :bordered="false"
        >
          <template v-slot:index="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template v-slot:nameSlot="{ rowIndex }">
            <div class="risk-name-level">
              <img :src="getRiskIcon(tableData[rowIndex].level)" style="width: 16px">
              <span>{{ tableData[rowIndex].name }}</span>
            </div>
          </template>
        </m-table>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import RiskChart from "./components/RiskChart/index.vue";
import RiskTypeList from './components/RiskChart/RiskTypeList.vue'
// import DangerPoint from "./components/DangerPoint.vue";
// import Dangershow from './components/Dangershow.vue'
import suggest from "@/assets/images/suggest.png";
import highPoint from "@/assets/images/high-point.png";
// queryRiskInfoByCompanyInfo风险点  queryRiskInfoCountByCompanyInfo风险分类
import { suggestion, queryRiskInfoByCompanyInfo, queryRiskInfoCountByCompanyInfo } from '@/api/archives'
import highIcon from '@/assets/riskleval/high.png'
import middleIcon from '@/assets/riskleval/middle.png'
import lowIcon from '@/assets/riskleval/low.png'

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  },
  companyId: {
    type: String,
    default: ''
  },
  reportId: {
    type: String,
    default: ''
  }
})

watch(() => props.companyId, (v) => {
  if(v) {
    nextTick(() => {
      init()
    })
  }
}, {
  immediate: true
})

const currentType = ref(-1) // 1风险值（发票智能审批）2信用值（企业资信档案）
const fxtype = ref([ // 
  {
    value: 1,
    label:'高信用'
  },
  {
    value: 2,
    label:'中信用'
  },
  {
    value: 3,
    label:'低信用'
  }
])

const colorStyle = ref(['#5ECF69', '#FF9100', '#F76161']) // 默认值按信用定义
const riskOrCreditLevel = ref(0) // 风险或者信用等级
const riskData = ref(-1) //  风险或者信用分

const showRiskNum = ref(3) // 默认展示两条数据
const isOpen = ref(false)
const allTableData = ref([])
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const loading = ref(false)
const suggestData = ref({});
const tableData = ref([]);
const searchPar = ref({ // 查询参数-以公司维度查询风险信息
  page_size: 10,
  page: 1,
  companyName: '',
  companyId: '',
  riskType: '',
  indexName: '' // 风险名称
})
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "风险分类",
    dataIndex: "secondCategory",
    ellipsis: true,
    width: 200,
  },
  {
    title: "风险名称",
    dataIndex: "name",
    slotName: 'nameSlot',
    ellipsis: true,
    width: 200,
  },
  {
    title: "风险描述",
    dataIndex: "description",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "扫描结果",
    width: 300,
    dataIndex: "result",
    slotName: 'resultSlot',
    // ellipsis: true,
    // tooltip: {position: 'left'},
  },
  {
    title: "风险建议",
    dataIndex: "recommend",
    ellipsis: true,
    slotName: "recommendSlot",
    tooltip: {position: 'left'},
  },
]);

const columnsAll = reactive([
  {
    title: "序号",
    slotName: "index",
  },
  {
    title: "风险分类",
    dataIndex: "secondCategory",
  },
  {
    title: "风险名称",
    dataIndex: "name",
    slotName:'nameSlot'
  },
  {
    title: "风险描述",
    dataIndex: "description",
  },
  {
    title: "扫描结果",
    dataIndex: "result",
  },
  {
    title: "风险建议",
    dataIndex: "recommend",
    slotName: "recommendSlot",
  },
]);
const exportFlag = ref(false)
const riskTypeChart = ref({ // 风险分类展示的x轴和y轴
  x: [],
  y: []
})

// 收起显示table显示的数据
const tableDataCom = computed(() => {
  if(isOpen.value) {
    return tableData.value;
  } else {
    if(tableData.value.length <= showRiskNum.value) {
      return tableData.value;
    } else {
      return tableData.value?.slice(0, 2);
    }
  }
})

function handleShow() {
  isOpen.value = !isOpen.value;
}

function getRiskIcon(level) {
  if(level == 1) {
    return highIcon;
  } else if(level == 2) {
    return middleIcon;
  } else {
    return lowIcon
  }
}

function getTotal() {
  let num1 = suggestData.value.highRiskNum || 0
  let num2 = suggestData.value.mediumRiskNum || 0
  let num3 = suggestData.value.lowRiskNum || 0
  return num1+num2+num3;
}

// 导出PDF
function handleExport(b) {
  exportFlag.value = b;
}

const changePagesize = (v) => {
  pagination.value.pageSize = v;
  searchPar.value.page = 1;
  searchPar.value.page_size = v;
  getqueryRiskInfoByCompanyInfo()
};

const changepage = (v) => {
  searchPar.value.page = v;
  getqueryRiskInfoByCompanyInfo()
};

function search() {
  getqueryRiskInfoByCompanyInfo()
}

function reset() {
  searchPar.value.riskType = ''
  searchPar.value.indexName = ''
  getqueryRiskInfoByCompanyInfo()
}

// 评估建议和风险项
function getsuggestion() {
  suggestion({
    companyId: props.companyId,
    companyName: props.companyName,
    reportId: props.reportId,
  }).then(res => {
    console.log('风险----------------------：', res.data)
    suggestData.value = res.data;
    // 有reportID的显示风险
    // 否则显示信用值
    if(props.reportId) {
      riskData.value = res.data.riskScore
      currentType.value = 1
      fxtype.value = [
        {
          value: 1,
          label:'高风险'
        },
        {
          value: 2,
          label:'中风险'
        },
        {
          value: 3,
          label:'低风险'
        }
      ]
      colorStyle.value = ['#F76161', '#FF9100', '#5ECF69']
      riskOrCreditLevel.value = res.data.riskLevel
    } else {
      currentType.value = 2
      riskData.value = res.data.creditScore
      riskOrCreditLevel.value = res.data.creditLevel
    }
    
    
  }).catch(err => {})
}

// 公司维度查询风险信息
function getqueryRiskInfoByCompanyInfo() {
  if(loading.value) return
  loading.value = true
  let par = {
    companyName: props.companyName,
    companyId: props.companyId,
    riskType: searchPar.value.riskType || 0,
    indexName: searchPar.value.indexName,
    page_size: searchPar.value.page_size,
    page: searchPar.value.page,
    reportId: props.reportId,
  }
  queryRiskInfoByCompanyInfo(par).then(res => {
    tableData.value = res.data;
    loading.value = false
    pagination.value.total = res.total;
  }).catch(err => {
    loading.value = false
  })
}

// 获取120条（全部风险点数据）
function getAllData() {
  let par = {
    companyName: props.companyName,
    companyId: props.companyId,
    reportId: props.reportId,
    riskType: 0,
    indexName: '',
    page_size: 120,
    page: 1,
  }
  queryRiskInfoByCompanyInfo(par).then(res => {
    allTableData.value = res.data;
  }).catch(err => {
    loading.value = false
  })
}

// 获取风险分类展示
function getRiskTypeList() {
  const data = {
    companyId: props.companyId,
    companyName: props.companyName,
    reportId: props.reportId,
  }
  if(!props.reportId) {
    delete data.reportId;
  }
  queryRiskInfoCountByCompanyInfo(data).then(res => {
    const result = res.data;
    const y1 = [] // 高风险
    const y2 = [] // 中风险
    const y3 = [] // 低风险
    const x = []
    Object.keys(result).forEach(item => {
      x.push(item)
      y1.push(result[item][0])
      y2.push(result[item][1])
      y3.push(result[item][2])
    })
    riskTypeChart.value.x = x
    riskTypeChart.value.y = [y1, y2, y3]
  }).catch(err => {})
}

function init() {
  getAllData() // 获取所有风险点,
  getqueryRiskInfoByCompanyInfo(); // 风险点
  getsuggestion();
  getRiskTypeList(); // 获取风险分类展示
}

// init()
</script>
<style lang="scss" scoped>
.open-divder {
  .open-icon-bg {
    border-top: solid 1px #eee;
    margin-top: 8px;
  }
}
.risk-title {
  display: flex;
  align-content: center;
  justify-content: center;
  margin: 32px 0 16px 0;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
}
.container-risk-wrap {
  display: flex;
}
.leval-1 {
  color: rgba(247, 97, 97, 1);
}

.leval-2 {
  color: rgba(230, 174, 3, 1);
}

.leval-3 {
  color: #5ECF69;
}

.container {
  display: flex;
}
.chart {
  width: 367px;
  display: flex;
  align-items: flex-start;
  justify-content: center
}
.information {
  width: calc(100% - 367px);
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  .danger-point-title {
    font-family: myFontALHT;
    background: rgba(221, 223, 231, 0.11);
    height: 50px;
    position: relative;
    padding-top: 14px;
    padding-left: 70px;
    color: rgba(247, 97, 97, 1);
    font-size: 16px;
    img {
      position: absolute;
      left: 0;
      top: -22px;
      font-size: 20px;
      line-height: 40px;
    }
  }
  .danger-point-content {
    background: rgba(221, 223, 231, 0.11);
    padding: 0 12px 12px;
  }
}
.suggest-risk {
  background-color: rgba($color: #3470ff, $alpha: 0.04);
  position: relative;
  border-radius: 8px;
  width: 100%;
}
.suggest {
  background-color: rgba($color: #3470ff, $alpha: 0.04);
  padding: 12px;
  position: relative;
  border-radius: 8px;
  width: 100%;
  .icon {
    color: #3470ff;
  }
  .info {
    padding: 0 12px;
  }
}
.danger-point {
  margin-top: 22px;
  padding: 12px 0;
  position: relative;
  width: 100%;
  .icon {
    color: #f76161;
  }
}
.head {
  display: flex;
  justify-content: flex-end;
}

.title {
  position: relative;
  margin: 16px 0;
  padding-left: 11px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 22px;
  margin-top: -20px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 18px;
    background-color: #1890ff;
  }
}
.pinggu-suggest {
   font-family: myFontALHT;
   font-size: 16px;
   position: relative;
   padding-left: 80px;
   line-height: 30px;;
   img {
    position: absolute;
    top: -30px;
    left: 0;
   }
}
.danger-point-content {
  :deep(.w-table-cell-align-left) {
    background-color: rgba(221, 223, 231, 0.11);
  }
}
.risk-name-level {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  img {
    display: block;
    margin-right: 4px;
  }
}
</style>

