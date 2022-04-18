export interface MenuModel {
    id?:string | number,
    name: string,
    path: string,
    menuType?: string | number,
    sort?: string | number,
    auth: string,
    state: string | number,
    createTime?: string,
    updateTime?: string,
    comments?: string,
    type?: string,
    icon?:string,
    parentId?: string | number,
    parentName?: string,
    children?: []
}