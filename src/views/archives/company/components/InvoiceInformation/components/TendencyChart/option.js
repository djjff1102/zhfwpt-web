let timeData = [
  "2009/10/17 23:00",
  "2009/10/18 0:00",
  "2009/10/18 1:00",
  "2009/10/18 2:00",
  "2009/10/18 3:00",
  "2009/10/18 4:00",
  "2009/10/18 5:00",
  "2009/10/18 6:00",
  "2009/10/18 7:00",
  "2009/10/18 8:00",
];
timeData = timeData.map(function (str) {
  return str.replace("2009/", "");
});
export default () => {
  return {};
};
