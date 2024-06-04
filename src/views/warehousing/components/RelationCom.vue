<template>
  <div @click.stop="handleRelation">
    <el-button type="primary" :style="{ width: width + 'px'}" >联系TA</el-button>
  </div>
    

    <el-dialog v-model="showRelation" :width="500">
      <template #header>
        <div class="dia-header">联系TA</div>
      </template>
      <div class="relation-content">
          <el-form v-if="!showTel" :model="form" label-width="auto">
            <el-form-item label="公司名称" required>
              <el-input v-model="form.company"></el-input>
            </el-form-item>
            <el-form-item label="姓名" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" required>
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="意愿说明" required>
              <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
          </el-form>

          <div v-if="showTel">
            <div>商家会尽快和您取得联系，请保持电话畅通，您也可以主动联系商家</div>
            <div class="price-cell">
              <img src="@/assets/warehouse/head.jpg" alt="" style="width: 100px">
              <div >
                <div >{{ data.user.name }}</div>
                <div style="margin-top: 4px"><span class="price-base">所属公司：</span>{{ data.user.company }}</div>
                <div style="margin-top: 4px"><span class="price-base">营业执照编码：</span>{{ data.user.code }}</div>
                <div style="margin-top: 4px"><span class="price-base">联系电话：</span>{{ data.user.tel }}</div>
                <div style="margin-top: 4px">
                  <span class="price-base">公司官网：</span>
                  <span class="link">{{ data.user.href }}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
      <template #footer>
        <span  class="dialog-footer">
          <w-button v-if="!showTel" type="primary" style="margin-left: 16px;" @click="showTel = true">发送</w-button>
          <w-button v-if="!showTel" @click="cancel">取消</w-button>
          <w-button v-if="showTel" type="primary" @click="cancel">知道了</w-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props  = defineProps({
  width: {
    default: 100
  },
  data: {}
})

const showRelation = ref(false)
const showTel = ref(false)
const form = ref({
  company: '天津东疆供应链服务有限公司',
  name: '田磊',
  tel: '16777678909',
  desc: ''
})

// 联系TA
function handleRelation() {
  showRelation.value = true
}

// 关闭弹窗
function cancel() {
  showRelation.value = false
  showTel.value = false
}
</script>

<style lang="scss" scoped>
.relation-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.price-cell {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 12px 0;
  .price-cell-item {
    width: 33%;
  }
}

.price-base {
  color: #999;
}
.link {
  color: #3470ff;
  cursor: pointer;
}
</style>