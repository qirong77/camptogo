<template>
  <div class="basic-info">
    <div class="title">基本信息</div>
    <div>
      <el-form>
        <el-card shadow="always" class="block">
            <div class="title">账户信息</div>
            <div class="main-message">
              <div class="bind_account">
                <div style="margin-right: 50px">绑定账户：</div>
                <div class="bind_account_message">
                  <div class="conent">
                    <span style="margin-right: 42px">绑定手机：</span
                    ><span style="margin-right: 15px">{{ phone }}</span>
                    <el-icon><View @click="replace" /></el-icon>
                    <span class="alarm"
                      >*该手机为系统默认手机号之后用于收平台通知，请注意查看短信</span
                    >
                  </div>
                  <div class="conent">
                    <span style="margin-right: 70px">姓名：</span> <span>{{ Name }}</span>
                  </div>
                  <div class="conentf">
                    <span
                      >身份证号：<span style="margin-left: 42px">{{ idCard }}</span></span
                    >
                  </div>
                </div>
              </div>
              <div class="bind_email">
                <span style="margin-right: 50px; font-weight: 600">绑定邮箱：</span>

                <span style="color: #999">2318988902@camptogoLogo.com</span>
                <span class="alarm"
                  >*该邮箱为系统默认邮箱之后用于收平台通知，请及时查看邮件</span
                >
              </div>
              <div class="certified_statu">
                <span style="margin-right: 50px; font-weight: 600">认证状态：</span>
                <el-icon><SuccessFilled color="#93D900" /></el-icon>
                <span style="margin-left: 10px; color: #999">已认证</span>
                <span style="color: #999">（2022/5/22）</span>
                <span class="alarm"> *如需要更改认证信息，请联系客服</span>
              </div>
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
                <el-option
                  label="居民身份证"
                  :value="1"
                  :disabled="!isPeson"></el-option>
                <el-option
                  label="护照"
                  :value="2"
                  :disabled="!isPeson"></el-option>
                <el-option
                  label="营业执照"
                  :value="3"
                  :disabled="isPeson"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营业执照：" v-show="!isPeson">
              <span style="color: gray">
                请上传加盖公章的彩色扫描件，确保内容清晰完整，个体工商户须加捺指印（支持jpg/png格式，小于2M）。
              </span>
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
            <el-form-item label="成立日期：" v-show="isPeson">
              <el-date-picker
                value-format="YYYY-MM-DDTHH:mm"
                v-model="info.date_started"
                type="date"
                placeholder="年/月/日" />
            </el-form-item>
            <el-form-item label="经营住所：" v-show="isPeson">
              <CampPlace
                v-model="info.provider_registration_area"
                :initial-place="info.provider_registration_area" />
            </el-form-item>
            <el-form-item label="法定代表人：" v-show="isPeson">
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
            <el-form-item label="行政许可证明">
              <div style="color: gray">
                若您的经营范围属于根据法律规定需要办理行政许可的特殊行业，须提交相应经营许可证明。如有其他行政许可证明，请提供清晰完整的彩色图片，支持jpg/png格式，小于2M。
              </div>
              <CampUpload images="xx" />
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
      <el-button type="success" :disabled="!isUser" @click="submit"
        >提交审核</el-button
      >
    </campFooter>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { useStore } from '../../../../store'
import { identifyTypes, peopleSize } from './common/options'
import { request } from '../../../../api'
import { userApi } from '../../../../api/modules/user/user.js'
import CampUpload from '../../../../component/camp-upload.vue'
import campFooter from '../../../../component/camp-footer.vue'
import CampPlace from '../../../../component/camp-place.vue'


const phone = ref(158800003555);
const Name = ref("黄嗷嗷");
const idCard = ref(380481244212070584);
const replace = () => { };
const store = useStore()
const isPeson = computed(() => info.value.applicant_type == 4)
let info = ref({
  provider: 51,
  date_created: '2022-08-30T15:42:07Z',
  representative_name: '',
  representative_phone: '',
  representative_realid: '',
  applicant_type: 1,
  identify_type: '',
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
    provider_id: store.user.provider.id || 0,
    ...info
  })
}
watch(
  () => info.value.applicant_type,
  () => {
    info.value.identify_type = ''
  }
)
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
        info.value = res.data.details
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
.alarm {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}
.title {
  font-size: 18px;
  margin-top: 0px;
  color: #242424;
  font-weight: 800;
  margin-bottom: 25px;
}
.main-message {
  margin-left: 34px;
  columns: #2c2c2c;
  font-size: 15px;
  font-weight: 600;
  .bind_account {
    margin-bottom: 40px;
    margin-top: 20px;
    display: flex;
    margin-right: 20px;
    .bind_account_message {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      .conent {
        margin-bottom: 30px;
      }
      .conentf {
        margin-bottom: 0px;
      }
    }
  }
  .bind_email {
    margin-bottom: 40px;
    font-weight: 400;
  }
  .certified_statu {
    margin-bottom: 10px;
    font-weight: 400;
  }
}
</style>
