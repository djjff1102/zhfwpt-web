export enum riskstatus {
  high = 1,
  middle = 2,
  low = 3,
}
export const riskLeval = {
  [riskstatus.high]: "高信用",
  [riskstatus.middle]: "中信用",
  [riskstatus.low]: "低信用",
};
