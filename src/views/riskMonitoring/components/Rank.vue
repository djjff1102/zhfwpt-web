<template>
  <!-- 订单信息 -->
  <div class="input-invoice-container">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item class="mr-16px" field="post" label="检测日期">
          <w-range-picker
            class="w-250px"
            :time-picker-props="{
              defaultValue: [
                dayjs('00:00:00', 'HH:mm:ss'),
                dayjs('09:09:06', 'HH:mm:ss'),
              ],
            }"
            format="YYYY-MM-DD"
            @change="onChange"
            @select="onSelect"
            @ok="onOk"
          />
        </w-form-item>
        <w-form-item field="name" label="企业名称">
          <w-input v-model="form.name" placeholder="请输入企业名称" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="企业信用等级">
          <w-select v-model="form.post" placeholder="全部" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
      </w-form>
    </div>
    <div class="table-warp">
      <m-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:index="{ rowIndex }">
          {{ rowIndex + 1 }}
        </template>
        <template v-slot:operations="rowIndex">
          <el-button type="text" @click="handleDetail(tableData[rowIndex])">详情</el-button>
        </template>
      </m-table>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { ref, reactive} from "vue";
import { useRouter } from "vue-router";
import { attentionCreditCompanyList } from '@/api/riskmonitor'

const router = useRouter()

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([
  {
    name: '测试'
  }
]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "检测时间",
    dataIndex: "name",
    width: 180,
    fixed: "left",
  },
  {
    title: "企业名称",
    dataIndex: "salary",
    width: 180,
    fixed: "left",
  },
  {
    title: "企业风险等级",
    width: 180,
    dataIndex: "address",
  },
  {
    title: "风险值分数",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "企业统一社会信息代码",
    width: 220,
    dataIndex: "email",
  },
  {
    title: "涉风险项",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "涉风险细则",
    width: 180,
    dataIndex: "email",
  },
  {
    title: "操作",
    width: 180,
    dataIndex: "operations",
    slotName: 'operations'
  },
]);
const pagination = ref({
  total: 0,
  pageSize: 10,
  "show-total": true,
  "show-page-size": true,
  "show-jumper": true,
});
const scroll = ref({
  y: 800,
  x: 1080,
});
const form = ref({
  name: "",
  post: "",
});

// 跳转详情
function handleDetail(d) {
  router.push({ 
    path: '/riskMonitoring/detail', 
    query: {
      companyId: '1',
      companyName: '1',
      type: 'risk'
    }
  });
}

const changePagesize = (v) => {
  size.value = v;
  pagination.value.pageSize = v;
  init();
};
const changepage = (v) => {
  current.value = v;
  init();
};
function onSelect(dateString, date) {
  console.log("onSelect", dateString, date);
}

function onChange(dateString, date) {
  console.log("onChange: ", dateString, date);
}

function onOk(dateString, date) {
  console.log("onOk: ", dateString, date);
}
const init = async () => {
  attentionCreditCompanyList({}).then(res => {
    
  }).catch(err => {
    console.log('重点关注企业，信用值排行异常：', err);
  })
};
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  margin: 16px 0;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  line-height: 22px;
}
.container {
}

.table-warp {
  height: calc(100% - 100px);
}
</style>
