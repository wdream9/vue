import { MenuApi } from "@/api/menu/MenuApi";
import { EditType } from "@/hooks/EditType";
import useInstance from "@/hooks/globalInstance";
import http from "@/http/http";
import { ElForm } from "element-plus";
import { getCurrentInstance, onMounted, reactive, ref } from "vue"
import { MenuModel } from "./menuModel"

export default function menuBasic() {
    // 搜索表单
    const searchFrom = reactive<MenuModel>({
        name: '',
        path: '',
        menuType: '',
        sort: '',
        auth: '',
        state: '',
    })
    // 表格数据
    const menuList = reactive({
        list: []
    })
    const { proxy } = getCurrentInstance() as any;
    // ref
    const searchFromeRef = ref<InstanceType<typeof ElForm>>()
    // 弹窗ref
    const addMenuRef = ref<{ show: (type: string, row?: any) => void }>();
    const { global } = useInstance();
    // 搜索
    const searchBtn = () => {
        console.log("searchBtn==>", searchFrom)
        getMenuList(searchFrom);
    }
    // 添加
    const addBtn = () => {
        console.log("addBtn")
        addMenuRef.value?.show(EditType.ADD);
    }
    // 重置
    const resetBtn = async () => {
        await global.$resetForm(searchFromeRef, searchFrom)
        getMenuList(searchFrom);
    }
    // 编辑
    const editBtn = async (row: MenuModel) => {
        addMenuRef.value?.show(EditType.EDIT, row);
    }
    // 删除
    const deleteBtn = async (row: MenuModel) => {
        let temp = await global.$myconfirm("确定删除该角色？")
        console.log('删除====>', row)
        if (temp) {
            await http.get({
                url: MenuApi.DeleteMenu,
                data: JSON.stringify(row)
            }).then((res: any) => {
                console.log(res)
                let code = res.data.code
                if (code == 200) {
                    global.$mymessage('操作成功')
                    // 刷新表格列表
                    getMenuList(searchFrom);
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    // 保存
    const save = (role: MenuModel) => {
        console.log("父组件save方法")
        console.log("1、新增、编辑用户====>", role)
        http.post({
            url: MenuApi.SaveMenu,
            data: JSON.stringify(role)
        }).then((res: any) => {
            console.log(res)
            let code = res.data.code
            if (code == 200) {
                global.$mymessage('操作成功')
                // 刷新表格列表
                getMenuList(searchFrom);
            }
        }).catch((error: any) => {
            console.log(error)
        })
    }
    // 获取菜单列表
    const getMenuList = async (searchFrom: MenuModel) => {
        console.log(searchFrom)
        await new Promise((resolve, reject) => {
            http.get({
                url: MenuApi.MenuList,
                data: JSON.stringify(searchFrom)
            }).then((res: any) => {
                console.log("1、getMenuList response ===>", res)
                menuList.list = res.data.data;
            }).catch((error: any) => {
                console.log(error)
            })
        })
    }
    // 挂载
    onMounted(() => {
        getMenuList(searchFrom);
    })
    return { menuList, searchFrom,addMenuRef, addBtn, searchBtn, resetBtn, editBtn, deleteBtn,save,getMenuList }
}