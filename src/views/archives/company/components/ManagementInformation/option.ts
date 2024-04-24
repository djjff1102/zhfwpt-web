// 基础配置
export const getGraphConfig = (
  width: number,
  height: number,
  elementId: string,
  direction?: string
) => {
  return {
    container: elementId,
    width,
    height,
    fitView: true,
    fitCenter: true,
    layout: {
      type: "dagre",
      rankdir: direction ? direction : "LR",
      align: "DL",
      controlPoints: true,
      preventOverlap: true,
      nodesep: 20,
      ranksep: 100,
    },
    defaultNode: {
      size: [200, 40],
      type: "node-child",
      anchorPoints: [
        [1, 0.5],
        [1, 0],
      ],
    },
    defaultEdge: {
      // type: 'line-arrow',
      type: "cubic-horizontal",
      size: 1,
      color: "#5DB1B1",
      style: {
        endArrow: {
          path: "M 0,0 L 12,6 L 9,0 L 12,-6 Z",
          fill: "#5DB1B1",
        },
        radius: 20,
      },
      sourceAnchor: direction === "RL" ? 0 : 1,
      targetAnchor: direction === "RL" ? 1 : 0,
    },
  };
};
//根据数据计算画布宽高，自动滚动到根节点
export const fitView = (
  chartBox: any,
  container: any,
  graph: any,
  direction: "RL" | "LR"
) => {
  const timer = setTimeout(() => {
    const nodesPositionList = graph
      ?.getNodes?.()
      ?.map((node: any) => node?._cfg?.group?.getCanvasBBox?.());
    const sortedX = [...nodesPositionList]?.sort(
      (cur: any, pre: any) => pre?.x - cur?.x
    );
    const sortedY = [...nodesPositionList]?.sort(
      (cur: any, pre: any) => pre?.y - cur?.y
    );
    const rightNode = sortedX?.[0];
    const leftNode = sortedX?.[sortedX?.length - 1];
    const width = rightNode?.maxX - leftNode?.minX + 48;
    const topNode = sortedY?.[sortedY?.length - 1];
    const bottomNode = sortedY?.[0];
    const height = bottomNode?.maxY - topNode?.minY;
    const containerWidth = container?.clientWidth;
    const containerHeight = container?.clientHeight;
    const curWidth = width > containerWidth ? width : containerWidth;
    const curHeight = height > containerHeight ? height : containerHeight;

    if (curHeight && curWidth) {
      graph.changeSize(curWidth, curHeight);
      graph.fitView();
      chartBox.scrollBy(direction === "LR" ? 0 : curWidth, 0);
    }
    clearTimeout(timer);
  }, 200);
};
