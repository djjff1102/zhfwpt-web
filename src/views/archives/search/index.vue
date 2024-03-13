<template>
  <div
    class="company-search-container"
    style="overflow: hidden">
    <div class="search">
      <h2 class="search-title">精准数据，助力商业决策每一步.</h2>
      <!-- <div class="search-input"> -->
      <w-input-search
        v-model="searchPar.allContentSearch"
        :style="{ width: '60%' }"
        placeholder="请输入企业名称、人名、注册号、同一社会信"
        @change="handleSearch"
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
          <div class="attention mb-10px">
            <span class="label">关注企业：</span>
            <div class="label-value">
              <span
                >当前关注企业
                <span class="text-#3470FF">{{ attentResult.attentionCount }}</span> 家，其中风险等级较高的
                <span class="text-#F76161">{{ attentResult.highRiskCount }}</span> 家，风险等级一般的
                <span class="text-#0594EB">{{ attentResult.normalRiskCount }}</span> 家</span
              >
            </div>
          </div>
          <div class="result-count mb-10px">
            <span class="label">检索结果：</span>
            <span class="label-value">
              为您找到 <span class="text-#3470FF">{{ total }}</span> 条相关结果
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
              <span class="area-tag" :class="{'active-province': !curProvince}" @click="handleSearchProvince">全部</span>
              <span v-for="(item, i) in provinceResult" :key="i" class="area-tag" :class="{'active-province': curProvince === item.province_short }" @click="handleSearchProvince(item)">{{ item.province_short }}({{ item.count }})</span>
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
          <CompanyCard v-for="(item, i) in tableData" :key="i" :comData="item" :indexID="i" @refresh="refresh"></CompanyCard>
          <div v-if="scrollDisabled && tableData.length > 0" class="load-finish">数据加载完</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CompanyCard from "./components/CompanyCard.vue";
import NoMatch from "./components/NoMatch.vue";
import { companyList, attentionTotal, groupByProvince } from '@/api/archives/index'
import { useUserStoreHook } from "@/store/modules/user";

const userStore = useUserStoreHook();

const isOver = ref(false);
const isOpen = ref(true);
const tableData = ref([]); // 企业列表
const searchPar = ref({
  pageSize: 10,
  pageNumber: 1,
  allContentSearch: '',  //综合查询输入
  provinceShort: '', // 省份
  userId: userStore.user.id
})
const total = ref(0) // 查询结果总数量
const loading = ref(false); // 加载
const attentResult = ref({}) // 企业关注统计
const provinceResult = ref() // 省份分布
const curProvince = ref('')

const scrollDisabled = computed(() => {
  return tableData.value.length >= total.value;
  // if(tableData.value.length > 0) {
  //   return tableData.value.length >= total.value;
  // }
  // return false;
})
const maxHeight = computed(() => (isOpen.value ? "auto" : "22px"));

const isEmpty = computed(() => {
  return tableData.value.length === 0;
});

let toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

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
    curProvince.value = '';
  } else {
    searchPar.value.provinceShort = item.province_short;
    curProvince.value = item.province_short;
    
  }
  searchPar.value.pageNumber = 1;
  loading.value = true;
  tableData.value = [];
  loadPage();
}

// 企业搜索 重置pageNum
function handleSearch() {
  searchPar.value.pageNumber = 1;
  loading.value = true;
  tableData.value = [];
  loadPage();
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
  loadPage();
}


getAttentionTotal(); // 获取关注统计
getProvince(); // 获取省份地区分组统计

loadPage();
onMounted(() => {
  computeHeight();
});
</script>
<style lang="scss" scoped>
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
  height: calc(100vh - 316px);
  overflow: auto;
  padding: 20px 14px;
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
</style>
