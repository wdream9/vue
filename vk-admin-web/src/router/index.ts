import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
        {
            path: '/dashboard',
            component: () => import('@/layout/dashboard/index.vue'),
            name: 'dashboard',
            meta: {
                title: '首页',
                icon: '#icondashboard'
            }
        }
    ]
},
{
    path: '/login',
    name:'login',
    component: () => import('@/views/sys/login/index.vue'),
},
{
    path: '/hello',
    name:'Hello',
    component: () => import('@/components/eltreeselect.vue'),
},
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router