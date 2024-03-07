<template>
  <div class="company-container">
    <div class="company-wrap">
      <div class="company-logo">
        <img src="" alt="" />
      </div>
      <div class="company-desc">
        <div class="company-name">
          <span class="mr-12px">深圳前途科技有限公司</span>
          <el-tag round effect="light" type="success">存续</el-tag>
        </div>
        <div class="company-tags">
          <el-tag round effect="light" type="primary">小微企业</el-tag>
        </div>
        <div class="desc-info">
          <div class="desc-item">
            <div class="desc-label">法定代表人：</div>
            <div class="desc-value">张德正</div>
          </div>
          <div class="desc-item">
            <div class="desc-label">注册资本：</div>
            <div class="desc-value">139798.5564万美元</div>
          </div>
          <div class="desc-item">
            <span class="desc-label">成立日期：</span>
            <span class="desc-value">2019-10-21</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">统一社会信用代码：</span>
            <span class="desc-value">91440300MA5FFW09283</span>
          </div>
        </div>
        <el-divider border-style="dashed" />
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">电话：</span>
            <span class="desc-value">010-8912****</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">邮箱：</span>
            <span class="desc-value">j****g@jd.com</span>
          </div>
          <div class="desc-item">
            <span class="desc-label">官网：</span>
            <span class="desc-value">-</span>
          </div>
        </div>
      
        <div class="desc-info">
          <div class="desc-item">
            <span class="desc-label">地址：</span>
            <span class="desc-value"
              >北京市北京经济技术开发区科创十一街18号C座2层201室</span
            >
          </div>
        </div>
      </div>
      <w-button class="absolute right-0 top-39px" type="primary">
        <template #icon>
        <i class="iconfont icon-guanzhu-xian"></i>
        </template>
        <template #default>关注</template>
      </w-button>
    </div>
  </div>
</template>
<script setup>
import { IconDelete } from "winbox-ui-next/es/icon";
</script>
<style lang="scss" scoped>
.company-container {
  background-color: #fff;
  padding: 24px;
  border-bottom: 1px solid #eeeeee;
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
