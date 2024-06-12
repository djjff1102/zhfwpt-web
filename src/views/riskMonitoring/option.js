export const pieOption = () => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "0%",
      left: "center",
    },
    title: [
      {
        // 第一个圆环标题
        text: "总计", // 主标题
        textStyle: {
          // 主标题样式
          color: "rgba(0,0,0, 0.5)",
          fontWeight: "bold",
          fontSize: 14,
        },
        left: "49%",
        top: "40%",
        subtext: "", // 副标题
        subtextStyle: {
          // 副标题样式
          color: "#FF9100",
          fontSize: 14,
          fontWeight: "bold",
        },
        textAlign: "center", // 主、副标题水平居中显示
      },
    ],
    series: [
      {
        type: "pie",
        radius: ["35%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: "bold",
          },
        },
        data: [
          {
            value: 0,
            name: "高信用",
            itemStyle: {
              color: "#5ECF69",
            },
          },
          {
            value: 0,
            name: "中信用",
            itemStyle: {
              color: "#FF9100",
            },
          },
          {
            value: 0,
            name: "低信用",
            itemStyle: {
              color: "#F76161",
            },
          },
        ],
      },
    ],
  };
};

export const barOption = () => {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      bottom: "0%",
      left: "center",
    },
    xAxis: [
      {
        type: "category",
        data: [],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "审批量",
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
          // formatter: "{value} ml",
        },
      },
      {
        type: "value",
        name: "审批金额",
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          // formatter: "{value} °C",
        },
      },
    ],
    series: [
      {
        name: "驳回",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
            // return value + " ml";
          },
        },
        data: [],
        itemStyle: {
          color: "rgba(247, 97, 97, 1)",
        },
      },
      {
        name: "未审批",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: [],
        itemStyle: {
          color: "rgba(52, 112, 255, 1)",
        },
      },
      {
        name: "通过",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: [],
        itemStyle: {
          color: "rgba(94, 207, 105, 1)",
        },
      },
      {
        name: "审批金额",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: [],
        itemStyle: {
          color: "#F88B11",
        },
      },
    ],
  };
};
