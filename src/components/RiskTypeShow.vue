<template>
  <div>
    <div class="risk-result" @click="handleResult">
      {{ text }}
    </div>
    <el-dialog v-model="dialogTableVisible" width="800">
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
      <template #header>
        标题
      </template>
      <template #footer>
          <span class="dialog-footer">
            <w-button @click="dialogTableVisible = false">取 消</w-button>
            <w-button type="primary" @click="dialogTableVisible = false">确 定</w-button>
          </span>
        </template>
    </el-dialog>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: {
    default: ''
  }
})

const dialogTableVisible = ref(false)

function handleResult() {
  dialogTableVisible.value = true;
}
</script>

<style scoped lang="scss">
.risk-result {
  color:#3470FF;
  cursor: pointer;
}
</style>
