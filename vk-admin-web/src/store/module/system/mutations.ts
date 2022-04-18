import { MutationTree } from "vuex";
import { SysState } from './state'
import { ITab } from '@/store/type/Index'
import { DeptTableAndTreeModel } from "@/views/sys/dept/modelDept";
import { RoleModel } from "@/views/sys/role/RoleModel";
export type SysrMuation = {
    setId(state: SysState, id: number): void;
    setCollapse(state: SysState, value: boolean): void;
    setMenuList(state: SysState, menuList: any): void;
    addTabs(state: SysState, tabsList: any): void;
    setDeptTree(state: SysState, deptTree: Array<DeptTableAndTreeModel>): void;
    setRoleList(state: SysState, roleList: Array<RoleModel>): void;
}

export const mutations: SysrMuation = {
    setId: function (state: SysState, id: number): void {
        state.id = id;
    },
    setCollapse: function (state: SysState, collapse: boolean): void {
        state.collapse = collapse;
    },
    setMenuList: function (state: SysState, menuList: any): void {
        state.menuList = state.menuList.concat(menuList)
    },
    //添加选项卡
    addTabs: function (state: SysState, tab: ITab): void {
        if (state.tabsList.some(item => item.path === tab.path)) return;
        state.tabsList.push(tab);
    },
    // 左侧部门树
    setDeptTree: function (state: SysState, deptTree: Array<DeptTableAndTreeModel>): void {
        state.deptTree = deptTree;
    },
    // 角色列表
    setRoleList:function (state: SysState, roleList: Array<RoleModel>): void{
        state.roleList = roleList;
    }
}