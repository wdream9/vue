/**
 * 用户模块
 */
import { Module } from "vuex";
import { RootState } from "../..";
import { UserState } from "./state";
import { state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./action";
import { getters } from "./getter";
export const UserModule: Module<UserState,RootState> = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}