<template>
    <SysDialogVue
        :title="dialog.title"
        :visible="dialog.visible"
        :height="dialog.height"
        :width="dialog.width"
        @onClose="onClose"
        @onConfirm="confirm"
        
    >
        <template v-slot:content>
            <el-form
                :model="dialogModel"
                ref="deptDialogRef"
                :rules="rules"
                :inline="false"
                label-width="auto"
            >
                <el-row>
                    <el-col :span="spans">
                        <el-form-item prop="name" label="部门名称:">
                            <el-input v-model="dialogModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="spans">
                        <el-form-item label="父部门:">
                            <el-select
                                v-model="dialogModel.parentName"
                                :disabled="dialogModel.pid == 0 && dialogModel.type != '0' ? true : false"
                                placeholder="请选择上级部门"
                            >
                                <el-option style="display:none"></el-option>
                                <el-tree
                                    :data="deptTree"
                                    :props="{
                                        children: 'children',
                                        label: 'name',
                                    }"
                                    accordion
                                    @node-click="handleNodeClick"
                                />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="spans">
                        <el-form-item label="联系人:">
                            <el-input v-model="dialogModel.manager"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="spans">
                        <el-form-item label="电话:">
                            <el-input v-model="dialogModel.deptPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="spans">
                        <el-form-item label="地址:">
                            <el-input v-model="dialogModel.deptAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </template>
    </SysDialogVue>
</template>
<script setup lang='ts'>
import SysDialogVue from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { EditType, Title } from '@/hooks/EditType'
import useBaseModel from '@/views/sys/dept/basicDept';
import { computed, getCurrentInstance, ref } from 'vue';
import { AddDeptModel } from './modelDept';
import useInstance from '@/hooks/globalInstance';
import { ElForm } from "element-plus";
import { useStore } from '@/store';
const store = useStore();
//基础数据
const { dialogModel, rules } = useBaseModel();
const spans = ref(11)
const deptDialogRef = ref<InstanceType<typeof ElForm>>();
//弹框
const { dialog, onClose, onConfirm, onShow } = useDialog();
const { global } = useInstance();
//注册事件
const emit = defineEmits(['save'])
const handleNodeClick = (data: AddDeptModel) => {
    console.log(data)
    dialogModel.parentName = data.name
}
// 确定
const { proxy } = getCurrentInstance() as any;
//弹框确定返回表单值给父组件
const confirm = async () => {
    //返回值
    console.log(dialogModel)
    // 表单验证
    proxy.$refs.deptDialogRef.validate(async (valid: boolean) => {
        //关闭弹框
        if (valid) {
            onConfirm();
            emit('save', dialogModel)
        }
    })

}
// 部门树
const deptTree = computed(() => {
    return store.getters['system/getDeptTree']
})
//父组件调用子组件展示弹框
const show = (type: string, editModel?: any) => {
    //显示弹框
    onShow();
    //设置弹框的标题
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    dialog.height = 220;
    dialog.width = 650
    if (type == EditType.ADD) {
        // 新增清空上一次表单类容
        global.$resetForm(deptDialogRef, dialogModel)
        //设置type
        dialogModel.type = type;
    } else {
        // 对象赋值
        global.$objCoppy(editModel, dialogModel)
        dialogModel.type = type;
    }
}

defineExpose({
    show
})
</script>
<style scoped lang='scss'>
</style>