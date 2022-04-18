<template>
    <div class="logincontainer">
        <el-form
            class="loginForm"
            :model="loginModel"
            ref="loginFormRef"
            :rules="rules"
            :inline="false"
        >
            <el-form-item>
                <div class="loginTitle">系统登录</div>
            </el-form-item>
            <el-form-item prop="username">
                <el-input placeholder="请输入账户" v-model="loginModel.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input placeholder="请输入密码" v-model="loginModel.password"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row :gutter="20" style="width:100%">
                    <el-col :span="12">
                        <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <img :src="imgSrc" @click="getImage" />
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row :gutter="20" style="margin-top: 10px;width:100%;">
                    <el-col :span="12">
                        <el-button @click="login" class="mybtn" type="primary" size="default">登录</el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-button class="mybtn" size="default">取消</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import basicLogin from './basicLogin';
import apiLogin from './apiLogin'
// 表单基础
const { loginModel, rules,loginFormRef } = basicLogin();

// api
const { getImage, imgSrc,login } = apiLogin(loginModel);
</script>

<style scoped lang='scss'>
.logincontainer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginForm {
        height: 320px;
        width: 400px;
        border-radius: 10px;
        padding: 20px 35px;
        box-shadow: 0 0 25px #cac6c6;
        .loginTitle {
            font-size: 24px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .mybtn {
            width: 100%;
        }
    }
}
</style>