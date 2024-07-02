<template>
  <div class="introduce-main" ref="introduceDom"  @scroll="handleScroll">
    <HeaderCom></HeaderCom>
    <div class="main-content">
      <div class="tab-wrap">
        <div class="tab-item" @click="scrollToSection('section1')">
          <img src="./img/tab1.png">
          <span>应用场景</span>
        </div>
        <div class="tab-item" @click="scrollToSection('section2')">
          <img src="./img/tab2.png">
          <span>核心功能</span>
        </div>
        <div class="tab-item" @click="scrollToSection('section3')">
          <img src="./img/tab3.png">
          <span>业务情况</span>
        </div>
      </div>
      <div id="section1" class="yingyong-changjing">
        <div class="section-title-big">应用场景</div>
        <div class="section-wrap">
          <div class="section-item">
            <img src="./img/shuiwu.png">
            <div class="section-title">税务合规辅导</div>
            <div class="section-text">整合税务合规资源，提供合规辅导服务，确保企业高效、合规地处理发票申请等涉税事务，避免因税务合规问题而引发的运营风险。极大地减轻了企业的管理负担，使企业更加专注于核心业务的发展。</div>
          </div>

          <div class="section-item">
            <img src="./img/cangchu.png">
            <div class="section-title">物流仓储服务</div>
            <div class="section-text">平台与多家优质第三方服务机构签约，为大宗贸易企业提供物流仓储供需撮合服务。选择平台上提供的服务机构不仅可以提高发票超限量审批通过率，还可提供价格优惠、服务优质的物流仓储解决方案，确保企业货物安全、快速流通，为企业业务发展提供有力保障。</div>
          </div>

          <div class="section-item">
            <img src="./img/jinrong.png">
            <div class="section-title">金融服务</div>
            <div class="section-text">平台与多家金融机构建立了紧密的合作关系，为企业提供了包括融资贷款、开户、结汇等一系列金融服务。这些服务不仅利率更低、授信条件更宽松，而且能够迅速响应企业的资金需求，助力企业解决资金问题，推动业务快速发展。</div>
          </div>

          <div class="section-item">
            <img src="./img/zhengce.png">
            <div class="section-title">政策服务</div>
            <div class="section-text">根据企业的发展阶段和实际需求，平台提供了定制化的政策服务。这些政策由天津商务局依据企业实际情况制定，涵盖财政支持、税收优惠等方面，旨在为企业创造更加良好的发展环境，推动企业持续、健康发展。通过这些个性化政策服务，企业可以更好地应对市场变化，提升竞争力，实现可持续增长。</div>
          </div>
        </div>
      </div>
      <div id="section2" class="section-title-big">核心功能</div>
      <div ref="section1" class="section section-bg">
        <div class="slider-content">
          <div class="content left-animation text-left">
            <img class="img-title" src="./img/title1.png" />
            <div class="text">综合税务申报：企业在线完成税务申报工作，包括申报指导、数据填报、提交审核等流程，保障企业税务申报的准确性。</div>
            <div class="text">综合税务审批：自动扫描申报信息异常情况，预测企业税务申报合理值，多方面辅助税务申报的审核流程，提高企业税务申报的效率。</div>
          </div>
          <div class="content right-animation">
            <img class="img-right" src="./img/slider1.png" />
          </div>
        </div>
      </div>
      <div ref="section2" class="section">
        <div class="slider-content">
          <div class="content left-animation">
            <img class="img-left" src="./img/slider2.png" />
          </div>
          <div class="content right-animation text-right">
            <img class="img-title" src="./img/title2.png" />
            <div class="text">仓储服务采购管理：整合多家仓储服务提供商，提供仓储服务采购的在线平台，帮助企业便捷选择合适的仓储资源。</div>
            <div class="text">物流服务采购管理：提供物流服务采购功能，支持在线查询、比较和选择物流服务提供商，确保货物安全、快速送达目的地。</div>
          </div>
        </div>
      </div>
      <div ref="section3" class="section section-bg">
        <div class="slider-content">
          <div class="content left-animation text-left">
            <img class="img-title" src="./img/title3.png" />
            <div class="text">融资贷款服务：在线为企业提供融资贷款的撮合服务，帮助企业解决资金问题，推动业务发展。</div>
            <div class="text">银行账户服务：在线完成银行账户的开设流程，包括资料提交、审核通过等步骤，简化开户流程。</div>
            <div class="text">外汇结算服务：支持企业在线完成外币收入的兑换操作，确保资金管理的便捷性和高效性。</div>
          </div>
          <div class="content right-animation">
            <img class="img-right" src="./img/slider3.png" />
          </div>
        </div>
      </div>
      <div ref="section4" class="section">
        <div class="slider-content">
          <div class="content left-animation">
            <img class="img-left" src="./img/slider4.png" />
          </div>
          <div class="content right-animation text-right">
            <img class="img-title" src="./img/title4.png" />
            <div class="text">政策咨询服务：解答企业在政策方面的疑问，帮助企业更好地理解和利用政策。</div>
            <div class="text">政策匹配与推荐：根据企业的行业特点、发展阶段等信息，为企业匹配适用的政策，并推荐相关优惠措施。</div>
            <div class="text">政策兑现协助：协助企业完成政策兑现流程，确保企业能够及时享受政策带来的资金支持。</div>
          </div>
        </div>
      </div>
      <div ref="section5" class="section section-bg">
        <div class="slider-content">
          <div class="content left-animation text-left">
            <img class="img-title" src="./img/title5.png" />
            <div class="text">台账下载：提供具有公信力的贸易台账下载功能，企业可以下载并使用这些台账作为交易真实性的自证材料，增强交易的可信度和透明度。</div>
          </div>
          <div class="content right-animation">
            <img class="img-right" src="./img/slider5.png" />
          </div>
        </div>
      </div>
      <div id="section3" class="yewu">
        <div class="section-title-big">业务情况</div>
        <div class="yw-wrap">
          <div class="yw-item yw-item1">
            <div class="yw-title">仓储</div>
            <div><span class="yw-num">1589</span><span class="yw-unit">（户数）</span></div>
          </div>

          <div class="yw-item yw-item2">
            <div class="yw-title">物流</div>
            <div><span class="yw-num">1642</span><span class="yw-unit">（户数）</span></div>
          </div>

          <div class="yw-item yw-item3">
            <div class="yw-title">金融机构</div>
            <div><span class="yw-num">1489</span><span class="yw-unit">（户数）</span></div>
          </div>

          <div class="yw-item yw-item4">
            <div class="yw-title">服务企业</div>
            <div><span class="yw-num">3728</span><span class="yw-unit">（户数）</span></div>
          </div>

          <div class="yw-item yw-item5">
            <div class="yw-title">营销额度</div>
            <div><span class="yw-num">30,000</span><span class="yw-unit">（万元）</span></div>
          </div>

          <div class="yw-item yw-item6">
            <div class="yw-title">发票审批额度</div>
            <div><span class="yw-num">51,250</span><span class="yw-unit">（万元）</span></div>
          </div>

          <div class="yw-item yw-item7">
            <div class="yw-title">政策咨询</div>
            <div><span class="yw-num">200</span><span class="yw-unit">（万次）</span></div>
          </div>

          <div class="yw-item yw-item8">
            <div class="yw-title">业务撮合</div>
            <div><span class="yw-num">1000</span><span class="yw-unit">（万次）</span></div>
          </div>
        </div>
      </div>
      <div class="page-bottom">
        <span class="bottom-text">指导单位：东疆商务局和东疆税务局</span>
        <span class="bottom-text">组织单位：东疆商务局</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderCom from './components/HeaderCom.vue'

