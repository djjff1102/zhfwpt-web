<template>
  <el-dialog
    v-model="dialog.visible"
    :title="dialog.title"
    append-to-body
    @close="closeDialog"
  >
    <el-form
      ref="userFormRef"
      :model="formData"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="部门" prop="organization_id">
        <el-cascader
          ref="elcascader"
          popper-class="mypopperclass"
          class="w-[100%]"
          clearable
          :disabled="props.modelValue != '0'"
          v-model="formData.organization_id"
          :options="organizationData"
          :props="addUserOrgProps"
          :show-all-levels="false"
        />
      </el-form-item>

      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="角色" prop="role_id">
        <el-select
          v-model="formData.role_id"
          placeholder="请选择角色"
          filterable
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="enable_flag">
        <el-radio-group v-model="formData.enable_flag">
          <el-radio :label="true">启用</el-radio>
          <el-radio :label="false">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="工号" prop="work_no">
        <el-input v-model="formData.work_no" placeholder="请输入工号" />
      </el-form-item>

      <el-form-item label="真实姓名" prop="real_name">
        <el-input v-model="formData.real_name" placeholder="请输入真实姓名" />
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入手机号" />
      </el-form-item>
    </el-form>

    <!-- 弹窗底部操作按钮 -->
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="closeDialog">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { addUser, updateUser } from "@/api/user";
import { UserForm, UserPageVO } from "@/api/user/types";

defineOptions({
  name: "UserFormDialog",
  inheritAttrs: false,
});

const emits = defineEmits(["success"]);

const props = defineProps({
  modelValue: {
    type: String,
    default: "0",
  },
});

const dialog = reactive({
  visible: false,
  title: "添加用户",
});

const userFormRef = ref(ElForm);

const addUserOrgProps: any = {
  expandTrigger: "hover",
  label: "name",
  value: "id",
  emitPath: false,
  checkStrictly: true,
};

// 用户表单数据
const formData = reactive<UserForm>({
  organization_id: "",
  role_id: "",
  name: "",
  real_name: "",
  password: "",
  phone: "",
  system_type: 0,
  enable_flag: true,
  work_no: "",

  id: undefined,
});

// 校验规则
const rules = reactive({
  name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  real_name: [{ required: true, message: "真实姓名不能为空", trigger: "blur" }],
  role_id: [
    { required: true, message: "角色不能为空", trigger: ["blur", "change"] },
  ],
  organization_id: [
    { required: true, message: "部门不能为空", trigger: "blur" },
  ],
  phone: [
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
  enable_flag: [{ required: true, message: "请选择状态", trigger: "blur" }],
});

const roleOptions = JSON.parse(localStorage.getItem("roleList") || "[]");
const organizationData = JSON.parse(localStorage.getItem("deptList") || "[]");

function handleSubmit() {
  userFormRef.value.validate((valid: any) => {
    if (valid) {
      if (formData.id) {
        updateUser(formData).then((res) => {
          ElMessage.success("修改成功");
          closeDialog();
          emits("success");
        });
      } else {
        addUser(formData).then((res) => {
          ElMessage.success("新增成功");
          closeDialog();
          emits("success");
        });
      }
    }
  });
}

function showDialog(row?: UserPageVO) {
  if (row) {
    dialog.title = "修改用户";
    Object.assign(formData, row);
  } else {
    dialog.title = "新增用户";
    formData.organization_id = props.modelValue;
  }
  dialog.visible = true;
}

function closeDialog() {
  dialog.visible = false;

  // 重置表单
  resetForm();
}

function resetForm() {
  userFormRef.value.resetFields();
  userFormRef.value.clearValidate();

  formData.id = undefined;
}

defineExpose({
  showDialog,
});
</script>
