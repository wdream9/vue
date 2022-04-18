<template>
  <el-tabs v-model="activeTab" type="card" @tab-click="tabClick" closable @tab-remove="removeTab">
    <el-tab-pane
      v-for="item in tabsList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    ></el-tab-pane>
  </el-tabs>
</template>
<script setup lang='ts'>
import { computed, watch, onMounted, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ITab } from '@/store/type/Index';
const route = useRoute();
const router = useRouter();
const store = useStore();
//激活的选项卡
const activeTab = ref('');
//获取选项卡数据
const tabsList = computed(() => {
  return store.getters['system/getTabsList']
})
//添加选项卡
const addTabe = () => {
  const { path, meta } = route;
  const tab: ITab = {
    title: meta.title as string,
    path: path
  }
  store.commit('system/addTabs', tab);
}
//设置激活的选项卡
const setActive = () => {
  activeTab.value = route.path;
}
//选项卡点击事件
const  tabClick =(tab:any)=> {
  const {props} = tab;
  console.log(props)
  router.push({path:props.name})
}
//关闭选项卡
const removeTab = (targetName: string) => {
  if (targetName === '/dashboard') return;
  const tabs = tabsList.value;
  let activeName = activeTab.value;
  if (activeName === targetName) {
    tabs.forEach((tab: ITab, index: number) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        console.log(nextTab)
        if (nextTab) {
          activeName = nextTab.path
        }
      }
    })
  }
  activeTab.value = activeName
  store.state.system.tabsList = tabs.filter((tab: ITab) => tab.path !== targetName);
  router.push({path:activeName})
}
//解决刷新数据丢失问题
const beforeUnload = () => {
  window.addEventListener("beforeunload", () => {
    console.log('刷新了')
    sessionStorage.setItem("tabViews", JSON.stringify(tabsList.value));
  })
  let tabSession = sessionStorage.getItem("tabViews");
  if (tabSession) {
    let oldViews = JSON.parse(tabSession);
    if (oldViews.length > 0) {
      store.state.system.tabsList = oldViews;
    }
  }
}
onMounted(() => {
  beforeUnload();
  setActive();
  addTabe();
})
watch(() => route.path, () => {
  setActive();
  addTabe();
})
</script>
<style scoped lang='scss'>
:deep(.el-tabs__header) {
  margin: 0px;
}
:deep(.el-tabs__item) {
  height: 26px !important;
  line-height: 26px!important;
  text-align: center!important;
  border: 1px solid #d8dce5 !important;
  margin: 0px 3px!important;
  color: #495060;
  font-size: 12px!important;
  padding: 0xp 10px!important;
}
:deep(.el-tabs__nav) {
  border: none !important;
}
:deep(.is-active) {
  border-bottom: 1px solid transparent !important;
  border: 1px solid #0960bd !important;
  background-color: #0960bd !important;
  color: #fff !important;
}
:deep(.el-tabs__item:hover) {
  color: #495060 !important;
}
:deep(.is-active:hover) {
  color: #fff !important;
}
</style>