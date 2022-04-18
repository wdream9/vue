<template>
  <el-main class="deptmain" :style="{ height: mainHeight + 'px' }">
    <el-form :model="searchFromModel" ref="serachFromRef" label-width="auto" :inline="true">
      <el-form-item label="登录名：">
        <el-input v-model="searchFromModel.loginName"></el-input>
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="searchFromModel.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="searchFromModel.mobile"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchFromModel.state" placeholder="选择状态">
          <el-option label="正常" value="0" />
          <el-option label="禁用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="searchBtn">查询</el-button>
        <el-button icon="Plus" @click="addBtn">新增</el-button>
        <el-button icon="CircleCloseFilled" @click="resetBtn">重置</el-button>
        <el-button type="primary" icon="CircleCloseFilled" @click="unlock">解锁</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="4">
        <!-- 左侧部门列表 -->
        <deptTreeCardVue @getUserList="getUserTablea" :isuser="true"></deptTreeCardVue>
      </el-col>
      <el-col :span="20">
        <!-- 表格 -->
        <el-table
          :data="userTableModel.list"
          :height="tableHeight"
          style="width: 100%"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed="left" type="selection" width="45" />
          <el-table-column fixed="left" :width="tableWidth + 'px'" prop="loginName" label="登录名" />
          <el-table-column :width="tableWidth + 'px'" prop="avatar" label="头像">
            <template #default="scope">
              <el-image :src="scope.row.avatar" fit="scale-down" style="height:30px;width:100px" />
            </template>
          </el-table-column>
          <el-table-column :width="tableWidth + 'px'" prop="name" label="姓名" />
          <el-table-column :width="tableWidth + 'px'" prop="deptName" label="部门" />
          <el-table-column :width="tableWidth + 'px'" prop="mobile" label="电话" />
          <el-table-column :width="tableWidth + 'px'" prop="email" label="邮箱" />
          <el-table-column :width="tableWidth + 'px'" prop="state" label="状态">
            <template #default="scope">
              <el-tag v-if="scope.row.state == '0'" type="success" disable-transitions>正常</el-tag>
              <el-tag v-if="scope.row.state == '1'" type="danger" disable-transitions>禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column :width="tableWidth + 'px'" prop="createTime" label="创建时间" />
          <el-table-column :width="tableWidth + 'px'" prop="updateTime" label="修改时间" />
          <el-table-column fixed="right" width="250px" align="center" label="操作">
            <template #default="scope">
              <el-button size="small" type="success" icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" icon="Close" @click="deleteBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-main>
  <!-- 弹窗 -->
  <AddAndEditVue ref="addUserRef" @save="save"></AddAndEditVue>
</template>
<script setup lang='ts'>
import { ref, reactive, nextTick } from 'vue'
import AddAndEditVue from './AddAndEdit.vue';
import deptTreeCardVue from '../dept/deptTreeCard.vue';
import userBasic from './useBasic';

//基础数据
const { searchFromModel, serachFromRef, addUserRef, userTableModel, getUserTablea, searchBtn, addBtn, resetBtn, unlock, handleSelectionChange, editBtn, deleteBtn, save } = userBasic();
const tableWidth = ref(180)
const mainHeight = ref(0)
const tableHeight = ref(0)
nextTick(() => {
  mainHeight.value = window.innerHeight - 120;
  tableHeight.value = window.innerHeight - 220;
})
</script>
<style scoped lang='scss'>
.deptmain {
  background-color: #fff;
  width: auto;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 30px;
  .el-form-item {
    margin-right: 5px;
  }
}
</style>