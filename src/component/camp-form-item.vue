<template>
  <el-form-item
    :label="label"
    :prop="prop"
    :rules="{
      trigger:'blur',
      message:msg,
      required: true
    }">
    <template #label>
      <slot name="label"></slot>
    </template>
    <slot></slot>
  </el-form-item>
</template>

<script setup>
defineProps({
  label: {
    default: 'label'
  },
  prop: {
    default: ''
  },
  isArray: {
    default: false
  },
  msg:{
    default:'该选择为必填项',
  }
})
</script>

<style lang="scss" scoped></style>
