<template>
  <div class="product-form">
    <header>{{ title }}</header>
    <el-form> <slot name="form"></slot> </el-form>
  </div>
</template>

<script setup>
defineProps({
  title: {
    default: '标题'
  }
})
</script>

<style lang="scss">
.product-form {
  background-color: white;
  margin: 20px 30px 0;
  width: 816px;
  padding: 56px 20px 20px 20px;
  position: relative;
  > header {
    padding-left: 20px;
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    line-height: 56px;
    width: 816px;
    border-bottom: 1px solid #e4dfdf;
    font-weight: bold;
  }
  .el-form {
    padding-left: 10px;
  }
  .el-form-item {
    margin: 40px 0;
    .el-form-item__label {
      width: 130px;
      justify-content: flex-start;
    }
  }
  .el-input-number {
    width: 88px;
  }
  .el-textarea {
    width: auto;
    min-width: 400px;
    textarea {
      height: 120px;
    }
  }
  .el-form-item__content {
    > .el-input {
      width: auto;
    }
  }
}
</style>
