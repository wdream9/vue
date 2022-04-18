/**
 * 系统模块
 */
import { Module } from "vuex";
import { RootState } from "../..";
import { SysState } from "./state";
import { state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./action";
import { getters } from "./getter";
export const SysModule: Module<SysState,RootState> = {
    namespaced:true,
    state,
    actions,
    mutations,
    getters,
}