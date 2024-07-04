<template>
  <div class="user-popover-content">
    <div class="user-top flex-base-start">
      <div class="avatar w-[52px] h-[52px] mr-[16px]">
        <img
          class="!w-full !h-full object-cover"
          src="@/assets/base/avatar.svg"
          alt="avatar"
        />
      </div>
      <div class="top-right">
        <div>{{ userStore.user.name }}</div>
        <div style="padding-right: 8px;">{{ userStore?.user?.organization?.name }}<span class="split-line">|</span> {{ userStore?.user?.roleName[0] }}</div>
      </div>
    </div>
    <div class="user-bottom">
      <div class="user-item flex-base-start">
        <span class="item-label">真实姓名</span>
        <span class="item-value">{{ userStore.user.realName }}</span>
      </div>
      <div class="user-item flex-base-start">
        <span class="item-label">本次登录</span>
        <span class="item-value">{{ dayjs().format('YYYY-MM-DD HH:mm:ss') }}</span>
      </div>
      <div class="user-item flex-base-start">
        <span class="item-label">登录地区</span>
        <span class="item-value">{{ currentCity }}（{{ ip }}）</span>
      </div>
      <!-- <div class="user-item flex-base-start">
        <span class="item-label">上次登录</span>
        <span class="item-value">{{ lastLoginTime }}</span>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs from "dayjs";
import { useUserStoreHook } from "@/store/modules/user";
import axios from 'axios'

const userStore = useUserStoreHook();

let currentCity = ref('**')
let ip = ref('')
// 
function getGeolocation() {
  const geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition((r) => {
    if(r?.address?.province === r?.address?.city) {
      currentCity.value = r?.address?.city
    } else {
      currentCity.value = r?.address?.province + r?.address?.city
    }
  })
}

function getIP() {
  axios.get('https://api.ipify.org?format=json')
  .then(response => {
    ip.value = response.data.ip;
  })
  .catch(error => {
    console.error('获取IP地址出错:', error);
  });
}

getGeolocation()
getIP()

</script>
<style lang="scss" scoped>
.split-line {
  color: #BFC4CD;
  font-size: 12px;
  display: inline-block;
  padding: 0 4px;
}
.user-popover-content {
  width: 373px;
}
.user-top {
  width: 373px;
  height: 101px;
  background-image: url('@/assets/base/user-bg.svg');
  padding-left: 24px;
}
.top-right div:first-child {
  height: 25px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #000000;
  line-height: 25px;
  text-align: left;
  font-style: normal;
  margin-bottom: 8px;
}
.top-right div:nth-child(2) {
  height: 20px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #383B40;
  line-height: 20px;
  text-align: left;
  font-style: normal;
}
.user-bottom {
  padding: 24px;
  .user-item {
    margin-top: 16px;
  }
  .user-item:first-child {
    margin-top: 0;
  }
  .user-item span:first-of-type {
    display: inline-block;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    padding-right: 16px;
    flex-shrink: 0;
  }

  .user-item span:nth-child(2) {
    display: inline-block;
    flex-grow: 1;
    height: 20px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #383B40;
    line-height: 20px;
    text-align: left;
    font-style: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
