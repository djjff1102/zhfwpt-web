<!-- 部门树 -->
<template>
  <el-card shadow="never">
    <el-input
      v-model.trim="deptName"
      maxlength="20"
      placeholder="请输入部门名称"
      clearable
    >
      <template #prefix>
        <i-ep-search />
      </template>
    </el-input>

    <el-tree
      ref="deptTreeRef"
      class="mt-2"
      :data="deptList"
      node-key="id"
      highlight-current
      :props="{ children: 'children', label: 'name', disabled: '' }"
      :expand-on-click-node="false"
      :filter-node-method="handleFilter"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<script setup lang="ts">
import { getDeptOptions } from "@/api/dept";
import { OrganizationUnit } from "@/api/dept/types";
import { ElTree } from "element-plus";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const deptList = useStorage("deptList", [] as OrganizationUnit[]); // 部门列表
const deptTreeRef = ref(ElTree); // 部门树
const deptName = ref(); // 部门名称

const emits = defineEmits(["node-click"]);

const deptId = useVModel(props, "modelValue", emits);

watchEffect(
  () => {
    deptTreeRef.value.filter(deptName.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

/** 部门筛选 */
function handleFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.name.indexOf(value) !== -1;
}

/** 部门树节点 Click */
function handleNodeClick(data: { [key: string]: any }) {
  deptId.value = data.id;
  emits("node-click");
}

/**
 * 设置默认选中tree node
 */
function setDefaultValue() {
  const topTreeNode = deptList.value[0];
  if (!topTreeNode) {
    return;
  }
  const topTreeNodeId = topTreeNode.id;
  if (topTreeNodeId !== undefined) {
    setCurrentNode(topTreeNodeId);
  }
}

function setCurrentNode(id: string) {
  setTimeout(() => {
    nextTick(() => {
      deptId.value = id;
      deptTreeRef.value?.setCurrentKey(id);

      emits("node-click");
    });
  }, 500);
}

onBeforeMount(() => {
  getDeptOptions().then((response) => {
    deptList.value = response.data;
  });
});

onMounted(() => {
  setDefaultValue();
});
</script>
