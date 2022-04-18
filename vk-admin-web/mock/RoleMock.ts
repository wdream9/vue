import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: "/mock/api/role/list",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "ok",
                "data|5-15": [{
                    "id|+1": 101,
                    'code': '@id',
                    'name': '@cname',
                    "range|1": ['本人', '本部门', '本部门及以下', '全部'],
                    'rangeId': '@id(2)',
                    'state|1': ['1', '0'],
                    'menuName': '@cname',
                    'menuId|3-10': ['@id(200)'],
                    'comments': '@string',
                    'createTime': '@now',
                    'updateTime':'@now'
                }],
            }
        }
    },
    {
        url: "/mock/api/role/save",
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
        url: "/mock/api/role/delete",
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