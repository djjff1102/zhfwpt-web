<template>
  <div
    class="company-search-container"
    style="overflow: hidden">
    <div class="search">
      <h2 class="search-title">精准数据，助力商业决策每一步</h2>
      <!-- <div class="search-input"> -->
      <w-input-search
        v-model="searchPar.allContentSearch"
        :style="{ width: '60%' }"
        placeholder="请输入企业名称、法定代表人、工商注册号、统一社会信用代码"
        @change="handleSearch"
        @search="handleSearch"
      />
      <!-- </div> -->
    </div>
    <!-- 外面这层解决top为负数，导致底部缺一块 -->
    <div class="bg-#fff mx-23px result-wrap" >
      <div class="search-result"
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-immediate-check="false"
        :infinite-scroll-disabled="scrollDisabled"
        :infinite-scroll-watch-disabled="scrollDisabled"
        :infinite-scroll-distance="20">
        <div class="search-brief">
          <div class="attention mb-12px">
            <span class="label">关注企业：</span>
            <div class="label-value">
              <span
                >当前关注企业
                <span class="text-#3470FF">{{ formatNumber(attentResult?.attentionCount) }}</span> 家，其中风险等级较高的
                <span class="text-#F76161">{{ formatNumber(attentResult?.riskInfo?.mediumRiskNum) }}</span> 家，风险等级一般的
                <span class="text-#FF9100">{{ formatNumber(attentResult?.riskInfo?.lowRiskNum) }}</span> 家，风险等级较低的</span>
                <span class="text-#0594EB">{{ formatNumber(attentResult?.riskInfo?.mediumRiskNum) }}</span> 家
            </div>
          </div>
          <div class="result-count mb-12px">
            <span class="label">检索结果：</span>
            <span class="label-value">
              为您找到 <span class="text-#3470FF">{{ total }}</span> 条相关结果
            </span>
          </div>
          <div v-show="isOpen">
            <SingleSelect
            title="省份地区"
            :list="provinceResult"
            :transformLabel="{value: 'province_short', key: 'province_short', extra: 'count'}"
            :extraContent="true"
            @updateSeach="handleSearchProvince"
            ></SingleSelect>
            <SingleSelect
              title="注册资本(￥)"
              :list="registerMoney"
              :customFun="true"
              customFunType="number"
              @updateSeach="handleSearchMoney"
            ></SingleSelect>
            <SingleSelect
              title="成立时间"
              :list="establishDate"
              :customFun="true"
              customFunType="date"
              @updateSeach="handleSearchMoney"
            ></SingleSelect>
            <SingleSelect
              title="企业类型"
              :list="companyTypeObj"
              @updateSeach="handleSearchMoney"
            ></SingleSelect>
          </div>
          <el-divider style=" position: absolute; bottom: 15px; left: 0px;">
            <span @click="isOpen = !isOpen" class="text-[#3470FF] open-btn">
              {{ isOpen ? "收起" : "展开" }}
              <el-icon :class="[!isOpen?'more-icon':'close-more-icon']"><DArrowRight /></el-icon>
            </span>
          </el-divider>
        </div>
        
        <!-- <el-divider></el-divider> -->

        <NoMatch v-if="isEmpty && !loading" class="mt-60px"></NoMatch>
        <div class="company-list">
          <CompanyCard v-for="(item, i) in tableData" 
            :key="i" 
            :comData="item" 
            :indexID="i" 
            :search="searchPar.allContentSearch" 
            @refresh="refresh"
          ></CompanyCard>
          <div v-if="scrollDisabled && tableData.length > 0" class="load-finish">数据加载完</div>
        </div>
        <m-backtop target=".search-result"></m-backtop >
      </div>
    </div>
  </div>
</template>
<script setup>
import CompanyCard from "./components/CompanyCard.vue";
import NoMatch from "./components/NoMatch.vue";
import { companyList, attentionTotal, groupByProvince } from '@/api/archives/index'
import { useUserStoreHook } from "@/store/modules/user";
import { formatNumber } from '@/utils/common'
import { establishDate, registerMoney, companyTypeObj } from '@/utils/baseType'

const userStore = useUserStoreHook();

const isOver = ref(false);
const isOpen = ref(true);
const tableData = ref([]); // 企业列表
const searchPar = ref({
  page_size: 10,
  page: 1,
  allContentSearch: '',  //综合查询输入
  provinceShort: '', // 省份
  userId: userStore.user.id
})
const total = ref(0) // 查询结果总数量
const loading = ref(false); // 加载
const attentResult = ref({}) // 企业关注统计
const provinceResult = ref() // 省份分布
// const curProvince = ref('')

