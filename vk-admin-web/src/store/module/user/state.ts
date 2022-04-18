export type UserState = {
    id: number,
    token: string,
    expireTime: number,
    permissions:string[]

}
export const state: UserState = {
    id: 0,
    token: '',
    expireTime: 0,
    permissions:[],
}