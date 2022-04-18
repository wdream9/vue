<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>部门</span>
            </div>
        </template>
        <div>
            <el-tree
                :data="deptTree"
                :props="{
                    children: 'children',
                    label: 'name',
                }"
                accordion
                @node-click="handleNodeClick"
            />
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import http from '@/http/http'
import { onMounted, reactive, ref, watch } from 'vue'
import { DeptTableAndTreeModel, Tree } from './modelDept'
import { useStore } from '@/store';
import treeDept from './treeDept'
import { UserSearchModel } from '../user/modelUser';
const store = useStore();
const handleNodeClick = (treeNode: DeptTableAndTreeModel) => {
    // 1、获取当前节点信息
    console.log(treeNode)
    // 2、加载当前选择部门信息
    emit("getDeptList", treeNode.id, treeNode.name)
    // 3、加载当前部门的用户
    if (props.isuser) {
        let temp: UserSearchModel = {
            loginName: '',
            name: '',
            mobile: '',
            state: '',
            deptId:treeNode.id,
        }
        emit('getUserList', temp)
    }

}
const emit = defineEmits(['getDeptList', 'getUserList'])
const props = defineProps(['isuser'])
const { deptTree, getDeptTree } = treeDept();

</script>
<style>
.card-header {
    display: flex;
    justify-content: space-between;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}
</style>