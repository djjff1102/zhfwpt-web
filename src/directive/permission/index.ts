import { useUserStoreHook } from "@/store/modules/user";
import { Directive, DirectiveBinding } from "vue";

/**
 * 按钮权限
 */
export const hasPerm: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    if (value) {
      const requiredPerms = Array.isArray(value) ? value : [value];
      if (!checkPermission(requiredPerms)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(
        "need perms! Like v-has-perm=\"['100', '101']\" v-has-perm=\"'101'\""
      );
    }

    return true;
  },
};

export function checkPermission(requiredPerms: string[] = []): boolean {
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
