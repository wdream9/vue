import { EditType, Title } from "@/hooks/EditType"
import useInstance from "@/hooks/globalInstance"
import { getCurrentInstance, reactive } from "vue"
import { RoleModel } from "../role/RoleModel"
import { MenuModel } from "./menuModel"

export default function addAndEdit(dialog:any, onShow:any, onClose:any, emit:any) {

    const menuDailogModel = reactive<MenuModel>({
        name: '',
        path: '',
        menuType:'',
        sort:'',
        auth:'',
        state:'',
        parentId: '',
        parentName:'',
        createTime:'',
        updateTime:''
    })
    const { global } = useInstance()
    // 表单ref
    const rules = reactive({
        name: [{
            required: true,
            message: '请填写名称',
            trigger: 'change',
        }],
        menuType: [{
            required: true,
            message: '请填写选择类型',
            trigger: 'change',
        }],
        sort: [{
            required: true,
            message: '请输入排序',
            trigger: 'change',
        }],
        state: [{
            required: true,
            message: '请选择状态',
            trigger: 'change',
        }],
        auth: [{
            required: true,
            message: '请输入权限标识',
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
            global.$resetForm('', menuDailogModel)
            menuDailogModel.type = type;
            dialog.title = Title.ADD
        } else {
            menuDailogModel.type = type;
            global.$objCoppy(row, menuDailogModel)
            dialog.title = Title.EDIT
        }
    }
    //确定
    const { proxy } = getCurrentInstance() as any;
    const confirm = () => {
        // 表单验证
        proxy.$refs.addFromRef.validate(async (valid: boolean) => {
            if (valid) {
                // 关闭弹窗
                onClose();
                // 父组件save方法
                emit('save', menuDailogModel);

            }
        })
    }

    return {
        menuDailogModel,
        rules,
        show,
        confirm
    }

}
