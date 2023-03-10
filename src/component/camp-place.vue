<template>
  <div ref="cRef">
    <el-cascader v-model="selectedOptions" :options="regionData" :placeholder="placeholder"> </el-cascader>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { regionData, CodeToText } from 'element-china-area-data'
const selectedOptions = ref([])
const props = defineProps({
  initialPlace: {
    default: ''
  },
  placeholder: {
    default: '请选择地点'
  }
})
const emits = defineEmits(['update:place'])
const cRef = ref(null)
watch(selectedOptions, () => {
  var loc = ''
  for (let i = 0; i < selectedOptions.value.length; i++) {
    loc += CodeToText[selectedOptions.value[i]]
  }
  emits('update:place', loc)
})
onMounted(() => {
  props.initialPlace &&
    cRef.value?.querySelector('input').setAttribute('value', props.initialPlace)
})
</script>

<style lang="scss" scoped></style>
