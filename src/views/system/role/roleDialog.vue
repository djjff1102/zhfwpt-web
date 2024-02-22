<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    width="500px"
    @close="closeDialog"
  >
    <el-form
      ref="roleFormRef"
      :model="formData"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>

      <el-form-item label="角色编号" prop="code">
        <el-input v-model="formData.code" placeholder="请输入角色编号" />
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

      <!-- <el-form-item label="数据权限" prop="dataScope">
          <el-select v-model="formData.dataScope">
            <el-option :key="0" label="全部数据" :value="0" />
            <el-option :key="1" label="部门及子部门数据" :value="1" />
            <el-option :key="2" label="本部门数据" :value="2" />
            <el-option :key="3" label="本人数据" :value="3" />
          </el-select>
        </el-form-item> -->

      <el-form-item label="状态" prop="status">
        <!-- <el-radio-group v-model="formData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group> -->
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addRole, updateRole } from "@/api/role";
import { RoleForm } from "@/api/role/types";
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
