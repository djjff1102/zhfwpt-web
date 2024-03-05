
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
        91440300MA5FFW09283
      </el-descriptions-item>
      <el-descriptions-item label="企业名称" :span="2">
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="法定代表人"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="经营状态"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="成立时间"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="注册资本"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="实缴资本"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="工商注册号"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="纳税人识别号"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="所属行业"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="主管税务机关"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="纳税人资质"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="国标行业"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="金属及金属矿批发">
        Suzhou
      </el-descriptions-item>
      <el-descriptions-item label="联系电话"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="邮箱"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="官网"> Suzhou </el-descriptions-item>
      <el-descriptions-item label="注册地址" :span="3">
        Suzhou
      </el-descriptions-item>
      <el-descriptions-item label="经营范围" :span="3">
        Suzhou
      </el-descriptions-item>
    </el-descriptions>
  </div>
  <el-divider>
    <span @click="isOpen = !isOpen" class="text-[#3470FF]"
      >{{ isOpen ? "收起" : "展开" }}详情</span
    >
  </el-divider>
</template>
<script setup>
const isOpen = ref(false);
</script>
<style lang="">
</style>
