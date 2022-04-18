import { MenuApi } from "@/api/menu/MenuApi"
import { EditType, Title } from "@/hooks/EditType"
import useInstance from "@/hooks/globalInstance"
import http from "@/http/http"
import { ElForm } from "element-plus"
import { getCurrentInstance, onMounted, reactive, ref } from "vue"
import { MenuModel } from "../menu/menuModel"
import { RoleModel } from "./RoleModel"

export default function addAndEdit(dialog: any, onShow: any, onClose: any, emit: any) {

    const roleDailogModel = reactive<RoleModel>({
        id: 0,
        code: '',
        name: '',
        range: '',
        rangeId: '',
        state: '',
        menuName: '',
        menuId: [],
        type: '',
        createTiem: '',
        updateTime: '',
        comments: ''
    })
    const { global } = useInstance()
    // 表单ref
    const rules = reactive({
        code: [{
            required: true,
            message: '请填写编码',
            trigger: 'change',
        }],
        name: [{
            required: true,
            message: '请填写名称',
            trigger: 'change',
        }],
        state: [{
            required: true,
            message: '请选择状态',
            trigger: 'change',
        }],
    })
    const show = (type: string, row?: RoleModel) => {
        console.log('进入子组件了')
        console.log(type)
        //设置弹框属性
        dialog.width = 750
        dialog.height = 300
        //显示弹框
        onShow();
        if (type == EditType.ADD) {
            global.$resetForm('', roleDailogModel)
            roleDailogModel.type = type;
            dialog.title = Title.ADD
        } else {
            roleDailogModel.type = type;
            global.$objCoppy(row, roleDailogModel)
            dialog.title = Title.EDIT
        }
    }
    //确定
    // 确定
    const { proxy } = getCurrentInstance() as any;
    const confirm = () => {
        // 表单验证
        proxy.$refs.addFromRef.validate(async (valid: boolean) => {
            if (valid) {
                // 关闭弹窗
                onClose();
                // 父组件save方法
                emit('save', roleDailogModel);

            }
        })
    }
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
    // 获取菜单树
    const getMenuList = async () => {
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
    // 菜单点击
    const handleNodeClick = (data: MenuModel, checked: boolean,indeterminate: boolean) => {
        console.log("点击菜单树====>", data,checked, indeterminate)
        // 添加 check：true  indeterminate：false
        let temp = [];
        if(checked && !indeterminate){
            temp.push(data.id)
            // roleDailogModel.menuId.push(data.id)
        }
        // 移除check：false  indeterminate：false
        if(!checked && !indeterminate){
            // roleDailogModel.menuId.filter((value)=>{
            //     if (value != data.id){
            //         return value;
            //     }
            // })
        }
        console.log("角色分配菜单结果===》",roleDailogModel.menuId)
    }
    onMounted(() => {
        getMenuList();
    })
    return {
        roleDailogModel,
        rules,
        show,
        confirm,
        menuList,
        handleNodeClick
    }
}