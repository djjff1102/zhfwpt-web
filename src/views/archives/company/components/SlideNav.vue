<template>
  <!-- <Teleport to="body"> -->
  <div
    class="slide-nav"
    :style="{
      transform: `translateX(${isShowSlideNav ? '0px' : '142px'})`,
    }"
  >
    <div class="toggle" @click="toggleNav">
      <el-icon v-if="isShowSlideNav"
        ><DArrowRight style="color: #0a6dff"
      /></el-icon>
      <el-icon v-else><DArrowLeft style="color: #0a6dff" /></el-icon>
    </div>
    <div class="nav-list">
      <div
        class="nav-item"
        :class="{
          active: activeNav === item.id,
        }"
        v-for="item in navList"
        v-hasPerm="approvalMapping[item.id]"
        :key="item.name"
      >
        <View
          v-show="item.show"
          @click="toggleShow(item, false)"
          style="width: 1em; height: 1em; margin-right: 8px"
        />
        <Hide
          v-show="!item.show"
          @click="toggleShow(item, true)"
          style="width: 1em; height: 1em; margin-right: 8px"
        />
        <span @click="scrollTo(item)">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <!-- </Teleport> -->

</template>
<script setup>
import { approvalMapping } from '@/router/permissionCode'
let navList = ref([
  {
    id: "BusinessInformation",
    name: "企业工商信息",
    scoll: 0,
    show: true,
  },
  {
    id: "RiskValueAssessment",
    name: "信用值评估",
    scoll: 0,
    show: true,
  },
  {
    id: "ExcessInvoiceApproval",
    name: "发票审批信息",
    scoll: 0,
    show: true,
  },
  {
    id: "ManagementInformation",
    name: "经营信息",
    scoll: 0,
    show: true,
  },
  {
    id: "OrderInformation",
    name: "订单信息",
    scoll: 0,
    show: true,
  },
  {
    id: "TransactionVoucher",
    name: "合同信息",
    scoll: 0,
    show: true,
  },
  {
    id: "InvoiceInformation",
    name: "发票信息",
    scoll: 0,
    show: true,
  },
  {
    id: "AccountStatement",
    name: "银行流水",
    scoll: 0,
    show: true,
  },
  {
    id: "LogisticsWarehousingInformation",
    name: "物流仓储信息",
    scoll: 0,
    show: true,
  }
  // {
  //   id: "GoodsInformation",
  //   name: "主营商品信息",
  //   scoll: 0,
  //   show: true,
  // },
]);
const isShowSlideNav = ref(true);
const activeNav = ref("BusinessInformation");
const disableScoll = ref(false);
const scrollTo = (item) => {
  if (!item.show) {
    return;
  }
  activeNav.value = item.id;
  disableScoll.value = true;
  setTimeout(() => {
    disableScoll.value = false;
  }, 1000);
  const element = document.getElementById(item.id);
  const distanceToTop = element.offsetTop;
  document.querySelector(".company-content").scrollTo({
    top:distanceToTop,
    // behavior: "smooth",
  });
};
const toggleShow = (nav, isShow) => {
  document.getElementById(`${nav.id}`).style.display = isShow
    ? "block"
    : "none";
  nav.show = isShow;
  // nextTick(() => {
  //   getOffsetTop(navList);
  // });
};
const toggleNav = () => {
  return (isShowSlideNav.value = !isShowSlideNav.value);
};
const scollEvent = () => {
  let event = (e) => {
    if (disableScoll.value) {
      return;
    }
    navList.value.map((item) => {
      const element = document.getElementById(item.id);
      const distanceToTop = element.offsetTop;
      if (e.target.scrollTop + 100 >= distanceToTop && item.show) {
        activeNav.value = item.id;
      }
    });
  };
  document.querySelector(".company-content").addEventListener("scroll", event);
};

// let getOffsetTop = (navList) => {
//   navList.value.map((item) => {
//     item.scoll = document.getElementById(item.id).offsetTop;
//   });
// };

// 从子模块详情页会公司详情页，做定位
function renderPage() {
  const localId = sessionStorage.getItem('detailId')
  if(localId) {
    const element = document.getElementById(localId);
    const distanceToTop = element.offsetTop;
    document.querySelector(".company-content").scrollTo({
      top:distanceToTop,
    });
    sessionStorage.removeItem('detailId')
  }
}

onMounted(() => {
  nextTick(() => {
    scollEvent();
    renderPage()
    // getOffsetTop(navList);
    // setTimeout(() => {getOffsetTop(navList);}, 2000)
  });
});
</script>
<style lang="scss">
.slide-nav {
  z-index: 9999;
  width: 141px;
  transition: all 0.3s;
  position: absolute;
  right: 0px;
  top: 50%;
  translate: 0 -50%;
  background: #ffffff;
  box-shadow: -8px 0px 15px 0px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  line-height: 36px;

  color: #999999;
  .nav-item {
    padding-left: 8px;
    cursor: pointer;
    &.active {
      color: #ffffff !important;
      background-color: #3470ff;
      span:hover {
        color: #fff;
      }
    }
    span:hover {
      color: #1890ff;
    }
  }
  .toggle {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 18px;
    height: 120px;
    background: #ffffff;
    box-shadow: -8px 0px 15px 0px rgba(0, 0, 0, 0.04);
    border-radius: 8px 0px 0px 8px;
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
