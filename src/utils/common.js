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
  let errCode = false
  let successCode = false
  if (!data || data.length == 0) {
    return 3
  }
  errCode = data.some((item) => {
      return item?.material?.judgeCode == 2;
    });
  successCode = data.every((item) => {
    return item?.material?.judgeCode == 1 || item?.material?.judgeCode == 3;
  });

  if(errCode) {
    return 2 
  } else if(successCode) {
    return 1
  } else {
    return 3
  }
}