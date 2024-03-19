<template>
  <div class="company-container" @click="handleCompanyDetail(comData)">
    <div class="company-wrap">
      <div class="company-logo">
         <img src="../../../../assets/base/default.png" alt="" />
      </div>
      <div class="company-desc">
        <div class="company-name">
          <span class="mr-12px">{{ comData?.companyName }}</span>
          <el-tag round effect="light" type="success">{{comData?.companyStatus}}</el-tag>
        </div>
        <div class="company-tags">
          <el-tag round effect="light" type="primary">{{ comData?.companyType }}</el-tag>
        </div>
        <div class="desc-info">
          <div class="desc-item">
            <div class="desc-label">法定代表人：</div>
            <div class="desc-value">{{ comData?.legalPersonCaption }}</div>
          </div>
          <div class="desc-item">
            <div class="desc-label">注册资本：</div>
            <div class="desc-value">{{ comData?.capital }}</div>
          </div>
          <div class="desc-item">
            <span class="desc-label">成立日期：</span>
            <span class="desc-value">{{ comData?.createTime }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">统一社会信用代码：</span>
            <span class="desc-value">{{ comData?.creditNo }}</span>
          </div>
        </div>
        <el-divider border-style="dashed" />
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">电话：</span>
            <span class="desc-value">{{ comData?.companyPhone }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">邮箱：</span>
            <span class="desc-value">{{ comData?.companyEmail }}</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">官网：</span>
            <span class="desc-value">-</span>
          </div>
        </div>
      
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">地址：</span>
            <span class="desc-value">{{ comData?.companyAddress }}</span
            >
          </div>
        </div>
      </div>
      <el-button class="absolute right-0 top-39px" :type="btnType(comData?.attention)" @click.stop="handleAttention(comData)">
        <template #icon>
        <i  v-if="comData?.attention" class="iconfont icon-guanzhu-mian"></i>
        <i v-else class="iconfont icon-guanzhu-xian"></i>
        </template>
        <template #default>关注</template>
      </el-button>
    </div>
  </div>
</template>
<script setup>
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
      company: JSON.stringify(d)
    }
  });
}


// 关注、取消关注
function handleAttention(d) {
  console.log('关注list：', d)
  const data = {
    companyIdList: [d?.companyId],
    userId: userStore?.user?.id,
    attention: !d?.attention
  }
  payAttention(data).then(res => {
    emits('refresh', props.indexID); // 前端本地刷新数据
  }).catch(err => {
    
  })
}
</script>
<style lang="scss" scoped>
.company-container {
  background-color: #fff;
  padding: 24px;
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
  display: inline;
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 22px;
}
.desc-value {
  color: #333333;
}
::v-deep .el-divider--horizontal {
  margin: 6px 0;
}
</style>
