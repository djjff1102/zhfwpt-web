/**
 * 部门查询参数
 */
export interface DeptQuery extends PageQuery {
  name?: string;
}

/**
 * 部门类型
 */
export interface DeptVO {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  systemType?: number;
  type?: number;
  sort?: number;
  children?: DeptVO[];
}

/**
 * 部门表单类型
 */
export interface DeptForm {
  name?: string;
  alias: string[];
  pid: string; // '0' 顶层 | 'xxx' 父级id
  system_type?: number;
  remark?: string;
  id?: string;
}

export interface OrganizationUnit {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  systemType?: number;
  type?: number;
  sort?: number;
  children?: OrganizationUnit[]; // 可选属性，表示子单位，递归地使用同一个接口
}
