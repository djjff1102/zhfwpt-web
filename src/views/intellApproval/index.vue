<template>
  <div class="attention">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="申报名称">
          <w-input v-model="form.name" placeholder="请输入申报名称" />
        </w-form-item>
        <w-form-item field="post" label="申报编号">
          <w-input v-model="form.post" placeholder="请输入申报编号" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="审批状态">
          <w-select v-model="form.post" placeholder="请选择审批状态" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
      </w-form>
    </div>
    <div class="oper">
      <w-button type="primary" class="mr-8px" @click="operate('add')">新增</w-button>
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
        <template v-slot:approvalstatus="{rowIndex}">
          <div>{{tableData[rowIndex]}}</div>
      </template>
        <template v-slot:operations>
          <w-button type="text" @click="operate('detail')">详情</w-button>
        </template>
      </m-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { IconPlus } from "winbox-ui-next/es/icon";
import { debounce } from "lodash-es";
import { useRouter } from 'vue-router';

const router = useRouter();

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([
  {type:'大数据1', status:1},
  {type:'大数据2', status:1},
  {type:'大数据3', status:1}
]);
const columns = reactive([
  {
    title: '序号',
    dataIndex: 'index',
    width: 100,
  },
  {
    title: "企业名称",
    dataIndex: "type",
  },
  {
    title: "审批状态",
    dataIndex: "status",
    slotName: 'approvalstatus'
  },
  {
    title: "操作",
    dataIndex: "operations",
    slotName: "operations",
    fixed: "right",
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

function operate(type: string) {
  router.push({ 
    name: 'IntellApprovalOperate', 
    query: {
      id: 1,
      type
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

const init = async () => {
  loading.value = true;
  let data = {
    current: current.value,
    size: size.value,
    name: keyWords.value,
    authority: categoryType.value,
    role: roleValue.value,
  };
  let res = await knowledgePage(data);
  if (res.code === 200) {
    loading.value = false;
    tableData.value = res.data.records;
    pagination.value.total = res.data.total;
  } else {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.attention {
  padding: 24px;
  padding-bottom: 16px;
  height: 100%;
  background: #fff;
  .oper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .table-warp {
    height: calc(100% - 100px);
  }

  ::v-deep .m-table-container {
    height: 100%;
  }
}
</style>

