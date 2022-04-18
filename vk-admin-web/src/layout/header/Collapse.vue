<template>
    <el-icon @click="changeIcon" class="icons">
        <component :is="status ? Fold : Expand" />
    </el-icon>
</template>
<script setup lang='ts'>
import { Fold, Expand } from '@element-plus/icons'
import { ref } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const status = ref(false);
//搜索按钮切换事件
const changeIcon = () => {
    status.value = !status.value;
    store.commit('system/setCollapse',status.value)
}
</script>
<style scoped lang='scss'>
.icons {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #303133;
    cursor: pointer;
}
</style>