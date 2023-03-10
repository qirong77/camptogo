<template>
  <div class="manager-setting">
    <div class="title">主理人设置</div>
    <div>
      <el-form>
        <el-card class="block">
          <el-form-item label="主理人名称：">
            <el-input
              v-model="form.name"
              style="width: 300px"
              placeholder="请输入品牌名、主理人本名或机构名称"></el-input>
          </el-form-item>
          <el-form-item label="主理人简称：">
            <el-input
              style="width: 300px"
              v-model="form.describe"
              placeholder="请输入主理人简称，限6个字以内"></el-input>
            <span class="grayLabel"> *可能会用于不同模块的推送 </span>
          </el-form-item>
          <el-form-item label="主理人头像：">
            <div style="display: block">
              <span class="grayLabel">
                请上传1张高质量头像，并确保该图片不存在侵犯他人知识产权的风险，若头像包含您已注册的商标，<br>请在“主理人证明材料”处上传商标注册证。图片比例为1:1，支持jpg/png，小于1M。
              </span>
              <campUpload :images="form.avatar_square" />
            </div>
          </el-form-item>
          <el-form-item label="主理人版头图：">
            <div style="display: block">
              <span class="grayLabel">
                请上传1张高质量横版形象照，图片比例为1:1，支持jpg/png，小于1M。
              </span>
              <campUpload :images="form.portrait" />
            </div>
          </el-form-item>
          <el-form-item label="主理人证明材料:">
            <div style="display: block">
              <span class="grayLabel">
                若主理人名称、主理人简称、主理人头像、主理人版头图涉及文字或图形商标使用的，请在此处上传相关证明材料。彩色图片，支持jpg/png。
              </span>
              <campUpload :images="form.evidences" />
            </div>
          </el-form-item>
          <el-form-item label="主理人简介：">
            <el-input
              v-model="form.abbr"
              type="textarea"
              placeholder="请输入主理人介绍或团队介绍" />
          </el-form-item>
          <el-form-item label="主理人风采图：">
            <div style="width: 100%;">
              <span class="grayLabel">
                请上传2-4张高质量横版风采图，图片比例为3:2，支持jpg/png格式，单张图片小于2M，可拖动图片排序:1，支持jpg/png，小于1M。
              </span>
            </div>

            <campUpload :images="form.shows" />
          </el-form-item>
          <el-form-item label="荣誉资质展示：">
            <div style="display: block">
              <span class="grayLabel">
                *请上传营业执照及其它荣誉资质“原件”“彩色”扫描件，涉及个人敏感信息的内容须在“证件号码”处打码，图片比例不限，支持jpg/png格式，<br>上传数量不限，单张图片小于2M
              </span>
              <campUpload :images="form.honor" />
            </div>
          </el-form-item>
        </el-card>
      </el-form>
    </div>
    <camp-footer>
      <el-button type="success" @click="createProvider">提交审核</el-button>
    </camp-footer>
  </div>
</template>

<script setup>
import CampFooter from '../../../../component/camp-footer.vue'
import campUpload from '../../../../component/camp-upload.vue'
import { ref, onMounted } from 'vue'
import { request } from '../../../../api'
import { useStore } from '../../../../store'
const store = useStore()
const form = ref({
  id: 58,
  identifier: 'QfCP2T22s2Ty1sW22TzBl0',
  user_id: 307,
  is_active: false,
  date_created: '2022-12-07T13:22:06Z',
  name: '测试公司',
  describe: 'xxxxx',
  exclusive: true,
  honor: [],
  avatar_square: '',
  portrait: '',
  shows: [],
  mobile: '1533841231',
  email: 'pengber@123.com',
  wechat: 'we123',
  abbr: 'dafdaf',
  evidences: [
    {
      url: '/media/%E5%8A%9E%E5%AD%A6%E8%AE%B8%E5%8F%AF%E8%AF%81%20(1).jpg',
      name: '办学许可证 (1)'
    },
    {
      url: '/media/%E6%95%99%E5%B8%88%E8%B5%84%E6%A0%BC%E8%AF%81%20(1).jpg',
      name: '教师资格证 (1)'
    },
    {
      url: '/media/%E5%9B%BD%E9%99%85%E6%95%99%E5%B8%88%E8%B5%84%E6%A0%BC%E8%AF%81%20(1).jpg',
      name: '国际教师资格证 (1)'
    }
  ],
  categories: []
})
const createProvider = () => {
  request.post('/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/provider/create', {
    user_id: store.providerId,
    ...form
  })
}
onMounted(() => {
  request
    .post('/api/e9b849a515a84327b424af7ccdbf2949/v1_0_0/provider/get', {
      user_id: store.user.id
    })
    .then(r => {
      if (r.data.Code == '200') {
        form.value = r.data.details
      }
      console.log('📕',r.data)
    })
})
</script>

<style lang="scss" scoped>
.title {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  margin-bottom: 16px;
  margin-top: 16px;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
}

.block {
  width: 80%;
  margin-left: 24px;
  margin-bottom: 16px;
  min-width: 1000px;

  .bBody {
    margin-left: 30px;

    > * {
      margin-top: 30px;
    }
  }

  .settingMoudle {
    font-size: 14px;
  }

  .itemLabelTit {
    text-indent: 2em;
    display: inline-block;
  }

  .formItem {
    display: flex;
  }

  .grayLabel {
    font-family: 'PingFang SC';
    font-style: normal;
    margin: 10px;
    font-size: 12px;
    color: #8a8a8a;
    float: left;
    line-height: 20px;
    white-space: nowrap;
  }
}
.timeCheckbox {
  :deep(.el-checkbox__inner) {
    border-radius: 50% !important;
    overflow: hidden;
  }
}
</style>
