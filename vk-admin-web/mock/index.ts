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
    
] as MockMethod[]