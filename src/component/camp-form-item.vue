<template>
  <el-form-item
    :label="label"
    :prop="prop"
    :rules="{
      trigger:{
        
      },

      message: '该选择为必填项',
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
  }
})
</script>

<style lang="scss" scoped></style>
