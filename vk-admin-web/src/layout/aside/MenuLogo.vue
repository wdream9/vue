<template>
    <div class="logo">
        <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt="logo" />
        <span class="title">ViKell Admin</span>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.logo {
    background-color: #2b2f3a;
    height: 50px;
    border: none;
    line-height: 50px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    color: #fff;
    img {
        width: 32px;
        height: 32px;
        margin-right: 12px;
    }
    span {
        font-weight: 600;
        display: inline-block;
        width: 120px;
        line-height: 50px;
        align-content: center;
        font-size: 16px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
    }
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