
import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: "mock/api/sys/dept/update",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                },
            }
        },
    },
    {
        url: "/mock/api/sys/dept/add",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                },
            }
        },
    },
    {
        url: "/mock/ai/sys/dept/delete",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    state: true
                },
            }
        },
    },
    {
        url: "/mock/api/sys/dept/list",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: [{
                    "id": 1,
                    "pid": 0,
                    "name": 'java研发部',
                    "parentName": null,
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                },
                {
                    "id": 2,
                    "pid": 1,
                    "name": '微服务研发部',
                    "parentName": 'java研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 3,
                    "pid": 1,
                    "name": '分布式研发部',
                    "parentName": 'java研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 4,
                    "pid": 0,
                    "name": 'C研发部',
                    "parentName": null,
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 5,
                    "pid": 4,
                    "name": 'C++研发部',
                    "parentName": 'C研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 6,
                    "pid": 4,
                    "name": 'C#研发部',
                    "parentName": 'C研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                }, {
                    "id": 7,
                    "pid": 0,
                    "name": '产品研发部',
                    "parentName": null,
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 8,
                    "pid": 7,
                    "name": 'javaScript研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                }, {
                    "id": 9,
                    "pid": 7,
                    "name": 'Go研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 10,
                    "pid": 7,
                    "name": 'php研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                }, {
                    "id": 11,
                    "pid": 0,
                    "name": '产品研发部',
                    "parentName": null,
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 12,
                    "pid": 11,
                    "name": 'javaScript研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                }, {
                    "id": 13,
                    "pid": 11,
                    "name": 'Go研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                    "children": []
                }, {
                    "id": 14,
                    "pid": 11,
                    "name": 'php研发部',
                    "parentName": '产品研发部',
                    "manager": '@cname',
                    "deptAddress": '@province',
                    "deptPhone": '@natural',
                    "createTime": '@now',
                    "updateTime": '@now',
                },]
            }
        }
    },
] as MockMethod[]