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


//数值过千加逗号，并保留几位小数
// num: 当前数字 len: 小数点长度 str: 字符前添加字符串
export function numFormat(num, len, str) {
  if (isNullorEmpty(num)) return "--";
  const isNegative = !(num >= 0);
  //是否负数
  if (isNegative) num = Math.abs(Number(num));
  len = len || 2;
  str = str || "";
  // var c=num && num != 0 ? Number(num).toFixed(len).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '0';
  let c =
    num && num !== 0
      ? (Math.floor(Number(num) * Math.pow(10, len)) / Math.pow(10, len))
          .toFixed(len)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      : "0";
  //是否负数
  if (isNegative) c = "-" + c;
  return str + c;
}

// 数值过千加逗号
export function numThousand(num, str) {
  if (isNullorEmpty(num)) return "--";
  str = str || "";
  const isNegative = !(num >= 0);
  //是否负数
  if (isNegative) num = Math.abs(num);
  // 获取整数和小数部分
  let intNum = Math.trunc(num),
    flotNum = "";
  if (num.toString().split(".").length > 1) {
    flotNum = num.toString().split(".")[1];
  }
  // 整数部分 千位加逗号
  // let c = num && num !== 0 ? Math.floor(Number(num)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : '0';
  let c =
    intNum && intNum !== 0
      ? intNum.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
      : "0";
  //是否负数
  if (isNegative) c = "-" + c + "." + flotNum;
  return str + c;
}

export function clearAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var cookieName = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie =
      cookieName.trim() + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}

export function clearObject(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      delete obj[prop];
    }
  }
}

// 针对搜索结果命中的词高亮
export function highlightSearchTerm(str,key){
	var reg = new RegExp((`(${key})`), "gi");
	var replace = '<span style="color:#FD463E;font-weight:bold;">$1</span>';
	return `<span>${str.replace(reg, replace)}</span>`;
}
