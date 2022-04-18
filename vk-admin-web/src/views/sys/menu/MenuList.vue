<template>
  <el-main class="deptmain" :style="{ height: mainHeight + 'px' }">
    <!-- 搜索栏 -->
    <el-form :model="searchFrom" ref="searchFromeRef" label-width="auto" :inline="true">

      <el-form-item label="名称：">
        <el-input v-model="searchFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="searchFrom.state" placeholder="选择状态">
          <el-option label="正常" value="0" />
          <el-option label="禁用" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="searchBtn">查询</el-button>
        <el-button icon="Plus" v-auth="['sys:menu:add']" @click="addBtn">添加</el-button>
        <el-button icon="CircleCloseFilled" @click="resetBtn">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="menuList.list" style="width: 100%" :height="tableHeight" row-key="id" border lazy
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column :width="tableWidth + 'px'" prop="name" label="名称" />
      <el-table-column :width="tableWidth + 'px'" prop="path" label="地址" />
      <el-table-column :width="tableWidth + 'px'" prop="menuType" label="类型" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.menuType == '1'" type="success" disable-transitions>菜单</el-tag>
          <el-tag v-if="scope.row.menuType == '2'" type="info" disable-transitions>目录</el-tag>
          <el-tag v-if="scope.row.menuType == '3'" type="danger" disable-transitions>按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column :width="tableWidth + 'px'" prop="sort" label="排序" />
      <el-table-column :width="tableWidth + 'px'" prop="auth" label="权限" />
      <el-table-column :width="tableWidth + 'px'" prop="state" align="center" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state == '0'" type="success" disable-transitions>启用</el-tag>
          <el-tag v-if="scope.row.state == '1'" type="danger" disable-transitions>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column :width="tableWidth + 'px'" prop="createTime" label="创建时间" />
      <el-table-column :width="tableWidth + 'px'" prop="updateTime" label="修改时间" />
      <el-table-column width="250px" align="center" label="操作" fixed="right">
        <template #default="scope">
          <el-button size="small" type="success" icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" icon="Close" @click="deleteBtn(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <AddAndEditVue @save="save" ref="addMenuRef" :menuList="menuList.list"></AddAndEditVue>
</template>
<script setup lang='ts'>
import { ref, reactive, nextTick } from 'vue'
import menuBasic from './useBasic';
import AddAndEditVue from './AddAndEdit.vue'
// 基础时间
const { searchFrom, addMenuRef,searchBtn,addBtn, resetBtn, editBtn, deleteBtn, menuList,save } = menuBasic()
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