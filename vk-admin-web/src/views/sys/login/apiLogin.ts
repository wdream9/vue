import http from "@/http/http"
import { ref, onMounted, getCurrentInstance, ComponentInternalInstance, } from "vue";
import { ILoginParam } from "./modelLogin";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
export default function apiLogin(loginModel: ILoginParam) {

    const store = useStore();
    const router = useRouter();
    const imgSrc = ref('');
    const { proxy } = getCurrentInstance() as any;

    // 获取验证码
    const getImage = () => {
        http.get({
            url: '/api/user/code'
        }).then((res: any) => {
            imgSrc.value = res.data.data;
        }).catch((err: any) => {
            console.log(err)
        })
    }
    const send = () => {
        http.get({
            url: '/user/code',
            responseType: 'arraybuffer'
        }).then((res: any) => {
            imgSrc.value = 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
        })
    }
    // 登录
    // 确定
    const login = () => {
        // 登录表单验证
        proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
            if (valid) {
                store.dispatch('user/login', loginModel).then((res: any) => {
                    if (res && res.data.code == 200) {
                        console.log("2、login success!")
                        //跳转首页
                        router.push({ path: '/' })
                    }
                })
            }
        })

    }
    onMounted(() => {
        // send()
        getImage()
    })

    return {
        imgSrc,
        getImage,
        login
    }
}