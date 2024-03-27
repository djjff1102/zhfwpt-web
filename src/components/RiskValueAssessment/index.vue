<template>
  <div id="suggestdom">
    <div class="container-risk-wrap">
      <div class="chart">
        <RiskChart :riskData="riskData"/>
      </div>
      <div class="information">
        <div class="suggest">
          <div class="icon flex-base-start">
            <span style="flex-grow: 1;" class="pinggu-suggest">
               <img :src="suggest" alt="" style="width: 64px"/>
              评估建议
            </span>
            <Exportpdf domId="suggestdom" title="风险值评估"></Exportpdf>
          </div>
          <div class="info">
            <p>
              本次评估分值为 <span class="risk-leval" :class="'leval-' + suggestData.riskLevel">{{ suggestData.riskScore || '--' }}</span>
              分，该分值处于<span class="risk-leval" :class="'leval-' + suggestData.riskLevel">{{ suggestData?.riskLevel && fxtype[Number(suggestData?.riskLevel) - 1].label || '--' }}</span>，以下为风险点，请根据实际情况研判额度申报。
            </p>
            <p>
              风险点总结：本次评估检测到 {{ suggestData.highRiskNum + suggestData.mediumRiskNum + suggestData.lowRiskNum }} 个风险点，高风险
              <span class="leval-1">{{ suggestData.highRiskNum }}</span>个，中风险 <span class="leval-2">{{ suggestData.mediumRiskNum }}</span>
              个，低风险 <span class="leval-3">{{ suggestData.lowRiskNum }}</span> 个
            </p>
          </div>
        </div>
        <div class="danger-point">
          <div class="danger-point-title">
            <img :src="highPoint" alt="" style="width: 64px"/>
            风险分类展示
          </div>
          <div class="danger-point-content">
            <Dangershow :data="suggestData.riskInfoVoList"></Dangershow>
          </div>
        </div>
      </div>
    </div>
    <!-- <DangerPoint :data="tableData" :companyName="companyName" :companyId="companyId"></DangerPoint> -->
    <div class="danger-point-container">
      <div class="title">风险点</div>
      <div class="search_box">
        <w-form :model="searchPar" layout="inline">
          <w-form-item field="indexName" label="风险名称">
            <w-input v-model="searchPar.indexName" placeholder="请输入风险名称" />
          </w-form-item>
          <w-form-item class="mr-16px" field="riskType" label="风险程度">
            <w-select v-model="searchPar.riskType" placeholder="全部" >
              <w-option v-for="(item, i) in fxtype" :key="i" :value="item.value" :label="item.label"></w-option>
            </w-select>
          </w-form-item>
          <el-button type="primary" class="mr-8px" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </w-form>
      </div>
      <div class="table-warp">
        <m-table
          style="height: 100%"
          :data="tableData"
          :columns="columns"
          :scroll="scroll"
          :pagination="pagination"
          :bordered="false"
          @page-change="changepage"
          @page-size-change="changePagesize"
        >
          <template v-slot:index="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
          <template v-slot:operations>
            <el-button type="text">详情</el-button>
          </template>
        </m-table>
      </div>
    </div>
  </div>

</template>
<script setup>
import { ref, reactive } from 'vue';
import RiskChart from "./components/RiskChart/index.vue";
// import DangerPoint from "./components/DangerPoint.vue";
import Dangershow from './components/Dangershow.vue'
import suggest from "@/assets/images/suggest.png";
import highPoint from "@/assets/images/high-point.png";
import { suggestion, queryRiskInfoByCompanyInfo } from '@/api/archives'
import { Loading } from 'element-plus/es/components/loading/src/service';

const fxtype =[
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

const props = defineProps({
  companyName: {
    type: String,
    default: ''
  },
  companyId: {
    type: String,
    default: ''
  }
})

const riskData = ref(0)
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
    dataIndex: "result",
    ellipsis: true,
    tooltip: {position: 'left'},
  },
  {
    title: "风险建议",
    dataIndex: "recommend",
    ellipsis: true,
    slotName: "recommendSlot",
    tooltip: {position: 'left'},
  },
]);

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
  // searchPar.value = {
  //   companyName: pro,
  //   companyId: '',
  //   riskType: '',
  //   name: '' // 风险名称
  // }
  getqueryRiskInfoByCompanyInfo()
}

// 评估建议和风险项
function getsuggestion() {
  suggestion({
    companyId: props.companyId,
    companyName: props.companyName,
  }).then(res => {
    suggestData.value = res.data;
    riskData.value = res.data.riskScore
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
  }
  queryRiskInfoByCompanyInfo(par).then(res => {
    tableData.value = res.data;
    loading.value = false
    pagination.value.total = res.total;
  }).catch(err => {
    loading.value = false
  })
}

function init() {
  getqueryRiskInfoByCompanyInfo();
  getsuggestion();
}

init()
</script>
<style lang="scss" scoped>
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
  color: rgba(52, 112, 255, 1);
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
.suggest {
  background-color: rgba($color: #3470ff, $alpha: 0.04);
  padding: 12px;
  position: relative;
  border-radius: 8px;;
  .icon {
    color: #3470ff;
  }
  .info {
    padding: 0 12px;
  }
}
.danger-point {
  margin-top: 22px;
  padding: 12px;
  position: relative;
  .icon {
    color: #f76161;
  }
}
.head {
  display: flex;
  justify-content: flex-end;
}
::v-deep .w-form {
  width: auto;
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

</style>
