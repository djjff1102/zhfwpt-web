export default () => {
  return {
    series: [
      {
        type: "gauge",
        // axisLine: {
        //   lineStyle: {
        //     width: 20,
        //     color: [
        //       [0.8, "#fd666d"],
        //       [1, "#eee"],
        //     ],
        //   },
        // },
        progress: {
          show: true,
          itemStyle: {
            color: "#fd666d",
          },
        },
        pointer: {
          itemStyle: {
            color: "#fd666d",
          },
        },
        axisTick: {
          distance: 10,
          length: 8,
          lineStyle: {
            color: "red",
            width: 2,
          },
        },
        splitLine: {
          show: false,
          distance: -20,
          length: 20,
          lineStyle: {
            color: "red",
            width: 4,
          },
        },
        axisLabel: {
          color: "#fd666d",
          distance: 50,
          fontSize: 16,
        },
        detail: {
          valueAnimation: true,
          fontSize: 30,
          formatter: "{value}",
          color: "#fd666d",
        },
        data: [
          {
            value: 80,
          },
        ],
      },
    ],
  };
};
