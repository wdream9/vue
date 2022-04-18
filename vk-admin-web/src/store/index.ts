import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import type { App } from 'vue';
import { SysState } from './module/system/state'
import { SysModule } from './module/system'
import {UserModule} from './module/user'
import { UserState } from './module/user/state'

/**
 * vuex多模块
 */
export type RootState = {
    system: SysState,
    user: UserState,
}

export const modules = {
    system: SysModule,
    user: UserModule
}

export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
    modules
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(key)
}

