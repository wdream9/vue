import { GetterTree } from "vuex";
import { RootState } from "../..";
import { UserState } from "./state";

export type SysGetter = {
    getId(state:UserState):number,
    getPermissions(state:UserState):string[],
}

export const getters: SysGetter & GetterTree<UserState,RootState> = {
    getId(sysState: UserState){
        return sysState.id;
    },
    getPermissions(state:UserState){
        return state.permissions
    },
}