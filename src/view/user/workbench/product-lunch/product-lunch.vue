<template>
  <!-- 添加数据展示栏，添加已删除 -->
  <div class="overview">
    <div class="title">商品发布</div>
    <div class="data-show">
      <div shadow="never" class="data-show-content">
        <div class="all">
          <span>全部商品</span>
          <div class="all-number">57</div>
        </div>
        <div class="link-right"></div>
        <div class="draft">
          <span>草稿</span>
          <div class="draft-number">20</div>
        </div>
        <div class="wait">
          <span>待上架</span>
          <div class="wait-number">2</div>
        </div>
        <div class="judge">
          <span>审核中</span>
          <div class="judge-number">2</div>
        </div>
        <div class="delete">
          <span>已删除</span>
          <div class="delete-number">2</div>
        </div>
      </div>
    </div>
    <div class="tool-bar">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部商品" name="all"></el-tab-pane>
        <el-tab-pane label="草稿" name="5100"></el-tab-pane>
        <el-tab-pane label="待上架" name="5300"></el-tab-pane>
        <el-tab-pane label="审核中" name="5200 5310"></el-tab-pane>
        <!-- 已删除 未添加逻辑 -->
        <el-tab-pane label="已删除" name="5200 5320"></el-tab-pane>
        <!-- 已删除 未添加逻辑 -->
      </el-tabs>
      <div class="search-bar" style="display: flex; margin-top: 10px">
        <el-input
          style="width: 400px"
          v-model="searchWord"
          placeholder="请输入"
          class="input-with-select">
          <template #prepend>
            <el-select v-model="selectTag" style="width: 115px">
              <el-option label="商品状态" value="1" />
              <el-option label="商品ID" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
        <div class="buttons" style="margin-left: 40px">
          <el-button @click="searchWord = ''">重置</el-button>
          <el-button type="primary">查询</el-button>
          <el-button
            type="primary"
            @click="() => goPublishProduct()"
            >发布商品</el-button
          >
          <span
            class="desc"
            style="color: gray; font-size: small; margin-left: 20px"
            >*已上架商品请前往商品管理模块进行操作</span
          >
        </div>
      </div>
    </div>
    <div class="cards">
      <product-card
        v-for="(p, index) in producets"
        :key="p.id"
        :desc="p.full_name"
        :price="p.price_selling"
        :start-time="p.product_launching_time"
        :end-time="p.product_expiration_time"
        :area="p.location_city"
        :lunch-status="p.status"
        :image-url="p.horizontal_shows[0].url"
        @go-to-detail="() => gotoDetail(index)"
        :status="p.status">
      </product-card>
    </div>
  </div>
</template>

<script setup>
import ProductCard from './components/product-card.vue'
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from 'vue'
import { userApi } from '../../../../api/modules/user/user'
import { request } from '../../../../api'
import { useStore } from '../../../../store'
import { useRouter } from 'vue-router'
const router = useRouter()
const activeTab = ref('all')
const searchWord = ref('')
const selectTag = ref('')
const store = useStore()
const producets = ref([])
const totalProducts = ref([])
watch(activeTab, () => {
  console.log('📕', activeTab.value)
  if (activeTab.value === 'all') producets.value = totalProducts.value
  else
    producets.value = producets.value.filter(p => {
      if (activeTab.value.includes(p.status)) return p
    })
})
const goPublishProduct = () => {
  router.push('/workbench/product/new')
}
const gotoDetail = (index = 0) => {
  store.setProduct(producets.value[index])
  router.push('/workbench/product/' + producets.value[index].id)
}
onMounted(() => {
  request
    .post(userApi.getList, {
      user_id: store.user.id
    })
    .then(res => {
      producets.value =
        res.data.details?.products.filter(p => p.status != 5400) ||
        producets.value
      totalProducts.value = producets.value
    })
})
</script>

<style lang="scss">
.overview {
  height: 100%;
  width: 99%;
  .data-show {
    margin-left: 18px;
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
  .tool-bar {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    margin-left: 18px;
  }
  > header {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    background-color: white;
    margin-bottom: 30px;
  }
  .cards {
    background-color: white;
    padding: 15px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-left: 18px;
  }
}
.title {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 16px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}
</style>
