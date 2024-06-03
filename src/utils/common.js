import { useUserStoreHook } from "@/store/modules/user";
const userStore = useUserStoreHook();
import { approvalMapping } from "@/router/permissionCode";

// 判断当前用户是否有查看错误信息的权限
export function checkFileError() {
  if (
    userStore.user.dataPermissionCode.includes(approvalMapping.FileErrorMsg)
  ) {
    return true;
  } else {
    return false;
  }
}

// import CryptoJS from "crypto-js";
export const formatData = (data) => {
  let timeArry = [];
  let amountArry = [];
  data.forEach((item) => {
    if (!item) {
      return;
    }
    let time = `${item?.year}.${item?.month}`;
    let amount = item?.count || 0;
    timeArry.push(time);
    amountArry.push(amount);
  });
  return {
    y: amountArry,
    x: timeArry,
  };
};

export function splitFiltName(fileName, str = "@quesoar@") {
  let name = fileName.split(str)[1] || "";
  return name;
}

// 处理数字
export function formatNumber(number) {
  if (isNaN(number)) {
    return "";
  }
  if (number % 1 !== 0 || number.toString().includes(".")) {
    // 检查是否为小数
    let num = Number(number).toFixed(2); // 如果是小数，保留两位小数
    let zhengshu = formatNumber(num.split(".")[0]);
    return zhengshu + "." + num.split(".")[1];
  } else {
    // 如果是整数
    if (number > 1000) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 如果数字大于1000，每三位数用逗号隔开
    } else {
      return number.toString(); // 如果数字小于等于1000，直接返回整数
    }
  }
}

// 格式化时间
export function formateDate(now) {
  return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
}

export async function exportBlob(b, name) {
  const fileName = name;
  const a = document.createElement("a");
  a.download = fileName;
  a.href = URL.createObjectURL(b);
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

// 解密
// export function unlock(d) {
//   return JSON.parse(
//     CryptoJS.AES.decrypt(d, "Secret Passphrase").toString(CryptoJS.enc.Utf8)
//   );
// }

// judgeCode 0为未处理的，1为校验通过的，2为校验异常的，3为用户选择忽略
// 返回1 全部上传文件或已上传忽略的
// 返回2 有错误附件
export function validateType(data) {
  let errCode = false;
  let successCode = false;
  if (!data || data.length == 0) {
    return 3;
  }
  errCode = data.some((item) => {
    return item?.material?.judgeCode == 2;
  });
  successCode = data.every((item) => {
    return item?.material?.judgeCode == 1 || item?.material?.judgeCode == 3;
  });

  if (errCode) {
    return 2;
  } else if (successCode) {
    return 1;
  } else {
    return 3;
  }
}

// 处理节点node
export function tupuNode(data) {
  data.forEach((item) => {
    item.id = item.point_id;
  });
}

// 处理节点间的边
export function tupuEdge(data) {
  data.forEach((item) => {
    item.source = item.source_id;
    item.target = item.target_id;
  });
}

// 将node和边转为树
export function arrayToTree(nodes, edges) {
  const map = {}; // 使用一个对象来存储每个节点的引用，以便快速查找
  let tree = []; // 存储树的顶层节点
  const nodeID = [];
  // 遍历数组，为每个节点创建引用，并将其添加到map中
  nodes.forEach((node) => {
    nodeID.push(node.point_id);
    map[node.point_id] = {
      ...node,
      id: node.point_id,
      label: "11111111",
      children: [],
    }; // 将当前节点作为对象的副本存储，并添加一个空的children数组
  });
  // 遍历出父节点
  edges.forEach((item) => {
    let index = nodeID.indexOf(item.target_id);
    index !== -1 ? nodeID.splice(index, 1) : "";
  });
  // 遍历数组，构建树形结构
  edges.forEach((edge) => {
    // 如果节点有父节点，则将其添加为父节点的子节点
    map[edge.source_id].children.push(map[edge.target_id]);
  });
  tree = map[nodeID[0]];
  return tree;
}

// 将字符转换为字节

export function countCharacters(str) {
  if (!str) return 1;
  const regex = /[\u4e00-\u9fa5]/g;
  let CHlen = (str.match(regex) || []).length;
  return str.length - CHlen + CHlen * 2;
}

// 处理数据，生成columns
export function formateWord(d) {
  const arr = [
    {
      title: "序号",
      dataIndex: "index",
      slotName: "index",
      width: 80,
    },
  ];
  Object.keys(d).forEach((item) => {
    let cur = {
      title: d[item],
      dataIndex: item,
      width: Math.max(d[item].length * 30, 200),
      ellipsis: true,
      tooltip: { position: "left" },
    };
    arr.push(cur);
  });
  return arr;
}

// 当柱状折线图，有左右两个y轴，需要分别计算左右的步数
// sum 一侧（y轴）的最大值
// splitNum 分隔线的条数
export function computStep(sum, splitNum) {
  let quotient = Math.floor(sum / splitNum); // 商
  let remainder = sum % splitNum; // 余数

  if (sum == 0) {
    return {
      sum: splitNum,
      step: 1,
    };
  }
  if (remainder != 0) {
    sum = sum + (splitNum - remainder);
    return {
      sum,
      step: sum / splitNum,
    };
  } else {
    return {
      sum,
      step: sum / splitNum,
    };
  }
}