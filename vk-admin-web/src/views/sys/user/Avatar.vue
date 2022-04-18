<template>
    <el-upload
        class="avatar-uploader"
        action="http://192.168.0.103:8088/aws/qn/image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')


const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any, uploadFile) => {
    console.log("头像上传响应====>", response)
    imageUrl.value = response;
    emit('url',response)

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    return true
}
const emit = defineEmits(['url'])
const props = defineProps(['avatar'])
imageUrl.value = props.avatar;
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;
}
</style>
