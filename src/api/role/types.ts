/**
 * 角色查询参数
 */
export interface RoleQuery extends PageQuery {
  name?: string;
  area_type?: string;
  create_user_name?: string;
}

/**
 * 角色分页对象
 */
export interface RolePageVO {
  area_type?: number;
  code?: string;
  create_date?: string;
  create_user_id?: string;
  create_user_name?: string;
  id?: string;
  name?: string;
  remark?: string;
  sort?: string;
  system_type?: number;
}

/**
 * 角色表单对象
 */
export interface RoleForm {
  area_type?: number;
  code?: string;
  create_date?: string;
  create_user_id?: string;
  create_user_name?: string;
  id?: string;
  name?: string;
  remark?: string;
  sort?: string;
  system_type?: number;
}

/**
 * 菜单权限 树
 */
export interface MenuPremissionTreeProps {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  children?: MenuPremissionTreeProps[];
}

/**
 * 通过roleId查询菜单权限
 */
export interface GetMenuPremissionByRoleIdProps extends PageQuery {
  role_id: string;
}

/**
 * 获取角色的菜单集合
 */
export interface GetRoleMenuProps {
  code: string;
  id: string;
  name: string;
}

export interface updatePremissionByIdParams {
  id: string;
  ids: string[];
}
