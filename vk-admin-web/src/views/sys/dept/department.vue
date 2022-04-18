<template>
  <el-main class="deptmain" :style="{ height: mainHeight + 'px' }">
    <!-- 搜索栏 -->
    <el-form :model="searchModel" label-width="auto" :inline="true" class="searchFrom">
      <el-form-item label="名称：">
        <el-input v-model="searchModel.searchName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button icon="Search" @click="searchBtn">查询</el-button>
        <el-button type="primary" icon="Plus" @click="addBtn">新增</el-button>
        <el-button type="primary" icon="CircleCloseFilled" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="4">
        <!-- 左侧部门树 -->
        <DeptTreeCard @getDeptList="getDeptList"></DeptTreeCard>
      </el-col>
      <el-col :span="20">
        <!-- 表格 -->
        <el-table :data="tableData.list" :height="tableHeight" border>
          <el-table-column :width="tableWidth + 'px'" prop="name" label="部门名称" />
          <el-table-column :width="tableWidth + 'px'" prop="parentName" label="父部门" />
          <el-table-column :width="tableWidth + 'px'" prop="deptAddress" label="地址" />
          <el-table-column :width="tableWidth + 'px'" prop="manager" label="联系人" />
          <el-table-column :width="tableWidth + 'px'" prop="deptPhone" label="电话" />
          <el-table-column :width="tableWidth + 'px'" prop="createTime" label="创建时间" />
          <el-table-column :width="tableWidth + 'px'" prop="updateTime" label="修改时间" />
          <el-table-column fixed="right" width="250px" align="center" label="操作">
            <template #default="scope">
              <el-button size="small" type="success" icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" icon="Close" @click="deleteBtn(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-main>
  <!-- 弹窗 -->
  <AddAndEditVue ref="addDeptRef" @save="save"></AddAndEditVue>
</template>
<script setup lang='ts'>
import { ref, reactive, nextTick } from 'vue'
import deptBasic from './basicDept'
import DeptTreeCard from './deptTreeCard.vue'
import AddAndEditVue from './AddAndEdit.vue';
import deptApi from './apiDept'
//基础数据
const { searchModel, } = deptBasic();
const tableWidth = ref(190)
//表格列表
const { searchBtn, addBtn, editBtn,resetBtn, deleteBtn, addDeptRef, tableData, getDeptList, save } = deptApi(searchModel);
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
  margin-right: 20px;
}
</style>