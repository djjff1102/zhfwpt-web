enum status {
  wait = 1,
  pass = 2,
  reject = 3,
}
export const approveStatus = {
  [status.wait]: "待审批",
  [status.pass]: "通过",
  [status.reject]: "驳回",
};

export const statusList = [
  {
    value: 1,
    label: "待审批",
  },
  {
    value: 2,
    label: "通过",
  },
  {
    value: 3,
    label: "驳回",
  },
];