const scrollDisabled = computed(() => {
  return tableData.value.length >= total.value;
  // if(tableData.value.length > 0) {
  //   return tableData.value.length >= total.value;
  // }
  // return false;
})
// const maxHeight = computed(() => (isOpen.value ? "auto" : "22px"));

const isEmpty = computed(() => {
  return tableData.value.length === 0;
});

// let toggleOpen = () => {
//   isOpen.value = !isOpen.value;
// };

let computeHeight = () => {
  const areaListDom = document.querySelector(".area-list");
  isOver.value = areaListDom.clientHeight > 30;
};

// 关注/取消关注后，本地刷新关注状态
function refresh(i) {
  tableData.value[i].attention = !tableData.value[i].attention;
}

function handleSearchProvince(item) {
  if(!item) {
    searchPar.value.provinceShort = '';
    // curProvince.value = '';
  } else {
    searchPar.value.provinceShort = item.key;
    // curProvince.value = item.province_short;
    
  }
  searchPar.value.page = 1;
  loading.value = true;
  tableData.value = [];
  loadPage();
}

// 注册资本
function handleSearchMoney() {

}

// 企业搜索 重置pageNum
function handleSearch() {
  searchPar.value.page = 1;
  loading.value = true;
  tableData.value = [];
  loadPage();
  getProvince();
}

// 加载下一页数据
function loadPage() {
  companyList(searchPar.value).then(res => {
    tableData.value.push(...res.data)
    total.value = res.total;
    loading.value = false;
  }).catch(err => {
    loading.value = false;
  })
}

function getAttentionTotal() {
  attentionTotal({
    userId: userStore.user.id
  }).then(res => {
    attentResult.value = res.data;
  }).catch(err => {

  });
}

function getProvince() {
  groupByProvince({
    provinceShort: searchPar.value.provinceShort,
    allContentSearch: searchPar.value.allContentSearch
  }).then(res => {
    provinceResult.value = res.data;
  }).catch(err => {

  })
}

// 滚动加载
function handleInfiniteOnLoad() {
  if(loading.value || scrollDisabled.value) return;
  loading.value = true;
  searchPar.value.page += 1
  loadPage();
}


// getAttentionTotal(); // 获取关注企业的各个等级划分
getProvince(); // 获取省份地区分组统计
loadPage();

onMounted(() => {
  computeHeight();
});
</script>
<style lang="scss" scoped>
.company-list {
  padding: 0 24px;
}
.active-province {
  color: rgba(52, 112, 255, 1);
}
.company-search-container {
  height: 100%;
  overflow: auto;
}

.search {
  width: 100%;
  height: 190px;
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: url("@/assets/images/banner.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  padding-bottom: 64px;
  .search-title {
    font-weight: bold;
    font-size: 28px;
    color: #ffffff;
    line-height: 22px;
    letter-spacing: 1px;
    text-align: center;
    font-family: myFontALHT;
  }
}
.search-brief {
  position: sticky;
  top: 0;
  padding: 20px 24px 30px 24px;
  background-color: #fff;
  z-index:9;
  .label {
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
    line-height: 22px;
    width: 94px;
    text-align: right;
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
  height: calc(100vh - 316px);
  overflow: auto;
  // padding: 20px 14px;
  z-index: 1;
  position: relative;
  top: -23px;
  // margin: 0 23px;
  border-radius: 4px;
  background-color: #fff;
}
.no-match {
  height: auto;
}
.load-finish {
  text-align: center;
  font-size: 14px;
  color: #BFC4CD;
}
:deep(.w-icon-hover) {
  &::before {
    display: none;
  }
}
:deep(.w-icon-hover) {
  position: static;
  svg{
    color: #BFC4CD;
  }
}

:deep(.w-icon-hover:hover) {
  background: rgba(0,0,0,0);
  svg{
    color: #3470ff;
    background: rgba(0,0,0,0);
  }
}

:deep(.w-icon-hover:active) {
  svg{
    color: #1346c0;
  }
}

:deep(.w-input) {
  border-right: solid 1px rgba(237, 241, 252, 1)
}

:deep(.w-input-wrapper) {
  padding-right: 8px;
}

:deep(.w-input-wrapper .w-input-suffix) {
  padding-left: 8px;
  svg {
    width: 18px;
    height: 18px;
  }
}
.more-icon {
  margin-left: 4px;
  transform: rotate(90deg);
}
.close-more-icon {
  margin-left: 4px;
  transform: rotate(270deg);
}
.open-btn{ 
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
