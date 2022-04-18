<!-- 
    default-active：当前激活菜单的index，此处设置为当前路由的path
    collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
    background-color : 菜单的背景色
    unique-opened: 是否只保持一个子菜单的展开
 -->
<template>
    <MenuLogoVue v-if="!isCollapse"></MenuLogoVue>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#304156"
        unique-opened
        router
    >
        <MenuItemVue :menuList='menuList'></MenuItemVue>
    </el-menu>
</template>
<script lang="ts" setup>
import MenuItemVue from './MenuItem.vue';
import MenuLogoVue from './MenuLogo.vue';
import { ref,reactive, computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();
//控制菜单展开和关闭
const isCollapse = computed(()=>{
    return store.getters['system/getCollapse'];
});
//菜单数据
let menuList = computed(()=>{
    return store.getters['system/getMenuList'];
})

</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title){
	 color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item){
	color: #bfcbd9;
}
/* 菜单点中文字的颜色 */

:deep(.el-menu-item.is-active){
	color: #409eff !important;
}
/* 当前打开菜单的所有子菜单颜色 */

:deep(.is-opened .el-menu-item){
	background-color: #1f2d3d !important;
}
/* 鼠标移动菜单的颜色 */

:deep(.el-menu-item:hover){
	background-color: #001528 !important;
}
@keyframes logoAnimation {
    0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1);
	}
	100% {
		transform: scale(1);
	}
}
.layout-logo {
    animation: logoAnimation 1s ease-out;
}
</style>