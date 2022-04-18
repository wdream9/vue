import { ref, reactive } from 'vue'
import { ILoginParam } from "./modelLogin"
import { ElForm } from "element-plus";

export default function basicLogin(){
    // 登录参数
    const loginModel = reactive<ILoginParam>({
        username: '',
        password: '',
        code: ''
    })
    const loginFormRef = ref<InstanceType<typeof ElForm>>()
    // 表单登录验证规则
    const rules = reactive({
        username:[{
            required: true,
            message: '请填写登录账户',
            trigger: 'change',
        }],
        password:[{
            required: true,
            message: '请填写登录密码',
            trigger: 'change',
        }],
        code:[{
            required: true,
            message: '请填写验证码',
            trigger: 'change',
        }]
    })

    return {
        loginModel,
        rules,
        loginFormRef
    }
}
