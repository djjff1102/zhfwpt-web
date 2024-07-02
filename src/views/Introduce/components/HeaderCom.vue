<template>
  <div class="header-wrap">
    <div class="header-content">
      <div class="title-wrap">
        <img src="@/assets/login/logo.png" style="height: 30px;"/>
        <span class="login-title">大宗贸易综合服务平台</span>
      </div>
      <div class="header-center">
        <div class="header-left">
          <div class="login-title-big">大宗贸易综合服务平台</div>
          <div class="header-des">大宗贸易综合服务平台是东疆商务局立足于产业发展，精心打造的大宗贸易综合服务平台，为大宗贸易企业提供了全面、便捷的一站式服务。该平台深刻洞察行业复杂需求，整合了税务合规管理、物流仓储、金融服务及政策定制等多项功能。优化发票管理，降低运营风险；撮合物流仓储供需，确保货物安全快速流通；创新金融服务，解决企业融资难题；定制政策服务，为企业创造良好发展环境。平台致力于为大宗贸易企业提供立体化服务，实现政企协同发展。</div>
        </div>
        <div class="header-right">
          <img class="card1" src="../img/card1.png" />
          <img class="card2" src="../img/card2.png" />
          <img class="card3" src="../img/card3.png" />
          <img class="card4" src="../img/card4.png" />
        </div>
      </div>

    </div>
    <div class="no-login" @click="login">请登录</div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function login() {
  router.push(
    {
      path:'/login'
    }
  )
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: myFont;
  src: url('@/assets/iconfont/aliht.ttf')
}

@keyframes bounce-down {
  25% {
    transform: translateY(-4px)
  }
  50% {
    transform: translateY(0)
  }
  75% {
    transform: translateY(4px)
  }
}

.no-login {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
}

.header-wrap {
  min-width: 1200px;
  height: 645px;
  background-position: center;
  background: url('../img/headbg.png') center center no-repeat;
  background-size: cover;
  .header-content {
    width: 1200px;
    margin: 0 auto;
  }
  .title-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-top: 21px;
  }
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .header-left {
    width: 689px;
    flex-shrink: 1;
    position: relative;
    z-index: 4;
  }

  .header-right {
    width: 608px;
    height: 432px;
    background: url('../img/headcenter.png');
    background-size: 100% 100%;
    margin-left: -110px;
    z-index: 1;
    position: relative;
    .card1 {
      width: 152px;
      position: absolute;
      right: -20px;
      top: 140px;
      animation: bounce-down 2s linear infinite;
    }
    .card2 {
      width: 152px;
      position: absolute;
      right: -25px;
      top: 270px;
      animation: bounce-down 2s linear infinite;
    }
    .card3 {
      width: 152px;
      position: absolute;
      left: 110px;
      top: 160px;
      animation: bounce-down 2s linear infinite;
    }
    .card4 {
      width: 152px;
      position: absolute;
      left: 240px;
      top: 0px;
      animation: bounce-down 2s linear infinite;
    }
  }
}

.login-title {
  font-family: myFont;
  font-weight: bold;
  font-size: 30px;
  color: rgba(52, 112, 255, 1);
  display: inline-block;
  padding-left: 12px;
}
.login-title-big {
  font-family: myFont;
  font-weight: bold;
  font-size: 50px;
  color: rgba(52, 112, 255, 1);
}
</style>