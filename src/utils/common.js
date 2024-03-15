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
