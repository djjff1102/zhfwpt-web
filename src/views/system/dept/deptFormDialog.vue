<template>
  <el-dialog
    class="max-h-[500px] overflow-y-auto"
    v-model="dialog.visible"
    :title="dialog.title"
    width="600px"
    @closed="closeDialog"
  >
    <el-form
      ref="deptFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="组织名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入组织名称" />
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
            v-model="formData.alias[index]"
          />
          <el-button class="ml-3" @click="handleAdd()">添加</el-button>
          <el-button class="ml-3" @click="handleDelete(index)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          show-word-limit
          maxlength="200"
          rows="5"
          v-model="formData.remark"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit"> 确 定 </el-button>
        <el-button @click="closeDialog"> 取 消 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { getDeptAlias, updateDept } from "@/api/dept";
import { DeptForm } from "@/api/dept/types";

defineOptions({
  name: "DeptFormDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const deptFormRef = ref(ElForm);

const rules = reactive({
  name: [{ required: true, message: "组织名称不能为空", trigger: "blur" }],
});

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
  id: undefined,
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
  dialog.visible = true;
}

function getAliasById(id: string) {
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
  });
}

defineExpose({
  showDialog,
});
</script>
