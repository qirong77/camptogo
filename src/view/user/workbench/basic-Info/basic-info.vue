<template>
  <div class="basic-info">
    <div class="title">基本信息</div>
    <div>
      <el-form>
        <el-card class="block">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div style="font-weight: bold; margin-right: 20px">账户信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="注册手机：">
              <el-input
                disabled
                v-model="store.user.provider.mobile"></el-input>
            </el-form-item>
            <el-form-item label="绑定邮箱：">
              <span>{{ store.user.provider.email || '无' }}</span>
              <span class="grayLabel">
                *该邮箱为系统默认邮箱之后用于收平台通知，请及时查看邮件
              </span>
            </el-form-item>
            <el-form-item label="认证状态：">
              <span v-if="store.user.provider.date_created">已认证 </span>
              <span v-else>未认证</span>
              <span class="grayLabel">如需更改认证信息，请联系客服</span>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div style="font-weight: bold; margin-right: 20px">认证详情</div>
          </div>
          <div class="bBody">
            <el-form-item label="认证类型：">
              <el-cascader
                placeholder="请选择认证类型"
                v-model="info.applicant_type"
                :options="identifyTypes">
              </el-cascader>
              <el-select
                placeholder="请选择认证证件类型"
                v-model="info.identify_type">
                <template v-if="info.applicant_type == '3-0'">
                  <el-option label="居民身份证" value="1"></el-option>
                  <el-option label="护照" value="2"></el-option>
                </template>
                <el-option v-else label="营业执照" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营业执照：">
              <CampUpload :images="info.business_license" />
            </el-form-item>
            <el-form-item label="认证名称：">
              <el-input
                v-model="info.applicant_name"
                placeholder="与认证证件上的名称保持一致"
                style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="认证号码：">
              <el-input
                v-model="info.identify_number"
                placeholder="与认证证件上的号码保持一致"
                style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="成立日期：">
              <el-date-picker
                value-format="YYYY-MM-DDTHH:mm"
                v-model="info.date_started"
                type="date"
                placeholder="年/月/日" />
            </el-form-item>
            <el-form-item label="经营住所：">
              <CampPlace
                v-model="info.provider_registration_area"
                :initial-place="info.provider_registration_area" />
            </el-form-item>
            <el-form-item label="法定代表人：">
              <el-input
                placeholder="姓名"
                v-model="info.representative_name"></el-input>
              <el-input
                placeholder="请输入电话号码"
                v-model="info.representative_phone"></el-input>
              <el-input
                placeholder="请输入身份证号"
                v-model="info.representative_realid"></el-input>
            </el-form-item>
            <el-form-item label="身份证件：">
              <div style="display: block; width: 90%">
                <span
                  class="grayLabel"
                  style="margin-left: 0; display: block; width: 100%">
                  <div style="white-space: normal">
                    1.若您属于法人或非法人组织，请上传法定代表人或主要负责人（如个人独资企业投资者、合伙企业执行事务合伙人等）的有效身份证复印件，身份证正、反面复印在同一张A4纸上，加盖公章，法定代表人或主要负责人亲笔签名（支持jpg/png格式，小于2M）。
                  </div>
                  <div style="white-space: normal">
                    2.若您属于个人或个体工商户，请上传您的有效身份证复印件，正、反面复印在同一张A4纸上，亲笔签名并捺指印（支持jpg/png格式，小于2M）。
                  </div>
                </span>
                <div></div>
              </div>
              <CampUpload :images="info.identify_license" />
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div style="font-weight: bold; margin-right: 20px">财税信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="开户银行：">
              <el-input
                style="width: 300px"
                v-model="info.tax_payer_bank_name"
                placeholder="需填写至支行网点全称"></el-input>
            </el-form-item>
            <el-form-item label="银行账号：">
              <el-input
                v-model="info.tax_payer_bank_account"
                placeholder="输入账号请勿空格"></el-input>
            </el-form-item>
            <el-form-item label="通讯地址：">
              <CampPlace
                v-model:place="info.tax_payer_address"
                :initial-place="info.tax_payer_address" />
              <el-input
                v-model="info.registration_detail_location"
                style="width: 300px"
                placeholder="请输入详细地址"></el-input>
            </el-form-item>
            <el-form-item label="电话号码：">
              <el-input
                style="width: 300px"
                v-model="info.tax_payer_mobile"
                placeholder="区号和单位电话连续填写"></el-input>
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div style="font-weight: bold; margin-right: 20px">认证申请</div>
          </div>
          <div class="bBody">
            <el-form-item label="认证申请函：">
              <span
                class="grayLabel"
                style="margin-left: 0; display: block; width: 100%">
                <div style="white-space: normal">
                  1.若您属于个人或个体工商户，请下载个人、个体工商户《申请认证公函》模板，填写、打印并签字、捺指印后上传彩色图片（支持jpg/png格式，小于2M）。
                </div>
                <div style="white-space: normal">
                  2.若您属于法人或非法人组织，请下载法人、非法人组织《申请认证公函》模板，填写、打印并签章后上传彩色图片（支持jpg/png格式，小于2M）。
                </div>
              </span>
              <CampUpload :images="info.applicant_letter" />
            </el-form-item>
          </div>
        </el-card>
        <el-card class="block">
          <div class="settingMoudle" style="display: flex; align-items: center">
            <div style="font-weight: bold; margin-right: 20px">业务信息</div>
          </div>
          <div class="bBody">
            <el-form-item label="官网地址：">
              <el-input
                style="width: 300px"
                v-model="info.brand_website"
                placeholder="请输入官网首页网址(若没有请填写“无”)"></el-input>
            </el-form-item>
            <el-form-item label="业务介绍：">
              <el-input
                v-model="info.introduction"
                type="textarea"
                placeholder="限200字,公司介绍内容应包括:主营业务的品类、特色、主要经营的地区、服务的受众群体年龄、荣誉奖项等" />
            </el-form-item>
            <el-form-item label="人员规模：">
              <el-select
                v-model="info.employee_number"
                placeholder="请输入人员规模">
                <el-option
                  v-for="p in peopleSize"
                  :value="p"
                  :label="p"
                  :key="p" />
              </el-select>
            </el-form-item>
          </div>
        </el-card>
      </el-form>
    </div>
    <campFooter>
      <el-button type="success" :disabled="!isUser">提交审核</el-button>
    </campFooter>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { regionData } from 'element-china-area-data'
