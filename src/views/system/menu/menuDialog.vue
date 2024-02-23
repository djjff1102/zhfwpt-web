<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    destroy-on-close
    append-to-body
    width="600px"
    @close="closeDialog"
  >
    <el-form
      ref="menuFormRef"
      :model="formData"
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="菜单类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择菜单类型"
          clearable
        >
          <el-option
            v-for="item in menuTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="菜单名称" prop="name">
        <el-input
          v-model.trim="formData.name"
          maxlength="40"
          clearable
          placeholder="请输入菜单名称"
        />
      </el-form-item>

      <el-form-item
        v-if="formData.type == 1"
        label="路由地址"
        prop="routing_address"
      >
        <el-input
          maxlength="40"
          clearable
          v-model.trim="formData.routing_address"
          placeholder="请输入路由地址"
        />
      </el-form-item>

      <el-form-item label="路由编码" prop="code">
        <el-input
          v-model.trim="formData.code"
          maxlength="40"
          clearable
          placeholder="请输入路由编码"
        />
      </el-form-item>

      <el-form-item prop="enable_flag" label="状态">
        <el-radio-group v-model="formData.enable_flag">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="formData.sort"
          style="width: 100px"
          controls-position="right"
          :min="0"
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
import { addMenu, addSubMenu, updateMenu } from "@/api/menu";
import { MenuForm, MenuVO } from "@/api/menu/types";

import { MenuDialogConfigEnum, menuTypeOptions } from "./menu.data";

defineOptions({
  name: "MenuDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const menuFormRef = ref(ElForm);

const menuDialogConfig = {
  [MenuDialogConfigEnum.ADD_MENU]: {
    title: "添加菜单",
    api: addMenu,
    msg: "添加成功",
  },
  [MenuDialogConfigEnum.UPDATE_MENU]: {
    title: "编辑",
    api: updateMenu,
    msg: "编辑成功",
  },
  [MenuDialogConfigEnum.ADD_SUB_MENU]: {
    title: "子菜单配置",
    api: addSubMenu,
    msg: "添加成功",
  },
};

const dialog = ref({
  title: menuDialogConfig[MenuDialogConfigEnum.ADD_MENU].title,
  visible: false,
  type: MenuDialogConfigEnum.ADD_MENU,
});

const formData = reactive<MenuForm>({
  pid: undefined,
  id: undefined,
  type: undefined,
  name: "",
  routing_address: "",
  code: "",
  enable_flag: true,
  sort: 1,
  remark: "",
});

const rules = reactive({
  name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  type: [
    { required: true, message: "请选择菜单类型", trigger: ["blur", "change"] },
  ],
  routing_address: [
    { required: true, message: "请输入路由路径", trigger: "blur" },
  ],
  code: [{ required: true, message: "请输入路由编码", trigger: "blur" }],
  enable_flag: [{ required: true, message: "请选择状态", trigger: "blur" }],
  sort: [{ required: true, message: "请输入排序", trigger: "blur" }],
});

/** 菜单保存提交 */
function submitForm() {
  menuFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      const curType = dialog.value.type;
      const { api, msg } = menuDialogConfig[curType];
      api(formData).then(() => {
        ElMessage.success(msg);
        closeDialog();
        emits("success");
      });
    }
  });
}

function showDialog(type: MenuDialogConfigEnum, row?: MenuVO) {
  dialog.value.type = type;
  switch (type) {
    case MenuDialogConfigEnum.ADD_MENU:
      dialog.value.title = "添加菜单";
      break;
    case MenuDialogConfigEnum.UPDATE_MENU:
      dialog.value.title = "编辑";
      Object.assign(formData, row);
      break;
    case MenuDialogConfigEnum.ADD_SUB_MENU:
      dialog.value.title = "子菜单配置";
      formData.id = row?.id;
      break;
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

  // init
  formData.id = undefined;
  formData.type = undefined;
  formData.name = "";
  formData.routing_address = "";
  formData.code = "";
  formData.enable_flag = true;
  formData.sort = 1;
  formData.remark = "";
}

defineExpose({
  showDialog,
});
</script>
