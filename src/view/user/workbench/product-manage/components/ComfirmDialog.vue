<template>
  <el-dialog
    class="commodity-dialog"
    v-model="dialogVisible"
    title="Tips"
    :width="showReason ? 'fit-content' : '30%'"
    :before-close="handleClose">
    <template #header>
      <span>请填写{{ operationType }}的理由</span>
    </template>
    <p v-if="!showReason">
      {{ desc }}
    </p>
    <div v-else>
      <el-cascader-panel :options="options" :props="cascaderProps" clearable >
     <template><h5>111</h5></template> 
      </el-cascader-panel>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
const options = [
  {
    value: '不可抗力',
    label: '不可抗力',
    children: [
      {
        value: 'disciplines',
        label: '自然灾害',
        children: [
          {
            value: 'consistency',
            label: '新颁布的禁止性政策'
          },
          {
            value: 'feedback',
            label: '社会异常事件'
          },
          {
            value: 'efficiency',
            label: '不可预见、不可避免、不可克服的其他情形'
          },
          {
            value: 'controllability',
            label: '其他'
          }
        ]
      }
    ]
  },
  {
    value: '服务商自身原因',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency'
          },
          {
            value: 'feedback',
            label: 'Feedback'
          },
          {
            value: 'efficiency',
            label: 'Efficiency'
          },
          {
            value: 'controllability',
            label: 'Controllability'
          }
        ]
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation'
          },
          {
            value: 'top nav',
            label: 'Top Navigation'
          }
        ]
      }
    ]
  },
  {
    value: '特殊原因退订',
    label: '特殊原因退订',
    children: []
  }
]
const cascaderProps = {
  checkStrictly: true,
  multiable: true
}
</script>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
const props = defineProps({
  operationType: String,
  showDialog: Boolean
})
const showReason = ref(false)
const dialogVisible = ref(props.showDialog)
const desc = computed(() => {
  switch (props.operationType) {
    case '立即成团': {
      return `确认成团后，消费者将收到成团通知，请您谨慎操作。成团后您与消费者合约正式设立，您应当按照与平台及消费者的约定履行合约。`
    }
    case '立即停售': {
      return `停售后，该商品详情页销售状态变更，消费者无法下单该商品，该商品已审核通过的订单不受影响。
如您需要再次开售，点击立即开售即可。`
    }
    case '立即开售': {
      return '如：活动发生调整，开售提前执行……'
    }
    case '取消活动': {
      return `您发布的商品已成团。您应当履行已与消费者达成的出行协议，否则除退还全部款项外，还需要承担相应的赔偿责任。
如您仍选择取消活动，平台将通知消费者活动取消，并协助处理退赔事宜。具体退赔方式按照您与消费者协议中约定的标准执行，如无约定，按照营探平台规定执行，您可以在【我的-政策条款】中查阅《营探预订和退费须知》 进行明确。
活动一经取消，平台不再为您恢复，请谨慎选择。如您仍需取消活动，请点击【确定】，填写取消理由。`
    }
    default: {
      return ''
    }
  }
})
watchEffect(() => {
  dialogVisible.value = props.showDialog
})
const emits = defineEmits(['close-dialog'])
const handleClose = () => emits('close-dialog')
const confirm = () => {
  if (props.operationType === '取消活动') {
    showReason.value = true
  } else handleClose()
}
</script>

<style lang="scss">
.commodity-dialog {
  .el-dialog__header {
    display: flex;
    justify-content: left;
  }
  .el-dialog__body {
    textarea {
      height: 120px;
    }
  }
  p {
    margin: 0;
    text-align: inherit;
  }
}
</style>
