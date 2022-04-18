import { MockMethod } from 'vite-plugin-mock'
export default [
    {
        url: "/mock/api/menu/list",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                'data|5-10': [
                    {
                        'id': '@id',
                        'name': '@cname',
                        'path|1': ['-', '/sys/menu', '/sys/role', '/sys/file', '/sys/login', '/sys/user'],
                        'menuType|1': ['1', '2', '3'],
                        'sort': '@id',
                        'auth|1': ['', 'sys:role', 'sys:role:save', 'sys:role:query', 'sys:login', 'sys:login:delete'],
                        'state|1': ['0', '1'],
                        'createTime': '@now',
                        'updateTime': '@now',
                        'children|3-5': [{
                            'id': '@id',
                            'name': '@cname',
                            'path|1': ['-', '/sys/menu', '/sys/role', '/sys/file', '/sys/login', '/sys/user'],
                            'menuType|1': ['1', '2', '3'],
                            'sort': '@id',
                            'auth|1': ['', 'sys:role', 'sys:role:save', 'sys:role:query', 'sys:login', 'sys:login:delete'],
                            'state|1': ['0', '1'],
                            'createTime': '@now',
                            'updateTime': '@now',
                            'children|0-3': [{
                                'id': '@id',
                                'name': '@cname',
                                'path|1': ['-', '/sys/menu', '/sys/role', '/sys/file', '/sys/login', '/sys/user'],
                                'menuType|1': ['1', '2', '3'],
                                'sort': '@id',
                                'auth|1': ['', 'sys:role', 'sys:role:save', 'sys:role:query', 'sys:login', 'sys:login:delete'],
                                'state|1': ['0', '1'],
                                'createTime': '@now',
                                'updateTime': '@now',
                                'children':[]
                            }]
                        }]
                    }
                ]
            }
        }
    },
    {
        url: "/mock/api/menu/save",
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
    }
] as MockMethod[]