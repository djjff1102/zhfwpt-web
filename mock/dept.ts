import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/dev-api/api/v1/dept/options",
    method: "get",
    response: () => {
      return {
        code: "00000",
        data: [
          {
            value: 1,
            label: "系统部门",
            children: [
              {
                value: 2,
                label: "研发部门",
              },
              {
                value: 3,
                label: "测试部门",
              },
            ],
          },
        ],
        msg: "一切ok",
      };
    },
  },
] as MockMethod[];
