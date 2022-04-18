import { EditType } from "@/hooks/EditType";
import { onMounted, reactive, ref } from "vue"
import { UserSearchModel, UserTableModel } from "./modelUser"
import useInstance from "@/hooks/globalInstance";
import { ElForm, ElMessage } from 'element-plus'
import http from "@/http/http";
import { UserApi } from "@/api/user/UserApi";


export default function userBasic() {

    // 全局实例
    const { global } = useInstance();
    // 搜索栏
    const searchFromModel = reactive<UserSearchModel>({
        loginName: '',
        name: '',
        mobile: '',
        state: '',
    })
    
    const serachFromRef = ref<InstanceType<typeof ElForm>>()
    // 多选框
    const multipleSelection = ref<UserTableModel[]>([]);

    // 调用子组件 弹窗方法
    const addUserRef = ref<{ show: (type: string, row?: any) => void }>();
    // 查询
    const searchBtn = (userFromModel: UserSearchModel) => {
        console.log('用户搜索====>', userFromModel)
        getUserTablea(userFromModel)
    }
    // 新增
    const addBtn = () => {
        addUserRef.value?.show(EditType.ADD);
    }
    // 重置
    const resetBtn = () => {
        console.log('重置====>')
        // 清空搜索表单
        global.$resetForm(serachFromRef, searchFromModel)
        // 刷新用户列表
        getUserTablea(searchFromModel)
    }
    // 解锁
    const unlock = async (userFromModel: UserTableModel) => {
        let ulock = multipleSelection.value.filter(item => {
            console.log(item);
            if (item.state == '1') {
                item.type = EditType.LOCK;
                return item;
            }
        })
        console.log('解锁====>', ulock, userFromModel)
        // 发送请求
        await http.get({
            url: UserApi.Unlock,
            data: JSON.stringify(ulock)
        }).then((res: any) => {
            console.log("1、unlock response ===>", res)
            let state = res.data.data.state;
            if (state) {
                global.$mymessage('操作成功')
                getUserTablea()
            }
        }).catch((error: any) => {
            console.log(error)
        })


    }
    // 编辑
    const editBtn = (userFromModel: UserTableModel) => {
        console.log('编辑====>', userFromModel)
        addUserRef.value?.show(EditType.EDIT, userFromModel);
    }
    // 删除
    const deleteBtn = async (row: UserTableModel) => {
        let temp = await global.$myconfirm("确定删除该用户？")
        console.log('删除====>', row)
        if (temp) {
            http.get({
                url: UserApi.DeleteUser,
                data: JSON.stringify(row)
            }).then((res: any) => {
                console.log(res)
                let code = res.data.code
                if (code == 200) {
                    global.$mymessage('操作成功')
                    // 刷新表格列表
                    getUserTablea();
                }
            }).catch(error => {
                console.log(error)
            })
        }

    }
    // 保存
    const save = (user: UserTableModel) => {
        console.log("父组件save方法")
        console.log("1、新增、编辑用户====>", user)
        http.post({
            url: UserApi.SaveUser,
            data: JSON.stringify(user)
        }).then((res: any) => {
            console.log(res)
            let code = res.data.code
            if (code == 200) {
                global.$mymessage('操作成功')
                // 刷新表格列表
                getUserTablea();
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    // 选择框
    const handleSelectionChange = (val: UserTableModel[]) => {
        multipleSelection.value = val
    }
    // 用户表格
    const userTableModel = reactive({
        list: []
    })

    // 获取表格数据
    const getUserTablea = async (info?: UserSearchModel) => {
        await new Promise((resolve, reject) => {
            http.get({
                url: UserApi.UserList,
                data: JSON.stringify(info)
            }).then((res: any) => {
                console.log("1、user list response ===>", res)
                userTableModel.list = res.data.data;
            }).catch((error: any) => {
                console.log(error)
            })
        })
    }
    // 挂载
    onMounted(() => {
        getUserTablea();
    })


    return {
        searchFromModel,
        serachFromRef,
        addUserRef,
        searchBtn,
        addBtn,
        resetBtn,
        unlock,
        editBtn,
        deleteBtn,
        save,
        userTableModel,
        getUserTablea,
        handleSelectionChange,
    }
}