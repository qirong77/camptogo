<template>
  <el-date-picker
    value-format="YYYY-MM-DDTHH:mm"
    type="datetime"
    :model-value="_data"
    placeholder="开始日期" />
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    default: '请选择日期'
  },
  data: {
    default: ''
  }
})
const _data = ref(props.data)
const emits = defineEmits(['update:data'])
watch(_data, () => {
  emits('update:data', _data)
})
</script>
