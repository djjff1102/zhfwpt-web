<template>
  <el-dialog
    v-if="menuDialogVisible"
    v-model="menuDialogVisible"
    title="菜单权限"
    width="400px"
  >
    <el-scrollbar v-loading="loading" max-height="300px">
      <el-tree
        ref="menuRef"
        node-key="id"
        show-checkbox
        :check-strictly="checkStrictly"
        :props="menuProps"
        :data="menuList"
        :default-expand-all="true"
      />
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="updateAuthority">确 定</el-button>
        <el-button @click="menuDialogVisible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  getAuthorityById,
  getAuthorityTree,
  updateAuthorityById,
} from "@/api/role";
import { MenuPremissionTreeProps } from "@/api/role/types";
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
  children: "children",
};
const checkStrictly = ref(true);

function getTreeData() {
  getAuthorityTree().then((res) => {
    menuList.value = res.data;
  });
}

function getCurAuthorityData(roleId: string) {
  return getAuthorityById({
    page: 1,
    page_size: 999,
    role_id: roleId,
  });
}

/**
 * 更新角色权限
 */
function updateAuthority() {
  const id = currentRole.value.id;
  const ids = menuRef.value
    .getCheckedKeys()
    .concat(menuRef.value.getHalfCheckedKeys());
  updateAuthorityById({
    id,
    ids,
  }).then((res) => {
    console.log(res);
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

  const { data } = await getCurAuthorityData(row.id);

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
