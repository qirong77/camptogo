<template>
  <div>
    <!-- 标题 -->
    <div class="title">使用反馈</div>
    <!-- 主体 -->
    <div>
      <el-form label-width="130px" label-position="left">
        <el-card class="block">
          <el-form-item label="反馈类别：" class="formItem">
            <el-input placeholder="" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="反馈内容：" class="formItem">
            <el-input
              style="width: 500px"
              :maxlength="200"
              :rows="4"
              type="textarea"
              placeholder="请描述问题"
              resize="none"
            />
          </el-form-item>

          <el-form-item label="反馈人姓名：" class="formItem">
            <el-input
              placeholder="请输入真实姓名"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系手机：" class="formItem">
            <el-input
              placeholder="请输入手机号码"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱：" class="formItem">
            <el-input
              placeholder="请输入邮箱地址"
              style="width: 500px"
            ></el-input>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.title {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 16px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.block {
  width: 80%;
  margin-left: 24px;
  margin-bottom: 16px;
  min-width: 1000px;

  .bBody {
    margin-left: 30px;

    > * {
      margin-top: 30px;
    }
  }

  .settingMoudle {
    font-size: 14px;
  }

  .itemLabelTit {
    text-indent: 2em;
    display: inline-block;
  }

  .formItem {
    display: flex;
  }

  .grayLabel {
    font-family: "PingFang SC";
    font-style: normal;
    margin-left: 10px;
    font-size: 12px;
    color: #8a8a8a;
    float: left;
    line-height: 20px;
    white-space: nowrap;
  }
}
.timeCheckbox {
  :deep(.el-checkbox__inner) {
    border-radius: 50% !important;
    overflow: hidden;
  }
}
</style>
