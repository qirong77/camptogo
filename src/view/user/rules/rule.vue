<template>
  <user-layout :side-width="280">
    <template #side>
      <el-menu @select="handleOpen">
        <el-sub-menu :index="i.toString()" v-for="(f, i) in files">
          <template #title>
            <span>{{ f[0] }}</span>
          </template>
          <el-menu-item v-for="(n, j) in f[1]" :index="i + '-' + j">{{
            n
          }}</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </template>
    <template #main>
      <rule-file :index="cur" />
    </template>
  </user-layout>
</template>

<script setup>
import { ref } from 'vue'
import userLayout from '../user-layout.vue'
import RuleFile from './rule-file.vue'
const level0 = ['工作台指引', ['营探风险告知书']]
const level1 = [
  '入驻协议',
  [
    '营探用户协议',
    '营探隐私政策',
    '营探优惠卷使用规则',
    '营探平台预定和退费须知',
    '营探服务商入驻协议及授权条款',
    '营探服务商入驻须知及其附件',
    '营探诚信保证金管理规定'
  ]
]
const level2 = ['日常管理', ['营探服务商管理办法', '营探服务商收费标准']]
const level3 = [
  '保险',
  [
    '营探定制保险方案保险方案',
    '组织者责任保险条款',
    '旅游者人身意外伤害保险条款',
    '附加旅行突发性疾病身故保险条款',
    '附加旅行医疗费用保险条款',
    '附加旅行住院津贴保险条款',
    '附加高风险运动意外伤害保险条款',
    '附加旅行公共交通工具意外伤害保险条款',
    '附加食物中毒保险条款',
    '附加救护车费用保险条款',
    '附加旅行个人责任及宠物责任保险'
  ]
]
const files = [level0, level1, level2, level3]
const cur = ref('0-0')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
  cur.value = key
}
</script>
