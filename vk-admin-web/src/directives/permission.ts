import { Directive } from 'vue'
import { store } from '@/store/index'
export const auth: Directive = {
    mounted(el, binding) {
        const { value } = binding
        const permissions = store.getters['user/getPermissions']
        console.log(permissions)
        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value
            const hasPermission = permissions.some((role: any) => {
                return permissionRoles.includes(role)
            })
            if (!hasPermission) {
                el.style.display = 'none'
            }
        } else {
            throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
        }
    }
}