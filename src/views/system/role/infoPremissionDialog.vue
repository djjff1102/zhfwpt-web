<template>
  <el-dialog
    v-if="menuDialogVisible"
    v-model="menuDialogVisible"
    title="信息权限"
    width="400px"
  >
    <el-scrollbar v-loading="loading" max-height="300px">
      <el-form>
        <el-form-item label="角色名称:">
          {{ currentRole?.name }}
        </el-form-item>
        <el-form-item label="信息权限:">
          
          <el-tree
            class="!w-full"
            ref="menuRef"
            node-key="id"
            show-checkbox
            :check-strictly="checkStrictly"
            :props="menuProps"
            :data="menuList"
            :default-expand-all="false"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <w-button type="primary" @click="update">确 定</w-button>
        <w-button @click="menuDialogVisible = false">取 消</w-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getInfoPremissionTree,
  getInfoPremissionTreeById,
  updateInfoPremissionById,
} from "@/api/role";
import { MenuPremissionTreeProps } from "@/api/role/types";
import { ElTree } from "element-plus";
defineOptions({
  name: "AuthorityDialog",
  inheritAttrs: false,
});

const menuDialogVisible = ref(false);
const menuRef = ref(ElTree);

const loading = ref(false);

const currentRole = ref();
const menuList = ref<MenuPremissionTreeProps[]>([]);
const menuProps = {
  label: "name",
  // children: "children",
};
const checkStrictly = ref(true);

function getTreeData() {
  getInfoPremissionTree().then((res) => {
    console.log('res---------------tree：', res.data)
    menuList.value = res.data;
  });
}

/**
 * 获取当前角色的信息权限
 */
function getCurInfoPremissionData(roleId: string) {
  return getInfoPremissionTreeById({
    page: 1,
    page_size: 999,
    role_id: roleId,
  });
}

/**
 * 更新角色权限
 */
function update() {
  const id = currentRole.value.id;
  const ids = menuRef.value
    .getCheckedKeys()
    .concat(menuRef.value.getHalfCheckedKeys());
  updateInfoPremissionById({
    id,
    ids,
  }).then((res) => {
    if (res.result) {
      ElMessage.success("更新成功");
      closeDialog();
    }
  });
}

function closeDialog() {
  menuDialogVisible.value = false;
}

async function showDialog(row: any) {
  currentRole.value = row;
  checkStrictly.value = true;
  menuDialogVisible.value = true;

  const { data } = await getCurInfoPremissionData(row.id);

  const ids = data.map((item: any) => item.id);
  menuRef.value?.setCheckedKeys(ids);

  checkStrictly.value = false;
}

onMounted(() => {
  getTreeData();
});

defineExpose({
  showDialog,
});
</script>

<style scoped>
:deep(.is-leaf svg) {
  display: none;
}
:deep(.el-tree-node__label) {
  display: inline-block;
  padding-left: 4px;
}
:deep(.el-checkbox) {
  /* height: auto !important; */
}
</style>
