import { ActionContext, ActionTree } from "vuex";
import { SysState } from "./state";
import { RootState, store } from "../..";
import http from "@/http/http";
import { UserApi } from "@/api/user/UserApi";
import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob('@/views/**/*.vue')

export const actions: ActionTree<SysState, RootState> = {
    // 改变 id
    changeId: ({ commit }: ActionContext<SysState, RootState>, id: number) => {
        commit("setId", id);
        console.log("======system=changeID=====");
    },
    // 获取菜单列表
    getMenuList: ({ commit }: ActionContext<SysState, RootState>, router: any) => {
        return new Promise((resolve, reject) => {
            http.get({
                url: UserApi.MenuList,
                data: {
                    id: store.getters['user/getId']
                }
            }).then((res: any) => {
                //设置菜单列表
                console.log("1、store getMenuList response ===>", res)
                let accessedRoutes;
                if (res.data.code == 200) {
                    accessedRoutes = filterAsyncRoutes(res.data.data.menus, router)
                    commit('setMenuList', accessedRoutes);
                }
                resolve(res.data)
            }).catch((error) => {
                reject(error)
            })
        })
    },

}

export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = []
    //循环后端返回的每一个路由
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../../views${component}.vue`]
            }
        }
        //判断是否有下级
        if (tmp.children) {
            tmp.children = filterAsyncRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res
}