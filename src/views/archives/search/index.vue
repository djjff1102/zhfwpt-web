<template>
  <div>
    <div class="search">
      <h2 class="search-title">精准数据，助力商业决策每一步.</h2>
      <!-- <div class="search-input"> -->
      <w-input-search
        :style="{ width: '60%' }"
        placeholder="请输入企业名称、人名、注册号、同一社会信"
      />
      <!-- </div> -->
    </div>
    <div class="company-list">
      <CompanyCard></CompanyCard>
      <CompanyCard></CompanyCard>
    </div>
  </div>
</template>
<script setup>
import CompanyCard from "./components/CompanyCard.vue";
</script>
<style lang="scss" scoped>
.search {
  width: 100%;
  height: 270px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
  border-radius: 4px;
  .search-title {
    font-weight: bold;
    font-size: 28px;
    color: #ffffff;
    line-height: 22px;
    letter-spacing: 1px;
    text-align: center;
  }
}
.company-list {
  position: relative;
  top: -40px;
  margin: 0 23px;
  border-radius: 4px;
  overflow: hidden;
}
</style>
