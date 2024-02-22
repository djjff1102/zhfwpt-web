import { MenuTypeEnum } from "@/enums/MenuTypeEnum";

/**
 * 菜单视图对象类型
 */
export interface MenuVO {
  id?: string;
  pid?: string;
  name?: string;
  code?: string;
  sort?: number;
  routing_address?: string;
  remark?: string;
  enable_flag: boolean;
  type?: number;
  children?: MenuVO[];
}

/**
 * 菜单表单对象类型
 */
export interface MenuForm {
  type?: number;
  name?: string;
  routing_address?: string;
  code?: string;
  enable_flag?: boolean;
  sort?: number;
  remark?: string;

  id?: string;
  pid?: string;
}

/**
 * 获取菜单功能配置 返回类型
 */
export interface MenuFuncsProps {
  code?: string;
  id?: string;
  name?: string;
  remark?: string;
  type?: string;
}
