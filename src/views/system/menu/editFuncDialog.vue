<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    destroy-on-close
    append-to-body
    width="400px"
    @close="closeDialog"
  >
    <el-form
      ref="menuFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="资源类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择资源类型"
          clearable
        >
          <el-option
            v-for="item in sourceOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="资源编码" prop="code">
        <el-input
          v-model.trim="formData.code"
          maxlength="40"
          clearable
          placeholder="请输入资源编码"
        />
      </el-form-item>

      <el-form-item label="资源名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          maxlength="40"
          clearable
          placeholder="请输入资源名称"
        />
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          rows="5"
          show-word-limit
          maxlength="200"
          v-model.trim="formData.remark"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { MenuFuncsProps, MenuVO } from "@/api/menu/types";

import { ResourceDialogConfigEnum, sourceOptions } from "./menu.data";
import { addFuncResource, updateFuncResource } from "@/api/menu";

defineOptions({
  name: "EditFuncDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const resourceDialogConfig = {
  [ResourceDialogConfigEnum.ADD_RESOURCE]: {
    title: "添加",
    api: addFuncResource,
    msg: "添加成功",
  },
  [ResourceDialogConfigEnum.UPDATE_RESOURCE]: {
    title: "编辑",
    api: updateFuncResource,
    msg: "编辑成功",
  },
};

const menuFormRef = ref(ElForm);

const dialog = ref({
  type: ResourceDialogConfigEnum.ADD_RESOURCE,
  title: resourceDialogConfig[ResourceDialogConfigEnum.ADD_RESOURCE].title,
  visible: false,
});

const formData = reactive<MenuFuncsProps>({
  code: "",
  id: undefined,
  name: "",
  remark: "",
  type: "",
});

const rules = reactive({
  type: [
    { required: true, message: "请选择资源类型", trigger: ["blur", "change"] },
  ],
  name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入资源编码", trigger: "blur" }],
});

/** 菜单保存提交 */
function submitForm() {
  menuFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      const curType = dialog.value.type;
      const { api, msg } = resourceDialogConfig[curType];
      api(formData).then(() => {
        ElMessage.success(msg);
        closeDialog();
        emits("success");
      });
    }
  });
}

function showDialog(type: ResourceDialogConfigEnum, row?: MenuVO) {
  dialog.value.type = type;
  if (row) {
    Object.assign(formData, row);
  }
  dialog.value.visible = true;
}

function closeDialog() {
  dialog.value.visible = false;
  resetForm();
}

function resetForm() {
  menuFormRef.value.resetFields();
  menuFormRef.value.clearValidate();

  formData.id = undefined;
  formData.type = undefined;
  formData.name = "";
  formData.code = "";
  formData.remark = "";
}

defineExpose({
  showDialog,
});
</script>
