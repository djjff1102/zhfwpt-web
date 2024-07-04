/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  user_name: string;
  /**
   * 密码
   */
  password: string;
}
/**
 * 修改密码
 */
export interface PasswordData {
  /**
   * 旧密码
   */
  password: string;
  /**
   * 新密码
   */
  newPassword: string;
  /**
   * 确认密码
   */
  confirmPassword: string;
}
