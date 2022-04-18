import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons'
import { getTokenCookie, removeCookie } from './http/auth'
import resetForm from '@/hooks/resetForm'
import objCoppy from '@/hooks/objCoppy'
import myconfirm from '@/hooks/myconfirm'
import mymessage from '@/hooks/message'
//按钮权限
import {auth} from '@/directives/permission'

const app = createApp(App);
app.use(router);
app.use(store, key);
app.use(ElementPlus);
app.mount('#app');
// 全局注册矢量图标
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
// 注册权限指令
app.directive('auth', auth)
//清空表单
app.config.globalProperties.$resetForm = resetForm;
//对象复制
app.config.globalProperties.$objCoppy = objCoppy;
//确定弹框
app.config.globalProperties.$myconfirm = myconfirm;
//通知弹框
app.config.globalProperties.$mymessage = mymessage;



const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  let token = getTokenCookie('vk');
  if (token) { //token存在
    if (to.path === "/login" || to.path === "/") {
      next({ path: '/' })
    } else {
      let hasRoles = store.state.user.permissions && store.state.user.permissions.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          await store.dispatch('user/getInfo')
          await store.dispatch('system/getMenuList', router)
          //确保动态添加的路由已经被完全加载上去
          next({ ...to, replace: true })
        } catch (error) {
          //重置token
          removeCookie('vk');
          //跳到登录
          next({ path: '/login' })
        }

      }
    }
  } else { //token不存在 , 跳转的时候，需要注意 BredCum.vue里面判断first
    //判断是否存在白名单中
    if (whiteList.indexOf(to.path) !== -1) { //存在白名单中
      next();
    } else { //不存在白名单中,去登录
      next({ path: '/login' })
    }
  }
})


