<template>
  <div class="commodity">
    <div class="title">订单管理</div>
    <div class="data-show">
      <div shadow="never" class="data-show-content">
        <div class="all">
          <span>未完订单</span>
          <div class="all-number">57</div>
        </div>
        <div class="link-right"></div>
        <div class="draft">
          <span>待审核订单</span>
          <div class="draft-number">20</div>
        </div>
        <div class="wait">
          <span>退款订单</span>
          <div class="wait-number">2</div>
        </div>
        <div class="judge">
          <span>异常订单</span>
          <div class="judge-number">2</div>
        </div>
      </div>
    </div>
    <div class="tool-bar">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部订单" name="first"></el-tab-pane>
        <el-tab-pane label="待审核" name="second"></el-tab-pane>
        <el-tab-pane label="审核通过" name="third"></el-tab-pane>
        <el-tab-pane label="审核未通过" name="fourth"></el-tab-pane>
        <el-tab-pane label="订单取消" name="fifth"></el-tab-pane>
        <el-tab-pane label="订单退款" name="six"></el-tab-pane>
        <el-tab-pane label="异常订单" name="seven"></el-tab-pane>
        <el-tab-pane label="订单完成" name="eight"></el-tab-pane>
      </el-tabs>
      <div class="search-bar">
        <el-input style="width: 400px" v-model="searchWord" placeholder="请输入" class="input-with-select">
          <template #prepend>
            <el-select v-model="selectTag" style="width: 115px">
              <el-option label="订单编号" value="1" />
              <el-option label="商品ID" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="buttons">
          <el-button>重置</el-button>
          <el-button type="primary">查询</el-button>
        </div>
        <div class="buttons2" style="margin-left: 300px">
          <el-button type="primary">批量更新优惠方案</el-button>
          <el-button type="primary" style="border-radius: 4px 0 0 4px">{{ batchOperation }}
          </el-button>
          <el-select v-model="batchOperation" filterable placeholder="Select">
            <el-option v-for="option in options" :key="option.lable" :label="option.lable" :value="option.lable" />
          </el-select>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" height="250">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="index" fixed="left" label="序号" width="90" />
      <el-table-column prop="info" label="商品信息" width="90" />
      <el-table-column prop="status" label="商品状态" width="100" :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' },
      ]" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="scope.row.tag === 'Home' ? 'success' : 'success'" disable-transitions>商品状态</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="index" width="120">
        <template #header>
          <div class="s-thead">
            <div style="text-align: center">库存数量</div>
            <div class="desc">（已售/库存）</div>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="index" label="待审核订单" width="120" />
      <el-table-column prop="index" label="累计收款" width="90" />
      <el-table-column prop="index" width="120">
        <template #header>
          <span>累计退款</span>
          <el-tooltip class="box-item" effect="dark" content="即累计已经确认需退款的额度,包括实际已退款到账额度和在途退款额度。" placement="top">
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="index" width="120">
        <template #header>
          <span>待付款项</span>
          <el-tooltip class="box-item" effect="dark" content="指当服务商通过营探平台购买保险时，营探平台为服务商先行代付给保险公司的款项。" placement="top">
            <el-icon>
              <QuestionFilled />
            </el-icon>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="用户评价信息" width="120" />

      <el-table-column prop="index" width="140">
        <template #header>
          <div class="s-thead">
            <div style="text-align: center">待处理纠纷</div>
            <div class="desc">（已处理/未处理）</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="开售/停售时间" width="120" />
      <el-table-column label="操作" fixed="right" width="200">
        <template #default>
          <div class="controllers">
            <el-tooltip class="box-item" effect="dark" content="Top Center prompts info" placement="top">
              <el-button link type="primary" size="small">修改商品</el-button>
            </el-tooltip>
            <el-button link type="primary" size="small" @click="openOperationDialog('立即停售')">立即停售</el-button>
            <el-button link type="primary" size="small" @click="copyCommodity">复制商品</el-button>
            <el-button link type="primary" size="small" @click="openOperationDialog('取消活动')">取消活动</el-button>
            <el-button link type="primary" size="small">活动改期</el-button>
            <el-button link type="primary" size="small"> 下 架 </el-button>
            <el-button link type="primary" size="small" @click="openOperationDialog('立即成团')">立即成团</el-button>
            <el-button @click="" link type="primary" size="small" style="width: auto">下载报名表信息</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <comfirm-dialog @close-dialog="showOperationDialog = false" :show-dialog="showOperationDialog"
      :operation-type="operationType" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import ComfirmDialog from "./components/ComfirmDialog.vue";
