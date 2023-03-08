<script setup>
import { ref, onMounted, reactive } from "vue";
import { request } from "../../../../api";
import { useStore } from "../../../../store";
//备注：

//审核列表
const progressData = ref([]);
const filterTime = ref((row, column) => {
  //格式化时间过滤器函数
  let data = row[column.property];
  let dt = new Date(data);
  return dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
});
//api请求
const store = useStore();
const api =
  "/api/e9b849a515a84327b424af7ccdbf2949/web/v1_0_0/workticketaudit/list/user/all";
onMounted(() => {
  request
    .post(api, {
      user: {
        id: store.user.id,
      },
    })
    .then((res) => {
      progressData.value = res.data.details;
    });
});
//查看
const ChackProgress = ref(() => {
  // console.log("yes");
});
//页脚
const currentPage4 = ref(4);
const pageSize4 = ref(100);
const background = ref(true);
const disabled = ref(false);

const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>

<template>
  <div class="progress">
    <!-- 标题 -->
    <div class="title">审核进度</div>
    <!-- 卡片 -->
    <div class="progress-card">
      <el-card class="box-card">
        <el-table :data="progressData" style="width: 100%">
          <el-table-column
            fixed
            prop="date_created"
            label="创建日期"
            align="center"
            :formatter="filterTime"
          ></el-table-column>
          <el-table-column prop="content.id" label="内容模块" align="center" />
          <el-table-column prop="create_reason" label="申请理由" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <el-tag class="ml-2" style="color: dodgerblue; border: dodgerblue solid 1.5px"
              >审核通过</el-tag
            ></el-table-column
          >
          <el-table-column label="操作" align="center">
            <el-button type="text" @click="ChackProgress">查看</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 分页页脚 -->
    <footer>
      <div class="foot-block-pagination">
        <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next,sizes, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  footer {
    position: fixed;
    background-color: white;
    width: 100%;
    height: 80px;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 99;
    box-shadow: -1px -3px 5px 2px rgb(0 0 0 / 4%);
    .foot-block-pagination {
      margin-right: -29%;
    }
  }
}
.title {
  font-family: "PingFang SC";
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 16px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
//卡片
.progress-card {
  .box-card {
    margin-left: 16px;
    width: auto;
  }
}
</style>
