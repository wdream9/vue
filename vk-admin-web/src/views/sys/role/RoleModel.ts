export interface RoleModel {
    id: string | number,
    code: string | number,
    name: string,
    range: string,
    rangeId: string | number,
    state: string | number,
    menuName?: string,
    menuId: Array<any>,
    type?: string,
    createTiem?: string,
    updateTime?: string,
    comments?: string
}