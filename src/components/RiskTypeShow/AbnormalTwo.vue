<template>
  <div class="content-one">
    <div class="risk-result">深圳市超级饰科技有限公司重庆市第三分公司，于2022年08月04日注销。</div>
    <el-descriptions class="margin-top" :column="2" border style="margin: 16px 0">
      <el-descriptions-item label="经营范围">
        一般项目:金属材料销售;金属矿石销售;化工产品销售(不含许可类化工产品);金属制品销售;货物进出口;技术进出口;贸易经纪;国内贸易代理,信息咨询服务(不含许可类信息咨询服务);进出口代理:技术服务、技术开发、技术咨询、技术交流、技术转让、技术推广:供应链管理服务;金属链条及其他金属制品销售。许可项目:道路货物运输(网络货运)。(依法须经批准的项目,经相关部门批准后方可开展经营活动,具体经营项目以相关部门批准文件或许可证件为准)(除依法须经批准的项目外,凭营业执照依法自主开展经营活动)(不得投资《外商投资准入负面清单》中禁止外商投资的领域)
      </el-descriptions-item>
    </el-descriptions>
    <m-table></m-table>
  </div>
</template>

<script setup>
const props = defineProps({
  info: { // 风险信息
    default: {}
  }
})
</script>

<style lang="scss" scoped>
.content-one {
  padding: 16px 24px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  .risk-result {
    background: #FFF4E5;
    border-radius: 8px;
    border: 1px solid #FF9100;
    padding: 14px;
  }
  .risk-reason {
    margin-top: 16px;
    display: flex;
    justify-content: flex-start;
    div:first-child {
      flex-shrink: 0;
    }
  }
}
:deep(.el-descriptions__cell) {
  width: 100px;
}
</style>
