import { GetterTree } from "vuex";
import { RootState } from "../..";
import { SysState } from "./state";
import { ITab } from "@/store/type/Index";
import { DeptTableAndTreeModel } from "@/views/sys/dept/modelDept";
import { RoleModel } from "@/views/sys/role/RoleModel";
export type SysGetter = {
    getId(state: SysState): number,
    getCollapse(state: SysState): boolean,
    getMenuList(state: SysState): any,
    getTabsList(state: SysState): Array<ITab>,
    getDeptTree(state: SysState): Array<DeptTableAndTreeModel>,
    getRoleList(state: SysState): Array<RoleModel>
}

export const getters: SysGetter & GetterTree<SysState, RootState> = {
    getId(sysState: SysState) {
        return sysState.id;
    },
    getCollapse(sysState: SysState) {
        return sysState.collapse;
    },
    getMenuList(sysState: SysState) {
        return sysState.menuList;
    },
    getTabsList: (state: SysState) => {
        return state.tabsList;
    },
    getDeptTree: (state: SysState) => {
        return state.deptTree;
    },
    getRoleList: (state: SysState) => {
        return state.roleList;
    }
}