<template>
    <SysDialogVue :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="confirm">
        <template v-slot:content>
            <el-form :model="roleDailogModel" ref="addFromRef" label-width="80px" :rules="rules" :inline="false">
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item prop="code" label="编码：">
                            <el-input v-model="roleDailogModel.code"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item prop="name" label="名称：">
                            <el-input v-model="roleDailogModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item prop="range" label="数据范围：">
                            <el-input v-model="roleDailogModel.range"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item prop="state" label="状态：">
                            <el-radio-group v-model="roleDailogModel.state">
                                <el-radio :label="'0'">正常</el-radio>
                                <el-radio :label="'1'">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="gutter">
                    <el-col :span="span">
                        <el-form-item label="菜单：">
                            <!-- <el-input v-model="roleDailogModel.menuName">@node-click="handleNodeClick"</el-input> -->
                            <el-tree :data="menuList.list" :props="{
                                children: 'children',
                                label: 'name',
                            }" accordion show-checkbox @check-change="handleNodeClick" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="span">
                        <el-form-item label="备注：">
                            <el-input v-model="roleDailogModel.comments"></el-input>
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
import { ref } from 'vue';
import addAndEdit from './addAndedit';

const gutter = ref(0);
const span = ref(12);
//声明事件
const emit = defineEmits(['save'])

//弹框属性
const { dialog, onShow, onClose } = useDialog()

const { roleDailogModel, rules, confirm, show,menuList,handleNodeClick } = addAndEdit(dialog, onShow, onClose, emit)



//暴露方法给外部使用
defineExpose({
    show
})
</script>
<style scoped lang='scss'>
</style>