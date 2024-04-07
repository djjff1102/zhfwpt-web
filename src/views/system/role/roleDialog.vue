<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="500px"
    @close="closeDialog"
  >
    <div style="padding-top:  24px; padding-right: 24px;">
      <el-form
        ref="roleFormRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model.trim="formData.name"
            maxlength="40"
            clearable
            placeholder="请输入角色名称"
          />
        </el-form-item>

        <el-form-item label="身份" prop="area_type">
          <el-radio-group v-model="formData.area_type">
            <el-radio
              v-for="item in areaTypeOptions"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item label="描述" prop="remark">
          <el-input
            type="textarea"
            rows="5"
            show-word-limit
            maxlength="200"
            v-model="formData.remark"
            placeholder="请输入描述"
          />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <w-button type="primary" @click="handleSubmit" style="margin-right: 8px">确 定</w-button>
        <w-button @click="closeDialog">取 消</w-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addRole, updateRole } from "@/api/role";
import { RoleForm } from "@/api/role/types";
import { areaTypeOptions } from "./role.data";
defineOptions({
  name: "RoleDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const dialog = ref({
  visible: false,
  title: "",
});
const roleFormRef = ref(ElForm);

const rules = reactive({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  area_type: [{ required: true, message: "请选择层级", trigger: "blur" }],
});

const formData = reactive<RoleForm>({
  name: "",
  code: "",
  remark: "",
  area_type: 1,
  system_type: 0,
  sort: "0",
});

function handleSubmit() {
  roleFormRef.value.validate((valid: any) => {
    if (valid) {
      const roleId = formData.id;
      if (roleId) {
        updateRole(formData).then(() => {
          ElMessage.success("修改成功");
          closeDialog();
          emits("success");
        });
      } else {
        addRole(formData).then(() => {
          ElMessage.success("新增成功");
          closeDialog();
          emits("success");
        });
      }
    }
  });
}

function showDialog(row?: any) {
  dialog.value.visible = true;
  if (row) {
    dialog.value.title = "修改角色";
    Object.assign(formData, row);
    console.log(formData);
  } else {
    dialog.value.title = "新增角色";
  }
}
function closeDialog() {
  resetForm();
  dialog.value.visible = false;
}

function resetForm() {
  roleFormRef.value.resetFields();
  roleFormRef.value.clearValidate();
  formData.id = undefined;
}

defineExpose({
  showDialog,
});
</script>