const introduceDom = ref();
const section1 = ref()
const section2 = ref()
const section3 = ref()
const section4 = ref()
const section5 = ref()

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({
    behavior: 'smooth', // 平滑滚动效果
    block: 'center'
  });
}

function handleScroll(e) {
  let scrollTop = e.target.scrollTop // 元素滚顶部的高度
  let clientHeight = introduceDom.value.clientHeight; // 页面高度
  let section1Top = section1.value.offsetTop; // 元素距离顶部的距离
  let section2Top = section2.value.offsetTop;
  let section3Top = section3.value.offsetTop;
  let section4Top = section4.value.offsetTop;
  let section5Top = section5.value.offsetTop;
  if (scrollTop > section1Top - clientHeight + 100) {
    addAnimationClass(section1.value);
  }
  if ( scrollTop > section2Top - clientHeight + 100) {
    addAnimationClass(section2.value);
  }
  if (scrollTop > section3Top - clientHeight + 100) {
    addAnimationClass(section3.value);
  }
  if ( scrollTop > section4Top - clientHeight + 100) {
    addAnimationClass(section4.value);
  }
  if (scrollTop > section5Top - clientHeight + 100) {
    addAnimationClass(section5.value);
  }
}

function addAnimationClass(dom) {
  let leftContent = dom.querySelector('.left-animation');
  leftContent.classList.add('slide-from-left');

  let rightContent = dom.querySelector('.right-animation');
  rightContent.classList.add('slide-from-right');
}

