import { ElForm } from "element-plus";
import { computed, onMounted, reactive, ref } from "vue";
import { UserTableModel } from "./modelUser";
import treeDept from '@/views/sys/dept/treeDept'
import { AddDeptModel } from "../dept/modelDept";
import { useStore } from "@/store";
import roleBasic from '../role/useBasic'
import { RoleModel } from "../role/RoleModel";
import http from "@/http/http";
import { RoleApi } from "@/api/role/RoleApi";

export default function addAndedit() {
    
    const store = useStore()
    const roleList = ref<Array<RoleModel>>([])
    const addFromRef = ref<InstanceType<typeof ElForm>>()
    const searchFrom = reactive<RoleModel>({
        id: 0,
        menuId:[],
        code: '',
        name: '',
        range: '',
        rangeId: '',
        state: '',
    })
    // 角色列表
    const getRoleList = async () => {
        await http.post({
            url: RoleApi.RoleList,
            data: JSON.stringify(searchFrom)
        }).then((res: any) => {
            console.log(res)
            if (res.data.code == 200) {
                roleList.value = res.data.data
            }
        }).catch((error) => {
            console.log
        })
    }
    const userDialogModel = reactive<UserTableModel>({
        loginName: '',
        name: '',
        avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        deptName: '',
        mobile: '',
        email: '',
        state: '',
        deptId: '',
        postName: '',
        password: '',
        confirmPassword: '',
        comments: '',
        roleIds: [],
    })
    // 验证手机号
    const checkTelephone = (rule: any, value: any, callback: any) => {
        if (!/^1[34578]\d{9}$/.test(value)) {
            callback('手机号格式错误')
        } else {
            callback()
        }
    }
    // 邮箱验证
    var checkEmail = (rule: any, value: any, callback: any) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!mailReg.test(value)) {
            callback("请输入正确的邮箱格式");
        } else {
            callback()
        }
    };
    // 校验密码
    const checkPassword = (rule: any, value: any, callback: any) => {
        if (userDialogModel.password != value) {
            callback("密码不一致");
        } else {
            callback()
        }
    };
    // 表单登录验证规则
    const rules = reactive({
        loginName: [{
            required: true,
            message: '请填写登录名',
            trigger: 'change',
        }],
        name: [{
            required: true,
            message: '请填写用户名',
            trigger: 'change',
        }],
        mobile: [{
            required: true,
            message: '请填写手机号',
            trigger: 'change',
        }, { validator: checkTelephone, trigger: 'blur' }],
        email: [{
            required: false,
            message: '请填写合法邮箱',
            trigger: 'change',
        }, { validator: checkEmail, trigger: 'blur' }],
        state: [{
            required: true,
            message: '请填选择状态',
            trigger: 'change',
        }],
        password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'change',
        }],
        confirmPassword: [{
            required: true,
            message: '密码不能为空',
            trigger: 'change',
        }, { validator: checkPassword, trigger: 'blur' }],
    })
    // 部门树节点
    const treeProps = {
        label: 'name',
        children: 'children'
    }
    // 部门数据
    const { deptTree } = treeDept();
    // 头像地址
    const geturl = (avatar: string) => {
        userDialogModel.avatar = avatar;
    }
    //部门树点击事件
    const handleNodeClick = (data: AddDeptModel) => {
        console.log(data)
        userDialogModel.deptName = data.name
        userDialogModel.deptId = data.id
    }
    onMounted(() => {
        getRoleList()
    })
    return {
        rules,
        addFromRef,
        userDialogModel,
        treeProps,
        deptTree,
        geturl,
        roleList,
        handleNodeClick
    }
}

function getRoleList() {
    throw new Error("Function not implemented.");
}
