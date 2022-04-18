import { RoleApi } from "@/api/role/RoleApi";
import { EditType } from "@/hooks/EditType";
import useInstance from "@/hooks/globalInstance";
import http from "@/http/http";
import { ElForm } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { RoleModel } from "./RoleModel";
import { getCurrentInstance } from 'vue'
export default function roleBasic() {

    // 搜索栏
    const searchFrom = reactive<RoleModel>({
        id:-1,
        code: '',
        name: '',
        range: '',
        rangeId: '',
        state: '',
        menuId:[]
    })

    const { proxy } = getCurrentInstance() as any;
    // ref
    const searchFromeRef = ref<InstanceType<typeof ElForm>>()
    // 弹窗ref
    const addRoleRef = ref<{ show: (type: string, row?: any) => void }>();
    const { global } = useInstance();
    // 表格数据
    const roleList = reactive({
        list: []
    })
    // 搜索
    const searchBtn = () => {
        console.log("searchBtn==>",searchFrom)
        getRoleList(searchFrom);
    }
    // 添加
    const addBtn = () => {
        console.log("addBtn")
        proxy.$refs.addRoleRef.show(EditType.ADD)
        addRoleRef.value?.show(EditType.ADD);
    }
    // 重置
    const resetBtn = async () => {
        await global.$resetForm(searchFromeRef, searchFrom)
        await getRoleList(searchFrom);
    }
    // 编辑
    const editBtn = async (row: RoleModel) => {
        addRoleRef.value?.show(EditType.EDIT, row);
    }
    // 删除
    const deleteBtn = async (row: RoleModel) => {
        let temp = await global.$myconfirm("确定删除该角色？")
        console.log('删除====>', row)
        if (temp) {
            await http.get({
                url: RoleApi.DeleteRole,
                data: JSON.stringify(row)
            }).then((res: any) => {
                console.log(res)
                let code = res.data.code
                if (code == 200) {
                    global.$mymessage('操作成功')
                    // 刷新表格列表
                    getRoleList(searchFrom);
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    // 保存
    const save = (role: RoleModel) => {
        console.log("父组件save方法")
        console.log("1、新增、编辑用户====>", role)
        http.post({
            url: RoleApi.SaveRole,
            data: JSON.stringify(role)
        }).then((res: any) => {
            console.log(res)
            let code = res.data.code
            if (code == 200) {
                global.$mymessage('操作成功')
                // 刷新表格列表
                getRoleList(searchFrom);
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    // 获取角色列表
    const getRoleList = async (searcModel: RoleModel) => {
        await http.post({
            url: RoleApi.RoleList,
            data: JSON.stringify(searcModel)
        }).then((res: any) => {
            console.log('1、get role list===>',res)
            if (res.data.code == 200) {
                roleList.list = res.data.data
            }
        }).catch((error) => {
            console.log
        })
    }
    onMounted(() => {
        getRoleList(searchFrom)
    })

    return {
        searchFrom,
        addRoleRef,
        searchFromeRef,
        roleList,
        searchBtn,
        addBtn,
        resetBtn,
        editBtn,
        deleteBtn,
        save,
        getRoleList
    }

}