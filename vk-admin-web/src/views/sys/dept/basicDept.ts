import { EditType } from "@/hooks/EditType";
import { onMounted, reactive, ref } from "vue"
import { AddDeptModel, IListParm } from "./modelDept"
export default function deptBasic() {

    const searchModel = reactive<IListParm>({
        searchName: '',
        deptId: 0,
    });
    //表单验证
    const rules = reactive({
        name: [{
            required: true,
            message: '请填写部门名称',
            trigger: 'change',
        }]
    })
    
    //表单绑定的数据
    const dialogModel = reactive<AddDeptModel>({
        type: "",
        id: "",
        pid: "",
        parentName: "",
        manager: "",
        deptAddress: "",
        deptPhone: "",
        name: "",
        createTime: '',
        updateTime:''
    })
    return {
        rules,
        dialogModel,
        searchModel,
    }
}