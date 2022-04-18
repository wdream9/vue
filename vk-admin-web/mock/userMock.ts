import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: "/mock/api/user/code",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: "@image('180x30', '#894FC4', '#FFF', 'png', '7534')",
            }
        }
    },
    {
        url: "/mock/api/user/login",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    "token": '@guid',
                    "id": '@id',
                    "expireTime": 360000
                }
            }
        }
    },
    {
        url: "/mock/api/user/getInfo",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    "avatar": '@guid',
                    "id": '@id',
                    "introduction": '@cparagraph',
                    "roles": ['sys:dept', 'sys:dept:add', 'sys:dept:delete',
                        'sys:user', 'sys:user:add', 'sys:user:update', 'sys:user:delete']
                }
            }
        }
    },
    {
        url: "/mock/api/user/getMenuList",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    "menus": [
                        {
                            path: "/system",
                            component: "Layout",
                            alwaysShow: true,
                            name: "system",
                            meta: {
                                title: "系统管理",
                                icon: "Tools",
                                roles: ["sys:manage"],
                                parentId: 0,
                            },
                            children: [
                                {
                                    path: "/department",
                                    component: "/sys/dept/department",
                                    alwaysShow: false,
                                    name: "department",
                                    meta: {
                                        title: "部门管理",
                                        icon: "Briefcase",
                                        roles: ["sys:dept"],
                                        parentId: 17,
                                    },
                                },
                                {
                                    path: "/userList",
                                    component: "/sys/user/UserList",
                                    alwaysShow: false,
                                    name: "userList",
                                    meta: {
                                        title: "用户管理",
                                        icon: "User",
                                        roles: ["sys:user"],
                                        parentId: 17,
                                    },
                                },
                                {
                                    path: "/roleList",
                                    component: "/sys/role/RoleList",
                                    alwaysShow: false,
                                    name: "roleList",
                                    meta: {
                                        title: "角色管理",
                                        icon: "Avatar",
                                        roles: ["sys:role"],
                                        parentId: 17,
                                    },
                                },
                                {
                                    path: "/menuList",
                                    component: "/sys/menu/MenuList",
                                    alwaysShow: false,
                                    name: "menuList",
                                    meta: {
                                        title: "菜单管理",
                                        icon: "Menu",
                                        roles: ["sys:menu"],
                                        parentId: 17,
                                    },
                                },
                            ],
                        },
                    ]
                }
            }
        }
    },
    {
        url: "/mock/api/user/list",
        method: "get",
        response: (request) => {
            console.log("api/user/list===>",request);
            return {
                code: 200,
                message: "ok",
                "data|5-30": [
                    {
                        "id": '@id',
                        "name": "@cname",
                        "avatar|1": ["http://ra2pvob31.hn-bkt.clouddn.com/aa.jpg", "http://ra2pvob31.hn-bkt.clouddn.com/bb.jpg", "http://ra2pvob31.hn-bkt.clouddn.com/cc.jpg", "http://ra2pvob31.hn-bkt.clouddn.com/d.jpg"],
                        "loginName": "@first",
                        "state|1": ["0", "1"],
                        "nickName": "@first",
                        "mobile": "@id",
                        "email": "@email",
                        "deptId": '@id',
                        "deptName|1": ["分布式部门", "微服务部门", "c++部门", "c#部门"],
                        "createTime": "@now",
                        "updateTime": "@now",
                        "sex": "1",
                        "postId": '@id',
                        "postName": '@cname',
                        "roleIds|1":[[101],[102],[103],[104],[105]],
                        "password":'@id',
                        "confirmPassword":'@id'
                    },
                ]
            }
        }
    },
    {
        url: "/mock/api/user/save",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                }
            }
        }
    },
    {
        url: "/mock/api/user/unlock",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                }
            }
        }
    },
    {
        url: "/mock/api/user/delete",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                }
            }
        }
    },

] as MockMethod[]