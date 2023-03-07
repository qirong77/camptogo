<template>
  <div class="settle-in">
    <header>
      <img src="../../../assets/banner.png"  />
      <RouterLink to="/">返回官网</RouterLink>
    </header>

    <h2>欢迎您入驻营探,我们的工作人员将尽快与您联系</h2>
    <el-form ref="loginForm" label-width="120px" :model="form">
      <el-form-item label="申请人全称">
        <el-input v-model="form.applicant_name"></el-input>
      </el-form-item>
      <el-form-item label="注册邮箱" >
        <el-input  v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="注册手机号" >
        <el-input  v-model="form.phoneplatform"></el-input>
      </el-form-item>
      <el-form-item label="联系人姓名" >
        <el-input v-model="form.contact_name"></el-input>
      </el-form-item>
      <el-form-item label="联系人职务" >
        <el-input  v-model="form.contact_job"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交申请</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { request } from '../../../api';

const form = reactive({
  email:'',
  applicant_name:'',
  contact_job:'',
  contact_name:'',
  email:'',
  phoneplatform:''
})
const submit = () =>{
  request.post('/api/e9b849a515a84327b424af7ccdbf2949/mobile/common/v1_0_0/coop/collect',{
    content:{
      ...form,
      platform:'web'
    },
    version:"1.0.0"
  }).then(r=>{
    if(r.data.Code==200) ElMessage('申请成功')
  })
}
</script>

<style lang="scss" scoped>
.settle-in {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  header {
    height: 60px;
    width: 100vw;
    height: 120px;
    display: flex;
    position: relative;
    a {
      text-decoration: none;
      color: white;
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: large;
    }
  }
  h2 {
    margin: 30px 0;
  }
  .el-form {
    .el-input {
      width: 300px;
    }
    .el-form-item {
      margin-top: 30px;
    }
  }
}
</style>
