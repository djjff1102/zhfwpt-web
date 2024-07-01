<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="500px"
    @closed="closeDialog"
  >
    <el-form
      ref="deptFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="组织名称" prop="name">
        <el-input
          v-model="formData.name"
          clearable
          maxlength="20"
          placeholder="请输入组织名称"
        />
      </el-form-item>
      <el-form-item label="回调地址" prop="callbackAddress">
        <el-input
          v-model="formData.callbackAddress"
          clearable
          maxlength="200"
          placeholder="请输入回调地址"
        />
      </el-form-item>
      <el-form-item
        v-for="(item, index) in formData.alias"
        :key="item"
        :label="'曾用名' + (index + 1)"
        :prop="'alias.' + index"
      >
        <div class="flex items-center w-[100%]">
          <el-input
            class="flex-1"
            placeholder="请输入别名"
            clearable
            maxlength="20"
            v-model="formData.alias[index]"
          />
          <w-button class="ml-3" @click="handleAdd()">添加</w-button>
          <w-button class="ml-3" @click="handleDelete(index)">删除</w-button>
        </div>
      </el-form-item>
      <el-form-item label="仓库">
        <el-select
          v-model="formData.storageEnterpriseIds"
          placeholder=""
          style="width: 240px"
          clearable
          multiple
        >
          <template #label="{ label, value }">
            <span>{{ label }}: </span>
            <span style="font-weight: bold">{{ value }}</span>
          </template>
          <el-option
            v-for="item in enterPrise"
            :key="item.id"
            :label="item.enterpriseName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          show-word-limit
          maxlength="100"
          rows="5"
          v-model="formData.remark"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <w-button type="primary" @click="handleSubmit"> 确 定 </w-button>
        <w-button @click="closeDialog"> 取 消 </w-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {  getDeptAlias, updateDept, getAllStores, getSelectStore } from "@/api/dept";
import { DeptForm, EnterpriseEnty} from "@/api/dept/types";
import { formatData } from "@/utils/common";

defineOptions({
  name: "DeptFormDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const deptFormRef = ref(ElForm);

const rules = reactive({
  name: [{ required: true, message: "组织名称不能为空", trigger: "blur" }],
  // storageEnterpriseIds: [{ required: true, message: "仓库不能为空", trigger: "blur" }],
});

const enterPrise = ref<EnterpriseEnty>([])
const dialog = reactive({
  title: "添加组织",
  visible: false,
});

const formData = reactive<DeptForm>({
  name: "",
  alias: [""],
  pid: "0",
  system_type: 0,
  remark: "",
  storageEnterpriseIds: [], // 仓库id
  id: undefined,
  callbackAddress: '' // 回调地址
});

function handleAdd() {
  formData.alias.push("");
}

function handleDelete(index: number) {
  formData.alias.splice(index, 1);
}

function handleSubmit() {
  deptFormRef.value.validate((valid: any) => {
    if (valid) {
      const deptId = formData.id;
      const msg = deptId ? "修改成功" : "新增成功";
      const params = {
        ...formData,
        alias: formData.alias.filter(Boolean),
      };
      updateDept(params).then(() => {
        ElMessage.success(msg);
        closeDialog();
        emits("success");
      });
    }
  });
}

function showDialog(id: string): void;
function showDialog(row: DeptForm): void;
function showDialog(): void;

function showDialog(param?: DeptForm | string) {
  if (typeof param === "string") {
    formData.pid = param;
    dialog.title = "添加组织";
  } else if (param) {
    Object.assign(formData, param);
    getAliasById(formData.id as string);
    
    dialog.title = "修改组织";
  } else {
    
    dialog.title = "添加组织";
  }
  getAllStoresList()
  dialog.visible = true;
}

function getAllStoresList() {
  getAllStores({
    page_size: 100,
    page: 1
  }).then((res: any) => {
    enterPrise.value = res.data || []
  })
}

function getAliasById(id: string) {
  getSelectStore(id).then((res) => {
    formData.storageEnterpriseIds = res.data
    console.log('已选择的仓储ids：', res)
  })
  getDeptAlias(id).then((res) => {
    formData.alias = res.data?.length > 0 ? res.data : [""];
  });
}


function closeDialog() {
  dialog.visible = false;
  resetForm();
}

function resetForm() {
  deptFormRef.value.resetFields();
  deptFormRef.value.clearValidate();
  Object.assign(formData, {
    name: "",
    alias: [""],
    pid: "0",
    system_type: 0,
    remark: "",
    id: undefined,
    code: "",
  });
}

defineExpose({
  showDialog,
});
</script>