import { useStore } from '../../../../store'
import { identifyTypes, peopleSize } from './common/options'
import { request } from '../../../../api'
import { userApi } from '../../../../api/modules/user/user.js'
import CampUpload from '../../../../component/camp-upload.vue'
import campFooter from '../../../../component/camp-footer.vue'
import CampPlace from '../../../../component/camp-place.vue'

const store = useStore()

let info = reactive({
  provider: 51,
  date_created: '2022-08-30T15:42:07Z',
  representative_name: '',
  representative_phone: '',
  representative_realid: '',
  applicant_type: 1,
  identify_type: 1,
  identify_number: '91110106335526776T',
  applicant_name: '北京天籁知音国际咨询有限公司',
  provider_registration_area: '中国_北京_通州_',
  registration_detail_location: '北京市通州区砖厂北里142号楼7层5718',
  legal_representative: '罗蕴佳',
  business_duration_start: '2015-03-31T00:00:00.000Z',
  business_duration_end: '2055-03-30T00:00:00.000Z',
  tax_payer_bank_name: '中国银行股份有限公司北京劲松东口支行',
  tax_payer_bank_no: '104100006046',
  tax_payer_bank_account: '319464000450',
  tax_payer_address: '北京市东城区东花市大街花市枣苑11号楼811室',
  tax_payer_mobile: '18811060049',
  authorizer_name: '王晶',
  authorizer_title: '校长',
  authorizer_realid: '130102197803190637',
  brand_name: '天籁知艺',
  brand_website: 'www.bj-tlzy.com',
  introduction: 'yyy',
  employee_number: 50,
  business_license: null,
  date_started: null,
  identify_license: null,
  admin_license: null,
  applicant_letter: null
})

const submit = () => {
  request.post(userApi.basicInfoSubmit, {
    provider_id: store.user.provider?.id || 0,
    ...info
  })
}
const isUser = ref(true)
onMounted(() => {
  request
    .post(userApi.getBasiInfo, {
      provider_id: store.providerId || 55
    })
    .then(res => {
      console.log('用户基础信息的数据\n', res.data)
      if (res.data.Code == 200) {
        isUser.value = false
        info = reactive(res.data.details)
      }
    })
})
</script>

<style lang="scss">
.basic-info {
  .el-input {
    width: auto;
    margin-right: 10px;
  }
}
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

  .grayLabel {
    font-family: 'PingFang SC';
    font-style: normal;
    margin-left: 10px;
    font-size: 12px;
    color: #8a8a8a;
    float: left;
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
