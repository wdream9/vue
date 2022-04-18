<template>
  
  <el-button type="primary" size="default" @click="cors_mock">点击-cors-mock</el-button>
  <el-button size="mini"  v-auth="'sys:wang'"  type="primary">测试按钮权限</el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useStore } from '../store/index'
import http from '@/http/http';

const store = useStore();

const id = ref(0);
const name = ref('');
const nick = ref('');

const u_id = ref(0);
const u_name = ref('');
const u_nick = ref('');

const changeInfo = () => {
  store.dispatch('system/changeId', 110);
  store.dispatch('system/changeName', 'wyh');
  store.dispatch('system/changeNick', '小怪兽');

  id.value = store.getters['system/getId'];
  name.value = store.getters['system/getName'];
  nick.value = store.getters['system/getNick'];


  store.dispatch('user/changeId', 110);
  store.dispatch('user/changeName', 'wyh');
  store.dispatch('user/changeNick', '小怪兽');

  u_id.value = store.getters['user/getId'];
  u_name.value = store.getters['user/getName'];
  u_nick.value = store.getters['user/getNick'];
}

// mock
const mock = () => {

  axios.get(`/api/mock`).then(res => {
    console.log('users', res)
  }).catch(err => {
    console.log(err)
  })
}
const cors_mock = () => {
  // 跨域请求
  http.get({
    url: '/api/mock'
  }).then((res: any) => {
    console.log(res)
  })
}

</script>
