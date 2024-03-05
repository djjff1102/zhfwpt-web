<template>
  <div class="company-search-container">
    <div class="search">
      <h2 class="search-title">精准数据，助力商业决策每一步.</h2>
      <!-- <div class="search-input"> -->
      <w-input-search
        :style="{ width: '60%' }"
        placeholder="请输入企业名称、人名、注册号、同一社会信"
      />
      <!-- </div> -->
    </div>
    <!-- 外面这层解决top为负数，导致底部缺一块 -->
    <div class="bg-#fff mx-23px">
      <div class="search-result">
        <div class="search-brief">
          <div class="attention mb-10px">
            <span class="label">关注企业：</span>
            <div class="label-value">
              <span
                >当前关注企业
                <span class="text-#3470FF">25</span> 家，其中风险等级较高的
                <span class="text-#F76161">5</span> 家，风险等级一般的
                <span class="text-#0594EB">5</span> 家</span
              >
            </div>
          </div>
          <div class="result-count mb-10px">
            <span class="label">检索结果：</span>
            <span class="label-value">
              为您找到 <span class="text-#3470FF">25</span> 条相关结果
            </span>
          </div>
          <div class="area">
            <span class="label">省份地区：</span>
            <div
              class="label-value area-list"
              :style="{
                height: maxHeight,
                overflow: 'hidden',
              }"
            >
              <span class="area-tag">北京市(130)</span>
              <span class="area-tag">深圳市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
              <span class="area-tag">上海市(130)</span>
            </div>
          </div>
        </div>
        <el-divider>
          <span v-if="isOver" @click="toggleOpen" class="text-[#3470FF]"
            >{{ isOpen ? "收起" : "展开" }}详情</span
          >
        </el-divider>

        <NoMatch v-if="isEmpty" class="mt-60px"></NoMatch>
        <div class="company-list">
          <CompanyCard></CompanyCard>
          <CompanyCard></CompanyCard>
          <CompanyCard></CompanyCard>
          <CompanyCard></CompanyCard>
          <CompanyCard></CompanyCard>
          <CompanyCard></CompanyCard>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CompanyCard from "./components/CompanyCard.vue";
import NoMatch from "./components/NoMatch.vue";
const isOver = ref(false);
const isOpen = ref(true);
const maxHeight = computed(() => (isOpen.value ? "auto" : "22px"));
const isEmpty = computed(() => {
  return tableData.length > 0;
});
let toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
let computeHeight = () => {
  const areaListDom = document.querySelector(".area-list");
  isOver.value = areaListDom.clientHeight > 30;
};

const current = ref(1);
const size = ref(10);
const tableData = reactive([]);
onMounted(() => {
  computeHeight();
});
</script>
<style lang="scss" scoped>
.company-search-container {
  height: 100%;
  overflow: auto;
}
.search {
  width: 100%;
  height: 270px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/images/banner.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
.search-brief {
  padding-bottom: 10px;
  .label {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
    line-height: 22px;
  }
  .label-value {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    color: #6a6a6a;
    line-height: 22px;
  }
  .area {
    display: flex;
  }
  .area-list {
    width: calc(100% - 100px);
    display: flex;
    flex-wrap: wrap;
  }
  .area-tag {
    cursor: pointer;
    margin-right: 16px;
    margin-bottom: 5px;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
.el-divider--horizontal {
  margin: 0;
}

.search-result {
  // height: calc(100% - 270px + 40px);
  overflow: auto;
  padding: 20px 14px;
  z-index: 1;
  position: relative;
  top: -40px;
  // margin: 0 23px;
  border-radius: 4px;
  background-color: #fff;
}
</style>
