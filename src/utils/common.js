export const formatData = (data) => {
  let timeArry = [];
  let amountArry = [];
  data.forEach((item) => {
    let time = `${item.invoicing_year}.${item.invoicing_month}`;
    let amount = item.count || 0;
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