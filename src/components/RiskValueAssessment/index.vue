<template>
  <div class="container">
    <div class="chart">
      <RiskChart />
    </div>
    <div class="information">
      <div class="suggest">
        <div class="icon">
          <img :src="suggest" alt="" />
          评估建议
        </div>
        <div class="head">
          <div class="btns">
            <w-button type="text">详情</w-button>
            <w-button type="text" class="text-[#999999]!">导出PDF</w-button>
          </div>
        </div>
        <div class="info">
          <p>
            本次评估分值为 22.35
            分，该分值处玉低风险层级，以下为风险点，请根据实际情况研判额度申报。
          </p>
          <p>
            风险点总结：本次评估检测到 4 个风险点，高风险 1 个，中风险 1
            个，低风险 2 个
          </p>
        </div>
      </div>
      <div class="danger-point">
        <div class="icon">
          <img :src="highPoint" alt="" />
          风险点
        </div>
        <DangerPoint></DangerPoint>
      </div>
    </div>
  </div>
</template>
<script setup>
import RiskChart from "./components/RiskChart/index.vue";
import DangerPoint from "./components/DangerPoint.vue";
import suggest from "@/assets/images/suggest.png";
import highPoint from "@/assets/images/high-point.png";
const tableData = ref([]);
const columns = reactive([
  {
    title: "序号",
    width: 80,
    slotName: "index",
    fixed: "left",
  },
  {
    title: "风险分类",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "风险名称",
    dataIndex: "salary",
    width: 180,
  },
  {
    title: "风险描述",
    dataIndex: "address",
  },
]);
const form = ref({
  name: "",
  post: "",
});
const scroll = ref({
  y: 800,
  x: 1080,
});
</script>
<style lang="scss" scoped>
.container {
  display: flex;
}
.chart {
  width: 367px;
}
.information {
  width: calc(100% - 367px);
  .icon {
    display: flex;
    align-items: flex-end;
    img {
      vertical-align: baseline;
    }
    position: absolute;
    left: 0;
    top: -22px;
    font-size: 20px;
    line-height: 40px;
  }
}
.suggest {
  background-color: rgba($color: #3470ff, $alpha: 0.04);
  padding: 12px;
  position: relative;
  .icon {
    color: #3470ff;
  }
  .info {
    padding: 0 12px;
  }
}
.danger-point {
  margin-top: 22px;
  padding: 12px;
  position: relative;
  .icon {
    color: #f76161;
  }
}
.head {
  display: flex;
  justify-content: flex-end;
}
::v-deep .w-form {
  width: auto;
}
</style>
