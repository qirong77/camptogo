<template>
  <el-upload
    name="image"
    :headers="authHeader"
    :on-success="handleSuccess"
    :action="userApi.video"
    v-model:file-list="fileList"
    :class="{
      hiddenUpload: images && typeof images === 'string'
    }"
    auto-upload
    class="camp-uploader"
    list-type="picture-card"
    :multiple="false">
    <el-icon class="camp-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { authHeader } from '../api'
import { userApi } from '../api/modules/user/user'
const props = defineProps({
  images: {
    default: []
  }
})
const handleSuccess = (r, f) => {
  ElMessage('上传成功')
}
const obj = {
  url: props.images || '',
  name: ''
}
const normalList =
  props.images instanceof Array ? props.images : props.images ? [obj] : []
const fileList = ref(normalList)
</script>

<style lang="scss">
.camp-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss">
.camp-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.camp-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
div.hiddenUpload {
  div.el-upload--picture-card {
    display: none;
  }
}
.el-icon.camp-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
