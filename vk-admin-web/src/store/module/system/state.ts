import {ITab} from '@/store/type/Index'
import { DeptTableAndTreeModel } from '@/views/sys/dept/modelDept'
import { RoleModel } from '@/views/sys/role/RoleModel'
export type SysState = {
    id: number,
    collapse: boolean,
    menuList: any,
    tabsList: Array<ITab>,
    deptTree:Array<DeptTableAndTreeModel>,
    roleList: Array<RoleModel>
}
export const state: SysState = {
    id: 0,
    collapse: false,
    tabsList: [],
    menuList: [{
        path: '/dashboard',
        component: "Layout",
        meta: {
            title: "首页",
            icon: "HomeFilled",
            roles: ["sys:manage"]
        },
        children: []
    }],
    deptTree:[],
    roleList:[],
}