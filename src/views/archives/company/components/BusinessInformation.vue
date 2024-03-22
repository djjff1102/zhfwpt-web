
<template>
  <!-- 企业工商信息 -->
  <div
    :style="{
      height: isOpen ? 'auto' : '93px',
      overflow: 'hidden',
    }"
  >
    <el-descriptions class="margin-top" :column="3" border>
      <el-descriptions-item label="统一社会信用代码">
        {{ data?.creditNo  }}
      </el-descriptions-item>
      <el-descriptions-item label="企业名称" :span="2">
        {{ data?.companyName }}
      </el-descriptions-item>
      <el-descriptions-item label="法定代表人"> {{ data?.legalPerson }} </el-descriptions-item>
      <el-descriptions-item label="经营状态"> {{ data?.companyStatus }} </el-descriptions-item>
      <el-descriptions-item label="成立时间"> {{ data?.establishDate }} </el-descriptions-item>
      <el-descriptions-item label="注册资本"> {{ data?.capital }} </el-descriptions-item>
      <el-descriptions-item label="实缴资本"> {{ data?.realCapital }} </el-descriptions-item>
      <el-descriptions-item label="工商注册号"> {{ data?.companyCode }} </el-descriptions-item>
      <el-descriptions-item label="纳税人识别号"> {{ data?.taxCode }} </el-descriptions-item>
      <el-descriptions-item label="所属行业"> {{ data?.industry }} </el-descriptions-item>
      <el-descriptions-item label="人员规模"> {{ data?.personQuantity }} </el-descriptions-item>
      <el-descriptions-item label="企业类型">{{ data?.companyType }} </el-descriptions-item>
      <el-descriptions-item label="所属地区">{{ data.provinceShort }}</el-descriptions-item>

      <el-descriptions-item label="主管税务机关"> {{ data?.taxAuthority }} </el-descriptions-item>
      <el-descriptions-item label="纳税人资质"> {{ data?.taxType }} </el-descriptions-item>
      <el-descriptions-item label="国标行业"> {{ data?.standardIndustry }} </el-descriptions-item>
      <el-descriptions-item label="进出口企业代码">
        {{ data?.inOutCompanyCode }}
      </el-descriptions-item>
      <el-descriptions-item label="联系电话"> {{ data?.companyPhone }} </el-descriptions-item>
      <el-descriptions-item label="邮箱"> {{ data?.companyEmail }} </el-descriptions-item>
      <el-descriptions-item label="官网"> {{ data?.websiteUrl }} </el-descriptions-item>
      <el-descriptions-item label="注册地址" :span="3">
        {{ data?.workAddress }}？？
      </el-descriptions-item>
      <el-descriptions-item label="经营范围" :span="3">
        {{ data?.businessScope }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <el-divider>
    <span @click="isOpen = !isOpen" class="text-[#3470FF] open-btn"
      >{{ isOpen ? "收起" : "展开" }}详情</span
    >
  </el-divider>
</template>
<script setup>
const props = defineProps({
  data: {
    default: {}
  }
})
const isOpen = ref(false);
</script>
<style lang="scss">
.open-btn {
  cursor: pointer;
}
:deep(.el-descriptions__label) {
  width: auto;
}
</style>
