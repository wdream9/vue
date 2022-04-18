<template>
  <SysDialogVue :title="dialog.title" :visible="dialog.visible" :height="dialog.height" :width="dialog.width"
    @onClose="onClose" @onConfirm="confirm">
    <template #content>
      <el-form :model="userDialogModel" ref="addFromRef" :rules="rules" label-width="auto" :inline="true">
        <el-row :gutter="gutter">
          <el-col :span="span">
            <el-form-item prop="avatar" label="头像：">
              <AvatarVue @url="geturl" :avatar="userDialogModel.avatar"></AvatarVue>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-row>
              <el-col>
                <el-form-item prop="loginName" label="登录名：">
                  <el-input v-model="userDialogModel.loginName"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item prop="name" label="姓名：">
                  <el-input v-model="userDialogModel.name"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="span">
            <el-form-item prop="mobile" label="手机号：">
              <el-input v-model="userDialogModel.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-form-item label="部门：">
              <!-- <el-input v-model="userDialogModel.deptName"></el-input> -->
              <el-select v-model="userDialogModel.deptName" placeholder="请选择上级部门">
                <el-option style="display:none"></el-option>
                <el-tree :data="deptTree" :props="{
                  children: 'children',
                  label: 'name',
                }" accordion @node-click="handleNodeClick" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="span">
            <el-form-item prop="email" label="邮箱：">
              <el-input v-model="userDialogModel.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-form-item prop="state" label="状态：">
              <el-radio-group v-model="userDialogModel.state">
                <el-radio :label="'0'">正常</el-radio>
                <el-radio :label="'1'">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="span">
            <el-form-item prop="password" label="密码：">
              <el-input type="password" show-password v-model="userDialogModel.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-form-item prop="confirmPassword" label="确认密码：">
              <el-input type="password" show-password v-model="userDialogModel.confirmPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="gutter">
          <el-col :span="span">
            <el-form-item label="角色：">
              <el-select class="el-input__diatext" v-model="userDialogModel.roleIds" multiple collapse-tags
                placeholder="请选择">
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="span">
            <el-form-item label="备注：">
              <el-input v-model="userDialogModel.comments" autosize type="textarea" placeholder="备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    </SysDialogVue>
</template>
<script setup lang='ts'>
import { ref, reactive, getCurrentInstance } from 'vue'
import SysDialogVue from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { UserTableModel } from './modelUser';
import { EditType, Title } from '@/hooks/EditType';
import useInstance from '@/hooks/globalInstance';
import { ElForm } from 'element-plus';
import AvatarVue from './Avatar.vue';
import treeDept from '@/views/sys/dept/treeDept'
import addAndedit from './addAndEdit';
const { global } = useInstance();

const { dialog, onClose, onConfirm, onShow } = useDialog();
const gutter = ref(0)
const span = ref(12)
// 基础属性
const { rules, addFromRef, userDialogModel, treeProps, deptTree, geturl, handleNodeClick,roleList } = addAndedit();

// 显示弹窗
const show = (type: string, editModel?: any) => {
  // 显示弹窗
  onShow();
  //设置弹框的标题
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  dialog.width = 750
  dialog.height = 400
  if (type == '0') {
    // 新增清空上一次的表单
    global.$resetForm(addFromRef, userDialogModel)
    userDialogModel.type = type
  } else {
    console.log("editModel====>", editModel)
    global.$objCoppy(editModel, userDialogModel)
    userDialogModel.type = type
  }
}
// 确定
const { proxy } = getCurrentInstance() as any;
const confirm = () => {
  // 表单验证
  proxy.$refs.addFromRef.validate(async (valid: boolean) => {
    if (valid) {
      // 关闭弹窗
      onConfirm();
      // 父组件save方法
      emit('save', userDialogModel);

    }
  })
}
// 子组件事件
const emit = defineEmits(['save'])
// 暴露组件的方法
defineExpose({
  show
})
</script>
<style scoped lang='scss'>
:deep(.el-form-item__content) {
  width: 212px;
}

.el-form-item {
  margin-top: 10px;
}
</style>