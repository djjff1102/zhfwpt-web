/**
 * 登录用户信息
 */
export interface UserInfo {
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  authority?: Authority[];
  authorityCode?: string[];
  createDate?: string;
  credentialsNonExpired?: boolean;
  dataPermissionCode?: string[];
  enableFlag?: boolean;
  enabled?: boolean;
  id?: string;
  modifyDate?: string;
  name?: string;
  organization?: Organization;
  password?: string;
  phone?: string;
  realName?: string;
  roleId?: string[];
  roleLevel?: number;
  roleName?: string[];
  salt?: string;
  systemType?: number;
  tenantId?: string;
  username?: string;
  workNo?: string;
  workPhone?: string;
  companyName: string;
}

export interface Authority {
  code?: string;
  id?: string;
  name?: string;
  routingAddress?: string;
  type?: number;
}

export interface Organization {
  code?: string;
  id?: string;
  name?: string;
  systemType?: number;
  type?: number;
}

/**
 * 用户查询对象类型
 */
export interface UserQuery extends PageQuery {
  current?: boolean | string;
  role_id?: string;
  real_name?: string;
  name?: string;
  phone?: string;
  organization_id: string;
  system_type: number;
  total?: number;
}

/**
 * 用户分页对象
 */
export interface UserPageVO {
  create_date?: string;
  create_user_id?: string;
  create_user_name?: string;
  enable_flag?: boolean;
  id: string;
  name: string;
  organization_id?: string;
  organization_name?: string;
  organization_type?: number;
  parent_organization_names?: string;
  phone?: string;
  real_name?: string;
  role_id?: string;
  role_name?: string;
  system_type?: number;
  work_no?: string;
  work_phone?: string;
}

/**
 * 用户表单类型
 */
export interface UserForm {
  organization_id: string;
  role_id?: string;
  name: string;
  real_name?: string;
  password?: string;
  phone?: string;
  system_type?: number;
  enable_flag?: boolean;
  work_no?: string;

  create_date?: string;
  create_user_id?: string;
  create_user_name?: string;
  id?: string;
  organization_name?: string;
  organization_type?: number;
  parent_organization_names?: string;
  role_name?: string;
  work_phone?: string;
}
