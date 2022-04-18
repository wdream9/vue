<template>
    <SysDialogVue :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="confirm">
        <template v-slot:content>
            <el-form :model="menuDailogModel" ref="addFromRef" label-width="80px" :rules="rules" :inline="false">
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item prop="name" label="名称：">
                            <el-input v-model="menuDailogModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item prop="path" label="地址：">
                            <el-input v-model="menuDailogModel.path"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item prop="menuType" label="类型：">
                            <el-radio-group v-model="menuDailogModel.menuType">
                                <el-radio :label="'1'">菜单</el-radio>
                                <el-radio :label="'2'">目录</el-radio>
                                <el-radio :label="'3'">按钮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item prop="auth" label="权限：">
                            <el-input v-model="menuDailogModel.auth"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item prop="sort" label="排序：">
                            <el-input v-model="menuDailogModel.sort"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item prop="state" label="状态：">
                            <el-radio-group v-model="menuDailogModel.state">
                                <el-radio :label="'0'">正常</el-radio>
                                <el-radio :label="'1'">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="gutter">
                    <el-col :span="12" :offset="0">
                        <el-form-item prop='parentName' label="上级菜单：">
                            <el-input type="hidden" v-model="menuDailogModel.parentId"></el-input>
                            <!-- <el-input v-model="menuDailogModel.parentName"></el-input> -->
                            <el-select
                                v-model="menuDailogModel.parentName"
                                placeholder="请选择上级部门"
                            >
                                <el-option type="hidden"></el-option>
                                <el-tree
                                    :data="menuList"
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
                    <el-col :span="12" :offset="0">
                        <el-form-item :label="menuDailogModel.menuType != '3' ? '菜单图标': '备注'">
                            <el-input v-if="menuDailogModel.menuType != '3'" v-model="menuDailogModel.icon"></el-input>
                            <el-input v-if="menuDailogModel.menuType == '3'" v-model="menuDailogModel.comments"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="gutter" v-if="menuDailogModel.menuType != '3'">
                    <el-col :span="span">
                        <el-form-item label="备注：">
                            <el-input v-model="menuDailogModel.comments"></el-input>
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
import { ref, watch } from 'vue';
import addAndEdit from './addAndedit';
import { MenuModel } from './menuModel';

const gutter = ref(0);
const span = ref(12);
//声明事件
const emit = defineEmits(['save'])
// 声明属性   菜单树
const props = defineProps({
    menuList: {
        type: Array,
    }
})
//弹框属性
const { dialog, onShow, onClose } = useDialog()
// 菜单点击
const handleNodeClick = (data: MenuModel) => {
    console.log("点击菜单树====>",data)
    menuDailogModel.parentId = data.id
    menuDailogModel.parentName = data.name
}
const { menuDailogModel, rules, confirm, show } = addAndEdit(dialog, onShow, onClose, emit)

//监听属性变化
watch(()=>props.menuList,()=>{
    console.log("菜单树改变了===》",props.menuList)
})

//暴露方法给外部使用
defineExpose({
    show
})
</script>
<style scoped lang='scss'>
:deep(.el-input__inner){
    width: auto;
}
:deep(.el-select){
    width: auto;
}
</style>