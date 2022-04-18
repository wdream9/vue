import { ActionContext, ActionTree } from "vuex";
import { UserState } from "./state";
import { RootState } from "../..";
import { ILoginParam } from "@/views/sys/login/modelLogin";
import http from "@/http/http";
import { UserApi } from "@/api/user/UserApi";
import { getTokenCookie, setExpireTime, setTokenCookie, setTokenSession, setUserIdSession } from "@/http/auth";
export type SysActions = {

}
export const actions: SysActions & ActionTree<UserState, RootState> = {
    // 用户登录
    login: ({ commit }: ActionContext<UserState, RootState>, loginModel: ILoginParam) => {
        return new Promise((resolve, reject) => {
            http.post({
                url: UserApi.UserLogin,
                data: JSON.stringify(loginModel)
            }).then((res: any) => {
                if (res && res.data.code == 200) {
                    console.log("1、登录成功", res.data);
                    let resp = res.data.data;
                    // token保存 vuex
                    commit('setId', resp.id)
                    commit('setToken', resp.token)
                    // token保存cookies
                    setTokenCookie(resp.token, resp.expireTime);
                    setTokenSession(resp.token);
                    setUserIdSession(resp.id);
                    setExpireTime(resp.expireTime)
                }
                resolve(res)
            }).catch((error) => {
                reject(error)
            });
        })
    },
    //获取用户权限信息
    getInfo({ commit }: ActionContext<UserState, RootState>) {
        return new Promise((resolve, reject) => {
            http.get({
                url: UserApi.UserInfo
            }).then((res: any) => {
                console.log("1、store getInfo response====>",res.data)
                //设置权限
                commit('setPermissions', res.data.data.roles)
                resolve(res.data)
            }).catch((error)=>{
                reject(error)
            })
        })
    },
}