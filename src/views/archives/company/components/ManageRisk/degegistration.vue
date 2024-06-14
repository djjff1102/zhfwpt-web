
<template>
<div>
  <div class="flex-descript">
    <div class="flex-descript-left des1">公告状态</div>
    <div class="flex-descript-right">
      <div class="row flex-base-start">
        <div class="col">已发布</div>
      </div>
    </div>
  </div>
  <div class="flex-descript">
    <div class="flex-descript-left des2">清算组备案信息</div>
    <div class="flex-descript-right">
      <div class="row flex-base-start">
        <div class="col">企业名称</div>
        <div class="col">{{ data.company_name || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">统一社会信用代码/注册码</div>
        <div class="col">{{ data.credit_no || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">登记机关</div>
        <div class="col">{{ data.liquidation_authority || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组备案日期</div>
        <div class="col">{{ data.liquidation_ba_date || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组成立日期</div>
        <div class="col">{{ data.liquidation_establish_date || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">注销原因</div>
        <div class="col">{{ data.liquidation_cancel_reason || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组办公地址</div>
        <div class="col">{{ data.liquidation_address || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组联系电话</div>
        <div class="col">{{ data.liquidation_phone || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组负责人</div>
        <div class="col">{{ data.liquidation_director|| '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">清算组成员</div>
        <div class="col">{{ data.liquidation_members || '' }}</div>
      </div>
    </div>
  </div>
  <div class="flex-descript">
    <div class="flex-descript-left des3">债权人公告信息</div>
    <div class="flex-descript-right">
      <div class="row flex-base-start">
        <div class="col">登记机关</div>
        <div class="col">{{ data.creditor_notice_authority }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">公告期</div>
        <div class="col">{{ data.creditor_notice_startdate }} - {{ data.creditor_notice_enddate || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">公告内容</div>
        <div class="col">{{ data.creditor_notice_content || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">债权申报联系人</div>
        <div class="col">{{ data.creditor_notice_right_contact || '--' }}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">债权申报联系电话</div>
        <div class="col">{{ data.creditor_notice_right_contact_phone || '--'}}</div>
      </div>
      <div class="row flex-base-start">
        <div class="col">债权申报地址</div>
        <div class="col">{{ data.creditor_notice_right_address || '--'}}</div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
const props = defineProps({
  data: {
    default: {}
  }
})
</script>

<style lang="scss">
.flex-descript {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}
.flex-descript-left {
  border: solid 1px #ebeef5;
  border-right: 0;
  border-bottom: 0;
  width: 200px;
  background: #f5fcff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
}
.des1 {
  height: calc(46px * 1);
}
.des2 {
  height: calc(46px * 10);
}
.des3 {
  height: calc(46px * 6);
}
.flex-descript-right {
  flex-grow: 1;
}
.col:first-child {
  width: 200px;
  flex-shrink: 1;
}
.col:last-child {
  flex-grow: 1;
}
.col{
  border-top: solid 1px #ebeef5;
  border-left: solid 1px #ebeef5;
  padding: 0 16px;
  height: 46px;
  line-height: 46px;
}
.row .col:last-child {
  border-right:solid 1px #ebeef5;
}
.flex-descript:last-child .flex-descript-left {
  border-bottom: solid 1px #ebeef5;
}
.flex-descript:last-child .row:last-child .col {
  border-bottom:solid 1px #ebeef5;
}
</style>
