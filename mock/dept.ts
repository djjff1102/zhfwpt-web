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
  {
    url: "/dev-api/api/v1/dept",
    method: "get",
    response: () => {
      return {
        code: "00000",
        data: [
          {
            id: 1,
            parentId: 0,
            name: "系统部门",
            sort: 1,
            status: 1,
            children: [
              {
                id: 2,
                parentId: 1,
                name: "研发部门",
                sort: 1,
                status: 1,
                children: [],
                createTime: null,
                updateTime: "2022-04-19 12:46",
              },
              {
                id: 3,
                parentId: 1,
                name: "测试部门",
                sort: 1,
                status: 1,
                children: [],
                createTime: null,
                updateTime: "2022-04-19 12:46",
              },
            ],
            createTime: null,
            updateTime: null,
          },
        ],
        msg: "一切ok",
      };
    },
  },
] as MockMethod[];
