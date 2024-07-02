<template>
  <div class="introduce-main" ref="introduceDom"  @scroll="handleScroll">
    <HeaderCom></HeaderCom>
    <div ref="introduceDom2">
      <div ref="section1" class="section">
        <div class="content left-animation">左侧内容</div>
        <div class="content right-animation">右侧内容</div>
      </div>
      <div ref="section2" class="section">
        <div class="content left-animation">左侧内容</div>
        <div class="content right-animation">右侧内容</div>
      </div>
      <div ref="section3" class="section">
        <div class="content left-animation">左侧内容</div>
        <div class="content right-animation">右侧内容</div>
      </div>
      <div ref="section4" class="section">
        <div class="content left-animation">左侧内容</div>
        <div class="content right-animation">右侧内容</div>
      </div>
      <div ref="section5" class="section">
        <div class="content left-animation">左侧内容</div>
        <div class="content right-animation">右侧内容</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderCom from './components/HeaderCom.vue'

const introduceDom = ref();
const introduceDom2 = ref()
const section1 = ref()
const section2 = ref()
const section3 = ref()
const section4 = ref()
const section5 = ref()

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
  padding-top: 100px;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}
.section {
  width: 50%;
  height: 400px;
  margin: 0 auto;
  background: rgba(0,0,0,0.1);
  margin-bottom: 30px;
}
.content {
  width: 50%;
  float: left;
  height: 100%;
  text-align: center;
  transition: all 1s;
}

.left-animation {
  transform: translateX(-100%);
}

.right-animation {
  transform: translateX(100%);
}

.slide-from-left {
  transform: translateX(0);
}

.slide-from-right {
  transform: translateX(0);
}
</style>