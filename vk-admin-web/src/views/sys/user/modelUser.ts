/**
 * 头像
 * 用户id
 * 简介
 * 用户名称
 * 权限列表
 */

export interface UserInfo {
    avatar: string;
    id: string;
    introduction: string;
    name: string;
    roles: Array<string>
}

// 用户搜索表单
export interface UserSearchModel {
    loginName: string,
    name: string,
    mobile: string,
    state: string,
    deptId?: string | number
}


// 用户表格数据对象
export interface UserTableModel {
    type?: string,
    loginName: string,
    name: string,
    avatar: string,
    deptName: string,
    mobile: string,
    email: string,
    state: string,
    deptId?: string | number,
    nickName?: string,
    postId?: string | number,
    postName?: string,
    password?: string,
    confirmPassword?: string,
    roleIds?: string[],
    createTime?: string,
    updateTime?: string,
    comments?: string,
}

