import { useUserStoreHook } from "@/store/modules/user";
import { Directive, DirectiveBinding } from "vue";

const userStore = useUserStoreHook();
/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (!value) return;
    let code = userStore.user.authorityCode || [];
    let dataPermissionCode = userStore.user.dataPermissionCode || [];
    code?.push(...dataPermissionCode);
    const curValue = binding.value;
    // 可根据自己的业务修改此处实现逻辑
    if (!code.includes(curValue)) {
      el.style.display = "none";
    } else {
      el.style.display = "auto";
    }
  },
};

export function checkPermission(value: string | string[]): boolean {
  const requiredPerms = Array.isArray(value) ? value : [value];
  const { authorityCode } = useUserStoreHook().user;
  if (!authorityCode?.length) {
    return false;
  }
  return authorityCode?.some((code) => {
    return requiredPerms.includes(code);
  });
}

/**
 * 角色权限
 */
export const hasRole: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;

    // if (value) {
    //   const requiredRoles = value; // DOM绑定需要的角色编码
    //   const { roles } = useUserStoreHook().user;
    //   const hasRole = roles.some((perm) => {
    //     return requiredRoles.includes(perm);
    //   });

    //   if (!hasRole) {
    //     el.parentNode && el.parentNode.removeChild(el);
    //   }
    // } else {
    //   throw new Error("need roles! Like v-has-role=\"['admin','test']\"");
    // }

    return true;
  },
};