onMounted(() => {
  // handleScroll()
  // introduceDom.value.addEventListener('scroll', handleScroll);
})
</script>

<style lang="scss" scoped>
.introduce-main {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background: #fff;
}

.content {
  float: left;
  height: 100%;
  text-align: left;
  transition: all 1s;
}

.left-animation {
  height: 315px;
  transform: translateX(-100%);
}

.right-animation {
  height: 315px;
  transform: translateX(100%);
}

.slide-from-left {
  transform: translateX(0);
}

.slide-from-right {
  transform: translateX(0);
}

.main-content {
  margin: -50px auto 0 auto;
}
.tab-wrap {
  position: sticky;
  top: 0;
  z-index: 99;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .tab-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 395px;
    height: 110px;
    background: linear-gradient( 180deg, #D9E4FF 0%, #DDEDFA 7%, #FFFFFF 68%, #F9FDFF 100%);
    box-shadow: 0px 10px 20px 0px rgba(183,235,255,0.3);
    border-radius: 8px 8px 8px 8px;
    border: 1px solid #FFFFFF;
    cursor: pointer;
    font-weight: 500;
    font-size: 20px;
    color: #162C5B;
    line-height: 28px;
    text-align: justify;
    font-style: normal;
    text-transform: none;
  }
  img {
    width: 62px;
  }
}
.section-title-big {
  font-weight: 600;
  font-size: 40px;
  color: #162C5B;
  line-height: 56px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-top: 60px;
  margin-bottom: 20px;
}

.section-wrap {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.section-item {
  width: 282px;
  height: 340px;
  background: linear-gradient( 360deg, #F8FCFF 0%, #F4FAFF 100%);
  border-radius: 8px 8px 8px 8px;
  border: 1px solid #FFFFFF;
  img {
    width: 128px;
    display: block;
    margin: -20px auto 0;
  }
  .section-title {
    font-weight: 500;
    font-size: 20px;
    color: #162C5B;
    line-height: 28px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
  .section-text {
    width: 234px;
    height: 120px;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #5A606B;
    line-height: 20px;
    text-align: justify;
    font-style: normal;
    text-transform: none;
    margin: 10px auto 0;
  }
}

.slider-content {
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.yingyong-changjing {
  width: 1200px;
  margin: 0 auto;
}
.section {
  min-width: 1200px;
  height: 400px;
}
.section-bg {
  min-width: 1200px;
  height: 400px;
  background-position: center;
  background: url('./img/sectionbg.png') center center no-repeat;
}
.text {
  text-indent: 2em;
  width: 376px;
  text-align: left;
}

.img-right, .text-right {
  width: 658px;
}

.img-left, .text-left {
  width: 500px;
}

.img-title {
  height: 84px;
}

.yw-wrap {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 32px;
}

.yw-item {
  width: 265px;
  height: 153px;
  border-radius: 8px;
  margin-bottom: 24px;
  padding-top: 32px;
  padding-left: 32px;
}

.yw-item1 {
  background: url('./img/yw1.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item2 {
  background: url('./img/yw2.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item3 {
  background: url('./img/yw3.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item4 {
  background: url('./img/yw4.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item5 {
  background: url('./img/yw5.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item6 {
  background: url('./img/yw6.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item7 {
  background: url('./img/yw7.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}
.yw-item8 {
  background: url('./img/yw8.png'), rgba(53, 94, 255, 0.03);
  background-size: 100% 100%;
}

.yw-title {
  font-weight: 600;
  font-size: 24px;
  color: #162C5B;
  line-height: 34px;
  text-align: justify;
  font-style: normal;
  text-transform: none;
}

.yw-num {
  height: 58px;
  font-family: myNumberBold;
  font-weight: 700;
  font-size: 50px;
  color: #3470FF;
  line-height: 58px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.yw-unit {
  height: 25px;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 18px;
  color: #162C5B;
  line-height: 25px;
  text-align: justify;
  font-style: normal;
  text-transform: none;
}

.page-bottom {
  width: 100%;
  height: 194px;
  background: #252931;
  padding-top: 70px;
}
.bottom-text {
  display: block;
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #9E9E9E;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 18px;
}
</style>