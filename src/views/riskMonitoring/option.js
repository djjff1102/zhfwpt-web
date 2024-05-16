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
        subtext: "1000+个", // 副标题
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
            value: 1800,
            name: "高信用",
            itemStyle: {
              color: "#5ECF69",
            },
          },
          {
            value: 484,
            name: "中信用",
            itemStyle: {
              color: "#FF9100",
            },
          },
          {
            value: 300,
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
      data: ["Evaporation", "Precipitation", "Temperature"],
    },
    xAxis: [
      {
        type: "category",
        data: ["2023.1", "2032.4", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "审批率",
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
        data: [
          2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
        ],
      },
      {
        name: "未审批",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        name: "通过",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
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
        data: [
          2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
        ],
      },
    ],
  };
};
