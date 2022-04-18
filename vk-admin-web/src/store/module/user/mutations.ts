import { MutationTree } from "vuex";
import { UserState } from './state'

export type SysrMuation = {
    setId(state: UserState, id: number): void;
    setToken(state: UserState, token: string): void;
    setExpireTime(state: UserState, expireTime: number): void;
    setPermissions(state: UserState, permissions: string[]): void;
}

export const mutations: SysrMuation = {
    setId: function (state: UserState, id: number): void {
        state.id = id;
    },
    setToken: function (state: UserState, token: string): void {
        state.token = token;
    },
    setExpireTime: function (state: UserState, expireTime: number): void {
        state.expireTime = expireTime;
    },
    setPermissions: function (state: UserState, permissions: string[]): void {
        state.permissions = permissions;
    },

}