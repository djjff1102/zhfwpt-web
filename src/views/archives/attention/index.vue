<template>
  <div class="knowledge">
    <div class="search_box">
      <w-form :model="form" layout="inline">
        <w-form-item field="name" label="用户名称">
          <w-input v-model="form.name" placeholder="请输入用户名称" />
        </w-form-item>
        <w-form-item field="post" label="角色编号">
          <w-input v-model="form.post" placeholder="请输入角色编号" />
        </w-form-item>
        <w-form-item class="mr-16px" field="post" label="状态">
          <w-select v-model="form.post" placeholder="请输入角色编号" />
        </w-form-item>
        <w-button type="primary" class="mr-8px">搜索</w-button>
        <w-button>重置</w-button>
      </w-form>
    </div>
    <div class="oper">
      <w-button type="primary" class="mr-8px">新增</w-button>
    </div>
    <div class="table-warp">
      <w-table
        style="height: 100%"
        :data="tableData"
        :columns="columns"
        :scroll="scroll"
        :pagination="pagination"
        @page-change="changepage"
        @page-size-change="changePagesize"
        :bordered="false"
      >
        <template v-slot:operations>
          <w-button type="text">详情</w-button>
        </template>
      </w-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, unref, computed, watch } from "vue";
import { IconPlus } from "winbox-ui-next/es/icon";
import { debounce } from "lodash-es";

const current = ref(1);
const size = ref(10);
const loading = ref(false);
const tableData = ref([]);
const columns = reactive([
  {
    title: "统一社会信用代码",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "企业名称",
    dataIndex: "salary",
  },
  {
    title: "风险值评估",
    dataIndex: "address",
  },
  {
    title: "登记状态",
    dataIndex: "email",
  },
  {
    title: "法定负责人",
    dataIndex: "email",
  },
  {
    title: "联系方式",
    dataIndex: "email",
  },
  {
    title: "登记机关",
    dataIndex: "email",
  },
  {
    title: "注册地址",
    dataIndex: "email",
  },
  {
    title: "企业类型",
    dataIndex: "email",
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
.knowledge {
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

  ::v-deep .w-table-container {
    height: 100%;
  }
}
</style>

