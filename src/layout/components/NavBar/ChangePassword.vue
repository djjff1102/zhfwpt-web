<template>
  <teleport to="body">
    <el-dialog
      class="password-dialog"
      align-center
      v-model="dialogVisible"
      title="修改密码"
      width="500"
    >
      <el-form
        ref="passwordForm"
        v-if="dialogVisible"
        label-position="right"
        label-width="80px"
        :rules="rules"
        :model="passwordData"
        class="w-[420px]"
      >
        <el-form-item prop="password" label="旧密码">
          <el-input
            placeholder="请输入旧密码"
            :type="passwordVisible === false ? 'password' : 'input'"
            v-model.trim="passwordData.password"
          >
            <template #suffix
              ><span @click="passwordVisible = !passwordVisible">
                <svg-icon
                  :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
                  class="cursor-pointer !mr-0"
                /> </span></template
          ></el-input>
        </el-form-item>
        <el-form-item
          class="position-relative"
          prop="newPassword"
          label="新密码"
        >
          <el-input
            placeholder="请输入新密码"
            @input="newPasswordChange"
            :type="newPasswordVisible === false ? 'password' : 'input'"
            v-model.trim="passwordData.newPassword"
          >
            <template #suffix
              ><span @click="newPasswordVisible = !newPasswordVisible">
                <svg-icon
                  :icon-class="
                    newPasswordVisible === false ? 'eye' : 'eye-open'
                  "
                  class="cursor-pointer !mr-0"
                /> </span></template
          ></el-input>
          <el-tooltip
            class="ssbox-item"
            effect="dark"
            content="Top Left prompts info"
            placement="top-end"
          >
            <template #content>
              <div class="flex items-center">
                <i
                  v-if="hasInput"
                  class="iconfont mr-[4px] !text-[12px]"
                  :class="
                    passedVerification.length
                      ? 'icon-success text-[#6ACE6B]'
                      : 'icon-error text-[#F65E60]'
                  "
                ></i
                ><span>长度为8~14个字符</span>
              </div>
              <div class="flex items-center">
                <i
                  v-if="hasInput"
                  class="iconfont mr-[4px] !text-[12px]"
                  :class="
                    passedVerification.character
                      ? 'icon-success text-[#6ACE6B]'
                      : 'icon-error text-[#F65E60]'
                  "
                ></i
                ><span>必须包含字母、数字、特殊字符，字母区分大小写</span>
              </div>
              <div class="flex items-center">
                <i
                  v-if="hasInput"
                  class="iconfont mr-[4px] !text-[12px]"
                  :class="
                    passedVerification.space
                      ? 'icon-success text-[#6ACE6B]'
                      : 'icon-error text-[#F65E60]'
                  "
                ></i
                ><span>不允许有空格、中文</span>
              </div>
            </template>
            <i
              class="position-absolute right-[-42px] mr-[17px] ml-[14px] iconfont !text-[18px]"
              :class="
                !hasInput
                  ? 'icon-danchuangyichang text-[#F7951D]'
                  : passedVerification.length &&
                      passedVerification.character &&
                      passedVerification.space
                    ? 'icon-success text-[#6ACE6B]'
                    : 'icon-error text-[#F65E60]'
              "
            ></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            placeholder="请再次输入新密码"
            :type="confirmPasswordVisible === false ? 'password' : 'input'"
            v-model.trim="passwordData.confirmPassword"
          >
            <template #suffix
              ><span @click="confirmPasswordVisible = !confirmPasswordVisible">
                <svg-icon
                  :icon-class="
                    confirmPasswordVisible === false ? 'eye' : 'eye-open'
                  "
                  class="cursor-pointer !mr-0"
                /> </span></template
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmPassword"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>
<script setup lang="ts">
import { PasswordData } from "@/api/auth/types";
import type { FormRules } from "element-plus";
import { object } from "vue-types";
const dialogVisible = ref(false);
const passwordVisible = ref(false);
const newPasswordVisible = ref(false);
const confirmPasswordVisible = ref(false);
const passwordForm = ref();
const hasInput = ref(false);
const passedVerification = reactive({
  length: false,
  character: false,
  space: false,
});
const passwordData = reactive<PasswordData>({
  password: "",
  newPassword: "",
  confirmPassword: "",
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value !== passwordData.newPassword) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<PasswordData>>({
  password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,14}$/,
      message: "密码设置不符合要求！",
      trigger: "blur",
    },
  ],
  confirmPassword: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    {
      pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,14}$/,
      message: "密码设置不符合要求！",
      trigger: "blur",
    },
    { validator: validatePass, trigger: "blur" },
  ],
});
function newPasswordChange(value: string) {
  hasInput.value = true;
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]+$/;
  const noSpaceRegex = /^[^\s\u4e00-\u9fa5]*$/;
  passedVerification.length = value.length >= 8 && value.length <= 24;
  passedVerification.character = regex.test(value);
  passedVerification.space = noSpaceRegex.test(value);
}
function confirmPassword() {
  passwordForm.value.validate((valid: boolean) => {
    if (valid) {
      //调接口
      dialogVisible.value = false;
    }
  });
}
function showPasswordDialog() {
  Object.assign(passwordData, {
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  dialogVisible.value = true;
}
defineExpose({ showPasswordDialog });
</script>
<style lang="scss">
.el-popper__arrow::before {
  display: block;
}
</style>
