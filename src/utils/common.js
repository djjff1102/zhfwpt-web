export const formatData = (data) => {
  let timeArry = [];
  let amountArry = [];
  let sum = 0;
  data.forEach((item) => {
    let time = `${item.invoicing_year}.${item.invoicing_month}`;
    let amount = item.count || 0;
    timeArry.push(time);
    amountArry.push(amount);
    sum += amount;
  });
  return {
    x: amountArry,
    y: timeArry,
    sum,
  };
};

export function splitFiltName(fileName, str = "@quesoar@") {
  let name = fileName.split(str)[1] || "";
  return name;
}

// 处理数字
export function formatNumber(number) {
  if (isNaN(number)) {
    return "Invalid number";
  }
  if (number % 1 !== 0) {
    // 检查是否为小数
    return number.toFixed(2); // 如果是小数，保留两位小数
  } else {
    // 如果是整数
    if (number > 1000) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 如果数字大于1000，每三位数用逗号隔开
    } else {
      return number.toString(); // 如果数字小于等于1000，直接返回整数
    }
  }
}