const searchWord = ref("");
const selectTag = ref("");
const activeTab = ref("first");
const batchOperation = ref("批量操作");
const showOperationDialog = ref(false);
const operationType = ref("");
const openOperationDialog = (type = "") => {
  operationType.value = type;
  showOperationDialog.value = true;
};
const tableData = ref([
  {
    // 序号
    index: 0,
    // 商品信息
    info: {},
    status: "在售中",
  },
]);
const copyCommodity = () => {
  ElMessageBox.confirm(
    "复制商品的操作，将便于您创建新商品。生成的新商品页面与当前商品页面完全一致，您应当对全部商品信息做出仔细核查,请勿重复提交同一商品信息",
    "确认要复制商品吗",
    {
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      type: "warning",
    }
  ).then(() => { });
};
</script>
<script lang="ts">
const options = [
  {
    lable: "立即成团",
    value: "",
  },
  {
    lable: "申请结算",
    value: "",
  },
  {
    lable: "商品下架",
    value: "",
  },
  {
    lable: "立即开售",
    value: "",
  },
  {
    lable: "立即停售",
    value: "",
  },
];
</script>
<style lang="scss">
.data-show {
  margin-left: 0px;
  margin-bottom: 18px;

  .data-show-content {
    background-color: white;
    border-radius: 5px;
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-around;
    margin-bottom: 10px;

    .all {
      margin: 25px;

      .all-number {
        font-size: 35px;
        margin-top: 8px;
        font-weight: 300;
        color: #333;
      }
    }

    .link-right {
      position: relative;
      top: 23px;
      margin-left: -90px;
      margin-right: -90px;
      height: 70px;
      border-radius: 10px;
      border-right: solid #999 1px;
    }

    .draft {
      margin: 25px;

      .draft-number {
        font-size: 35px;
        margin-top: 8px;
        font-weight: 300;
        color: #333;
      }
    }

    .wait {
      margin: 25px;

      .wait-number {
        font-size: 35px;
        margin-top: 5px;
        font-weight: 300;
        color: #333;
      }
    }

    .judge {
      margin: 25px;

      .judge-number {
        font-size: 35px;
        margin-top: 8px;
        font-weight: 300;
        color: #333;
      }
    }

    .delete {
      margin: 25px;

      .delete-number {
        font-size: 35px;
        margin-top: 8px;
        font-weight: 300;
        color: #333;
      }
    }
  }
}

.el-popper__arrow {
  display: none;
}

.s-thead {
  font-size: smaller;

  .desc {
    color: #727272;
    position: absolute;
    left: 25px;
    bottom: -2px;
  }
}

.el-table__header {
  height: 50px;
}

div.commodity {
  margin-left: 20px;
  border-radius: 5px;

  .el-table {
    --el-table-header-bg-color: #f5f5f5;

    .cell {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  thead {
    color: #000000;
  }

  .el-tabs__nav-wrap::after {
    height: 0px;
  }

  .buttons {
    margin: 0 20px;
  }

  .buttons2 {
    .el-input__wrapper {
      width: 40px;
      height: 32px;
      padding: 0;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 0 0 0 black;

      input {
        display: none;
      }

      .el-input__suffix {
        .el-input__suffix-inner {
          display: flex;
          justify-content: center;
          align-content: center;

          i {
            margin: 0;
            color: #ffffff;
          }
        }
      }
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .tool-bar {
    padding: 20px;
    background-color: #ffffff;
  }

  .controllers {
    display: flex;
    width: 200px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .el-button {
      width: 50px;
      margin: 0 6px;
    }
  }
}

.title {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 0px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
</style>
