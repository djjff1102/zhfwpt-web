<template>
  <div class="company-container" @click="handleCompanyDetail(comData)">
    <div class="company-wrap">
      <div class="company-logo">
         <img src="../../../../assets/base/default.png" alt="" />
      </div>
      <div class="company-desc">
        <div class="company-name">
          <!-- <span class="mr-12px">{{ comData?.companyName }}</span> -->
          <span class="mr-12px" v-html="highlightedText"></span>
          <el-tag round effect="light" type="success">{{comData?.companyStatus || '--'}}</el-tag>
        </div>
        <div class="company-tags">
          <el-tag round effect="light" type="primary">{{ comData?.companyType || '--' }}</el-tag>
        </div>
        <div class="desc-info">
          <div class="desc-item">
            <div class="desc-label">法定代表人：</div>
            <div class="desc-value">{{ comData?.legalPerson || '--' }}</div>
          </div>
          <div class="desc-item">
            <div class="desc-label">注册资本：</div>
            <div class="desc-value">{{ comData?.capital || '--' }}</div>
          </div>
          <div class="desc-item">
            <span class="desc-label">成立日期：</span>
            <span class="desc-value">{{ comData?.establishDate || '--' }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">统一社会信用代码：</span>
            <span class="desc-value">{{ comData?.creditNo || '--' }}</span>
          </div>
        </div>
        <el-divider border-style="dashed" />
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">电话：</span>
            <span class="desc-value">{{ comData?.companyPhone || '--' }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">邮箱：</span>
            <span class="desc-value">{{ comData?.companyEmail || '无' }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">官网：</span>
            <span class="desc-value" style="width: 400px">{{ comData?.websiteUrl || '--' }}</span>
          </div>
        </div>
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">地址：</span>
            <span class="desc-value" style="width: 900px">{{ comData?.companyAddress || '--' }}</span
            >
          </div>
        </div>
        <div class="desc-info">
          <div class="desc-item predict-danger" v-if="riskAndCountArry && riskAndCountArry.length > 0">
            <span class="predict-danger-title"><i class="iconfont icon-fengxianzhipinggu"></i>风险预警</span>
            <span class="predict-danger-item" v-for="(item ,i) in riskAndCountArry" :key="i" :class="{'hide-more': i > 0 && !showRiskAll}">
              <span class="predict-danger-label">{{ comData?.riskAndCount[item] }}</span>
              <!-- <span class="predict-danger-label">{{ 1 }}</span> -->
              <span class="predict-danger-text"> 条 {{ item }}</span>
            </span>
            <!-- <i @click="handleMore" v-if="riskAndCountArry && riskAndCountArry.length > 1 && !showRiskAll" class="iconfont icon-xiayibu"></i> -->
          </div>
        </div>
      </div>
      <w-button class="absolute right-0 top-39px" :type="btnType(comData?.attention)" @click.stop="handleAttention(comData)">
        <template #icon>
        <i v-if="comData?.attention" class="iconfont icon-guanzhu-mian"></i>
        <i v-else class="iconfont icon-guanzhu-xian"></i>
        </template>
        <template #default>{{ comData?.attention ? '已关注' : '关注' }}</template>
      </w-button>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { payAttention } from '@/api/archives';
import { useUserStoreHook } from "@/store/modules/user";

const userStore = useUserStoreHook();
const router = useRouter();

const props = defineProps({
  comData: {
    default: {}
  },
  indexID: {
    default: 0
  },
  search: {
    default: ''
  }
})

const showRiskAll = ref(false)

const highlightedText = computed(() => {
  if (props.search) {
    const regex = new RegExp(props.search, 'gi');
    return props.comData?.companyName.replace(regex, match => `<span style="color:#F76161 ">${match}</span>`);
  } else {
    return props.comData?.companyName;
  }
})

// 处理风险预警值
const riskAndCountArry = computed(() => {
  if(!props.comData?.riskAndCount || JSON.stringify(props.comData?.riskAndCount) == '{}' || JSON.stringify(props.comData?.riskAndCount) == 'null') {
    return [];
  } else {
    const keys = Object.keys(props.comData?.riskAndCount);
    return keys;
  }
})

const emits = defineEmits(['refresh'])

function btnType(v) {
  return v ? 'primary' : 'outline'
}

function handleCompanyDetail(d) {
  // 跳转企业详情
  router.push({ 
    path: '/archives/companyDetail', 
    query: {
      companyId: d.companyId,
      companyName: d.companyName
    }
  });
}


// 关注、取消关注
function handleAttention(d) {
  const data = {
    companyIdList: [d?.companyId],
    userId: userStore?.user?.id,
    attention: !d?.attention
  }
  payAttention(data).then(res => {
    if(d?.attention) {
      ElMessage.warning("已取消关注该企业");
    } else {
      ElMessage.success("已关注该企业, 您关注的企业收录在[ 我关注的]模块");
    }
    emits('refresh', props.indexID); // 前端本地刷新数据
  }).catch(err => {
    
  })
}
</script>
<style lang="scss" scoped>
.predict-danger {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: rgba(247, 97, 97, 0.1);
  border-radius: 12px;
  line-height: 22px;
  padding: 0 12px;
}
.predict-danger-title {
  height: 22px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #F76161;
  line-height: 22px;
  text-align: right;
  font-style: normal;
  display: inline-block;
  padding-right: 8px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 12px;
    width: 1px;
    background: #fff;
    right: 0;
    top: 5px;
  }
}
.predict-danger-item {
  display: inline-block;
  padding: 0 8px;
  font-size: 12px;
  .predict-danger-label {
    color: #F76161;
  }
}
.hide-more {
  // display: none;
}
.company-container {
  background-color: #fff;
  padding: 24px 0;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
}
.company-wrap {
  position: relative;
  display: flex;
}
.company-logo {
  img {
    width: 68px;
    height: 68px;
  }
}
.company-desc {
  flex: 1;
  padding-left: 20px;
}
.company-name {
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  line-height: 28px;
}
.company-tags {
  margin: 13px 0 13px 0px;
}
.desc-info {
  display: flex;
  .desc-item:last-child {
    margin-right: 0;
  }
  .desc-item {
    line-height: 32px;
    margin-right: 18px;
  }
}
.desc-label,
.desc-value {
  display: inline-block;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.desc-value {
  color: #333333;
}
::v-deep .el-divider--horizontal {
  margin: 6px 0;
}
:deep(.el-tag) {
  border: none;
}
:deep(.el-tag--success) {
  background: rgba(43, 194, 171, 0.10);
}
:deep(.el-tag--primary) {
  background: rgba(122, 193, 234, 0.10);
}
</style>
