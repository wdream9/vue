<template>
    <el-container class="layout">
      <el-aside width="230px" class="asside">
          <MenuBarVue></MenuBarVue>
      </el-aside>
      <el-container>
        <el-header class="header">
            <HeaderVue></HeaderVue>
        </el-header>
        <el-main class="main">
            <TabsVue></TabsVue>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<script setup lang="ts">
import MenuBarVue from './aside/MenuBar.vue';
import HeaderVue from './header/Header.vue';
import TabsVue from './Tabs.vue';

</script>
<style scoped lang="scss">
.layout {
    height: 100%;
    .asside {
        width: auto;
        background-color: #304156;
    }
    .header {
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
    }
    .main {
        background-color: #f0f2f5;
        padding: 0px;
        padding-left: 5px;

    }
}


</style>