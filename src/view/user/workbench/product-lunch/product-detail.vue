<template>
  <div class="product-detail">
    <main>
      <product-form title="商品基本信息">
        <template #form>
          <el-form-item label="商品名称：">
            <el-input
              style="width: 582px"
              v-model="form.full_name"
              placeholder="请输入商品名称,作为商品标题显示" />
            <el-tooltip
              content="作为商品标题显示，请填写商品特色和优势的关键词，无需出现“招生年龄，时间地点，活动天数”等重复信息"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="商品类别：">
            <el-select
              multiple
              placeholder="点击选择"
              style="width: 400px"
              v-model="form.categories">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="最低成团人数：">
            <el-radio-group v-model="radio1">
              <el-radio :label="true"
                >设置低于
                <el-input-number
                  :disabled="!radio1"
                  v-model="form.group_limit_size"
                  controls-position="right" />
                人不成团
                <span class="desc"
                  >*不成团将全额退款，互不承担责任</span
                ></el-radio
              >
              <el-radio :label="false" v-model="form.group_limit_if"
                >商品不设最低成团数
                <span class="desc">*有任1订单操作审核通过即成团</span></el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动时间：">
            <el-date-picker
              v-model="form.activity_start_time"
              value-format="YYYY-MM-DD-HH:mm"
              type="datetime"
              placeholder="开始日期" />
            <span> - </span>
            <el-date-picker
              type="datetime"
              value-format="YYYY-MM-DD-HH:mm"
              v-model="form.activity_end_time"
              placeholder="结束日期" />
          </el-form-item>

          <el-form-item
            label="划线价格：
          ">
            <el-input-number
              style="width: 100px"
              v-model="form.price_original"
              controls-position="right" />
            <span class="desc">*原价（单位：元）</span>
          </el-form-item>
          <el-form-item
            label="未划线价格：
          ">
            <el-input-number
              style="width: 100px"
              v-model="form.price_selling"
              controls-position="right" />
            <span class="desc">*原价（单位：元）</span>
          </el-form-item>

          <el-form-item label="退改方案：">
            <el-cascader
              style="width: 250px"
              placeholder="请选择退改方案"
              v-model="form.refundpolicy_id"
              :options="backOptions" />
            <el-tooltip
              content="【无理由退】在一定时间范围内，您可申请无理由退订，服务商将无条件退返除已支付合理费用外的剩余费用
【不可退】商品和服务在初次发布时就标记了不可退订的标识，或该商品和服务进入了早先公布的不可退订状态。
您所选择的退改方案详情请见《营探预订和退费须知》"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span style="line-height: 16px"
                >活动特色：<br />
                <span class="desc">选填</span>
              </span>
            </template>
            <el-select
              multiple
              placeholder="请选择2-7项活动特色"
              v-model="form.product_general_features"
              style="width: 600px">
              <el-option
                v-for="item in features"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #label>
              <span style="line-height: 16px"
                >优势认证：<br />
                <span class="desc">选填</span>
              </span>
            </template>
            <div>
              <div>请选择认证类型</div>
              <el-select
                v-model="form.product_certified_features[0].feature_id">
                <el-option
                  v-for="f in certifiedFeatures"
                  :value="f.value"
                  :label="f.label" />
              </el-select>
              <div>
                请上传主理人团队获得的国际奖项证书<span class="desc">
                  上传文件要清晰，四角齐全，需彩扫描件、凭证等
                </span>
              </div>
              <campUpload
                :images="form.product_certified_features[0].certificate" />
            </div>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="课程详情">
        <template #form>
          <el-form-item label="活动人数：">
            <el-input-number
              v-model="form.size_valid"
              controls-position="right"
              placeholder="整数" />&nbsp;人
            <span class="desc">*活动人数为参与活动总人数，非库存数</span>
          </el-form-item>
          <el-form-item label="报名年龄：">
            <el-input-number
              v-model="form.age_min"
              controls-position="right"
              placeholder="整数" />&nbsp;岁至&nbsp;
            <el-input-number
              v-model="form.age_max"
              controls-position="right"
              placeholder="整数" />
            <el-tooltip
              content="请确认您所投保保险的年龄承保范围，不符合要求的，保险公司可能不予承保。"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="日程形式：">
            <el-select placeholder="请选择住宿形式" v-model="form.stay_if">
              <el-option label="需要住宿" :value="true"></el-option>
              <el-option label="不需要住宿" :value="false"></el-option>
            </el-select>
            &nbsp;&nbsp;
            <el-select
              placeholder="请选择参与形式"
              v-model="form.activity_mode">
              <el-option
                v-for="item in ['独立', '亲子', '亲子单飞']"
                :value="item"
                key="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="难易度：">
            <el-rate
              :texts="['1星', '2星', '3星', '4星', '5星']"
              show-text
              v-model="form.difficulty" />
            <el-tooltip
              content="1星无门槛，2星为入门级，3星为需要一定经验，4星为有一定专业背景，5星为需达到考核标准"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="活动类型：">
            <el-select
              placeholder="请选择活动形式"
              v-model="form.activity_type">
              <el-option
                v-for="item in activityTypes"
                :value="item.value"
                :key="item.label"
                :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="师生比：">
            <el-input-number
              placeholder="整数"
              controls-position="right"
              style="margin-right: 10px"
              v-model="form.teacher_student[0]" />
            <el-input-number
              placeholder="整数"
              controls-position="right"
              v-model="form.teacher_student[1]" />
            <span class="desc"> 活动团队职员总数:活动人数 </span>
          </el-form-item>
          <el-form-item label="支持语言：">
            <el-select
              style="width: 80%"
              multiple
              v-model="form.languages"
              placeholder="点击选择，可多选">
              <el-option
                v-for="item in languages"
                :key="item.label"
                :label="item.label"
                :value="item.value.name" />
            </el-select>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="活动日程表 ">
        <template #form>
          <div class="desc" style="margin-top: 20px">
            *请在出行地点有所变更的当日，在日程安排最前端以【城市/活动地点】的形式标明，如没有【城市/活动地点】变更可不标明，仅填写具体日程即可。
          </div>
          <el-form-item label="日程表">
            <div
              class="scheduls"
              style="flex-direction: column"
              v-for="(item, index) in form.daily_schedule">
              <div style="display: flex">
                <campDataPicker
                  v-model="item.date"
                  style="margin-right: 20px" />
                <el-button
                  type="success"
                  @click="addDate"
                  v-if="index === form.daily_schedule.length - 1"
                  >添加日期</el-button
                >
                <el-button @click="() => deleteDate(item)">删除日期</el-button>
              </div>
              <div class="schdule" v-for="daily in item.content">
                <div class="schdule-box">
                  <el-time-picker
                    style="width: 20%"
                    value-format="YYYY-MM-DDTHH:mm"
                    v-model="daily.start_time" />
                  <span>-</span>
                  <el-time-picker
                    value-format="YYYY-MM-DDTHH:mm"
                    style="width: 20%"
                    v-model="daily.end_time" />
                  <el-input
                    placeholder="请填写日程安排"
                    style="width: 50%"
                    v-model="daily.detail" />
                  <el-icon
                    @click="
                      () =>
                        (item.detail = item.detail.filter(
                          _daily => _daily !== daily
                        ))
                    "
                    ><Delete
                  /></el-icon>
                </div>
                <div
                  class="add"
                  @click="() => addDaily(item.content)"
                  style="margin-top: 10px; cursor: pointer">
                  添加一行
                </div>
              </div>
            </div>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="保险信息">
        <template #form>
          <el-form-item label="组织者责任险：">
            <el-cascader
              style="width: 80%"
              v-model="form.liability_insurance_self_details"
              :options="insurenceOptions"
              placeholder="请选择保险信息" />
            <el-tooltip
              content="您选择“购买第三方保险”并提交商品审核的行为，即视为您授权营探将您所录入的商品信息提交至上述保险公司，上述信息将作为核保及日后理赔的依据"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="人身意外险：">
            <el-cascader
              style="width: 80%"
              v-model="form.accident_insurance_self_details"
              :options="insurenceOptions"
              clearable
              placeholder="请选择保险信息" />
            <el-tooltip
              content="您选择“购买第三方保险”并提交商品审核的行为，即视为您授权营探将您所录入的商品信息提交至上述保险公司，上述信息将作为核保及日后理赔的依据"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="最终核保结果：">
            <div>
              <span class="desc">
                *核保公司核保完成后,核保结果会自动在此呈现
              </span>
              <el-tooltip
                content="若有更多被保险人如拼团商品中非通过营探报名的出行人、主办方员工等需一并投保的，请在T-2日（T为活动开始日期）17时前在商品管理-保险投保模块上传其他被保险人的姓名、证件号码、性别、出生年月，平台将在T-2日24时前一次性向保险公司发送被保险人信息。因您自身原因导致上述被保险人信息未能报送成功的，营探不承担责任。"
                placement="top-start">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
              <div class="tag">
                <el-tag class="mx-1" closable type="info"
                  >待保险公司核保</el-tag
                >
              </div>
            </div>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="商品详情">
        <template #form>
          <el-form-item label="宣传标语：">
            <el-input
              placeholder="请选择宣传标语"
              type="textarea"
              v-model="form.main_slogon"></el-input>
            <el-tooltip
              content="宣传标语是对商品优势卖点的归纳"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="主题描述："
            ><el-input
              v-model="form.theme"
              style="width: 300px"
              placeholder="请对“商品基本信息-商品详情”做出描述" />
            <el-tooltip
              content="主题指您在“商品基本信息-商品主题”中选择的单个或多个类别"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="主题详情：">
            <el-input
              type="textarea"
              v-model="form.theme_details"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="副宣传语："
            ><el-input
              v-model="form.sub_slogon"
              type="textarea"
              placeholder="请填写副宣传语" />
            <el-tooltip
              content="副宣传语是对商品优势卖点的补充"
              placement="top-start">
              <el-icon><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="我们的优势：">
            <div class="boxs">
              <div v-for="item in form.advantage">
                <div>卖点</div>
                <div>
                  <el-input v-model="item.title" placeholder="请对填写标题" />
                </div>
                <div>卖点1详情</div>
                <div>
                  <el-input
                    v-model="item.detail"
                    type="textarea"
                    placeholder="请对卖点进行描述" />
                </div>
              </div>
              <div class="add" @click="addAdvantage">添加卖点</div>
            </div>
          </el-form-item>
          <el-form-item label="收获详情：">
            <span class="desc"
              >*请逐条罗列收获详情，须注意将收获内容进行换行输入</span
            >
            <el-input
              v-model="form.gains"
              style="width: 80%"
              type="textarea"
              placeholder="请详细描述收货内容" />
          </el-form-item>
          <el-form-item label="教学提纲：">
            <div class="boxs">
              <div v-for="item in form.outline">
                <div>提纲章节</div>
                <div>
                  <el-input v-model="item.title" placeholder="请对填写标题" />
                </div>
                <div>提纲章节详情</div>
                <div>
                  <el-input
                    v-model="item.detail"
                    type="textarea"
                    placeholder="请对卖点进行描述" />
                </div>
              </div>
              <div class="add" @click="addOutline">添加提纲</div>
            </div>
          </el-form-item>
          <el-form-item label="硬件设施：">
            <div class="hardware">
              <header>活动场地</header>
              <el-input
                v-model="form.venue"
                type="textarea"
                placeholder="您可以从以下方面描述室内室外活动场地：
场地名称；场地类型，如运动场、实验室、专业草场等特色或专业场地；设施设备，如监控、新风系统、活动设施、专业设备等。" />
            </div>
            <div class="hardware">
              <header>住宿条件</header>
              <el-input
                type="textarea"
                v-model="form.accommodations"
                placeholder="您可以从以下方面描述住宿条件：
住宿场所类型，如酒店、民宿、营房、青旅等；
房间类型，如单人房、双人间、X人宿舍等；
房间条件，如床型、热水、卫浴、空调、网络、电器等；
安保情况，包括安保人员、夜间值班、巡逻情况等。" />
            </div>
            <div class="hardware">
              <header>教学教具</header>
              <el-input
                v-model="form.teaching_aids"
                type="textarea"
                placeholder="您可以从特色教具、定制服装、纪念品、奖章奖状、学员手册等方面进行描述。" />
            </div>
          </el-form-item>
          <el-form-item label="服务团队：">
            <div v-if="!form.team">
              本活动工作人员数量：
              <el-input-number
                controls-position="right"
                v-model="form.teams.team_nums" />
              <span class="desc"
                >*请您确保团队成员均有相应从业资质，符合相关法律法规的规定</span
              >
            </div>
            <div class="hardware" v-if="!form.team">
              <header>团队详情</header>
              <el-input
                v-if="!form.team"
                v-model="form.teams.detail"
                type="textarea"
                placeholder="您可以从以下方面进行描述：
团队配置，如课程老师、助教老师、生活老师、安全员、医护人员、摄影老师、领队、导游等；
人员详情，如资质、荣誉、教龄等。" />
              <el-input
                v-else
                v-model="form.team"
                type="textarea"
                placeholder="您可以从以下方面进行描述：
团队配置，如课程老师、助教老师、生活老师、安全员、医护人员、摄影老师、领队、导游等；
人员详情，如资质、荣誉、教龄等。" />
            </div>
            <div class="hardware">
              <header>专业拍摄</header>
              <span class="desc">
                *请选择是否有专职拍摄人员，拍摄人员数量，拍摄设备型号；无内容，可留空 </span
              ><br />
              <el-select
                placeholder="请选择是否有专职拍摄人员"
                v-model="form.record.provide_if">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
              <div v-if="form.record.provide_if">
                <div>
                  有<el-input-number
                    style="margin: 20px 0"
                    controls-position="right"
                    v-model="form.record.team_size" />个拍摄人员
                </div>
                <el-input
                  type="textarea"
                  placeholder="请从以下方面描述拍摄服务详情：
预计产出照片张数；预计产出视频个数，单个视频长度；
使用设备型号；机位个数及位置；其他。"
                  v-model="form.record.device" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="餐饮标准：">
            <el-select
              placeholder="请选择餐饮提供方式"
              v-model="form.food.type">
              <el-option
                v-for="item of foodOptions"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="医疗情况：">
            <el-input
              v-model="form.medical_care"
              type="textarea"
              placeholder="您可以从以下方面描述医疗情况：
医疗人员情况，如专业医疗人员、员工医疗培训情况等；
医疗场所情况，如是否有卫生室等；
医疗物资状况，如急救箱、药品、医疗设备等；
附近医疗点情况，如附近医院的距离、等级等。" />
          </el-form-item>

          <el-form-item label="图片视频上传">
            <span class="desc">
              *您应确保所上传图片视频素材不涉及侵权，所有图片视频为原创或已获得版权方的授权进行使用，涉及人脸露出的商业应用应确保已获得肖像权授权等
            </span>
            <div>
              <div>
                短视频
                <span class="desc">
                  *请上传一段不超过2分钟，大小10M以内的短视频，内容为行前说明或活动风采展示
                </span>
              </div>
              <el-upload
                name="image"
                :headers="authHeader"
                :on-success="
                  (response, file) => onUploadSuccess(file, 'video_short')
                "
                :action="userApi.video"
                auto-upload
                class="avatar-uploader"
                :multiple="false"
                :show-file-list="false">
                <video
                  v-if="form.video_short"
                  style="width: 360px; height: 200px"
                  :src="form.video_short"
                  controls></video>
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
            <div>
              <span> 商品头版图（横版） </span>
              <span class="desc">
                *请上传2-5张高质量活动图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M，可拖动图片排序
              </span>
              <el-upload
                name="image"
                :headers="authHeader"
                :action="userApi.video"
                v-model:file-list="form.horizontal_shows"
                list-type="picture-card"
                auto-upload>
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
            <div>
              <span>竖版风采图（竖版）</span>
              <span class="desc">
                *请上传2-5张高质量活动图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M，可拖动图片排序
              </span>
              <el-upload
                name="image"
                :headers="authHeader"
                :action="userApi.video"
                v-model:file-list="form.vertical_shows"
                list-type="picture-card"
                auto-upload>
                <el-icon><Plus /></el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
            <div>
              <span>服务与设施图（横版）</span>
              <span class="desc">
                *选题项，请上传2-5张高质量服务与设施图，横版图片，比例为3:2，支持jpg/png格式，单张图片小于2M，可拖动图片排序
              </span>
              <el-upload
                name="image"
                :headers="authHeader"
                :action="userApi.video"
                v-model:file-list="form.facility_shows"
                list-type="picture-card"
                auto-upload>
                <el-icon><Plus /></el-icon>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="开营须知">
        <template #form>
          <el-form-item label="活动入群：">
            <el-input
              disabled
              style="width: 320px"
              placeholder="成团后将有专人邀您入群，请尽快完善报名表" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <span style="line-height: 16px"
                >行前说明会：<br />
                <span class="desc">选填</span>
              </span>
            </template>
            <div style="display: flex; margin-bottom: 20px">
              <campDataPicker
                style="width: 180px"
                v-model="form.briefing.daily" />

              <el-time-picker
                v-model="form.briefing.start_time"
                placeholder="开始时间"
                value-format="YYYY-MM-DDTHH:mm"
                style="margin: 0 10px; width: 150px" />
              <el-time-picker
                placeholder="结束时间"
                style="width: 150px; margin: 0 10px"
                value-format="YYYY-MM-DDTHH:mm"
                v-model="form.briefing.end_time" />
              <el-input
                placeholder="请输入参与方式"
                v-model="form.briefing.type"
                style="width: auto" />
            </div>
            <div class="content">
              <div>请填写说明会内容</div>
              <el-input
                type="textarea"
                v-model="form.briefing.detail"
                placeholder="如：1、在线破冰活动
      2、在线安全培训
      3、答疑，请出行人及监护人积极参加" />
            </div>
          </el-form-item>
          <el-form-item label="重要说明：">
            <el-input
              v-model="form.must_know"
              type="textarea"
              placeholder="如：1.未成年人参加独立活动的，在开营当天需由监护人陪同办理相关手续。 
2.监护人需携带本人及未成年人身份证原件办理相关手续。
3.高风险活动注意事项（组织高风险活动时，必须明示的风险事项，及对应的防范措施）：
示例，本商品包含滑雪这一高风险项目，参与滑雪活动时，出行人应当严格遵守滑雪场的有关安全管理的规定，听从教练和工作人员指挥。" />
          </el-form-item>
          <el-form-item label="活动时间地点">
            <div class="grid">
              <span>活动集合时间</span>
              <span></span>
              <span>活动集合地点</span>
              <span>详细地址</span>
              <campDataPicker
                style="width: 160px"
                v-model="form.activity_time_location.start_date" />
              <el-time-picker
                value-format="YYYY-MM-DDTHH:mm"
                v-model="form.activity_time_location.start_time"
                style="width: 160px"
                placeholder="开始时间" />
              <el-cascader
                placeholder="请选择集合地点"
                v-model="form.activity_time_location.start_location"
                :options="areaOptions" />
              <el-input
                placeholder="请输入详细地址"
                v-model="form.activity_time_location.start_location_detailed" />
            </div>
            <div class="grid">
              <span>活动结束时间</span>
              <span></span>
              <span>活动结束地点</span>
              <span>详细地址</span>
              <campDataPicker
                style="width: 160px"
                v-model="form.activity_time_location.end_date" />
              <el-time-picker
                value-format="YYYY-MM-DDTHH:mm"
                v-model="form.activity_time_location.end_time"
                style="width: 160px"
                placeholder="开始时间" />
              <el-cascader
                placeholder="请选择集合地点"
                v-model="form.activity_time_location.end_location"
                :options="areaOptions" />
              <el-input
                placeholder="请输入详细地址"
                v-model="form.activity_time_location.end_location_detailed" />
            </div>
          </el-form-item>
          <el-form-item label="报道着装要求">
            <el-select
              placeholder="请选择是否有着装要求"
              v-model="form.clothing.unified">
              <el-option :value="true" label="有着装要求"> </el-option>
              <el-option :value="false" label="无着装要求"> </el-option>
            </el-select>
            <el-input
              v-if="form.clothing.unified"
              v-model="form.clothing.detail" />
          </el-form-item>
          <el-form-item label="整理物资准备">
            <el-input
              v-model="form.preparation"
              type="textarea"
              placeholder="1.家长可以提前准备一封关怀、鼓励孩子的信。
2.有特长的同学携带设备参加活动,须提前沟通。">
            </el-input>
          </el-form-item>
          <el-form-item label="团队紧急联系人方式">
            <span class="desc">*请填写主理人团队紧急联系方式</span>
            <div style="width: 100%"></div>
            <el-input
              placeholder="姓名"
              v-model="form.emergency_contacts[0].name"></el-input>
            <el-input
              placeholder="团队职务"
              style="margin: 10px"
              v-model="form.emergency_contacts[0].title"></el-input>
            <el-input
              placeholder="请输入电话号码"
              v-model="form.emergency_contacts[0].phone"></el-input>
            <el-input
              style="width: 300px"
              placeholder="有时间要求或者其他限制，请补充在此"
              v-model="form.emergency_contacts[0].detail"></el-input>
          </el-form-item>
        </template>
      </product-form>
      <product-form title="购买须知">
        <template #form>
          <el-form-item label="价格说明">
            <div style="display: flex; flex-direction: column">
              <div>
                <div>本商品为含税价，包含</div>
                <el-input
                  v-model="form.price_include"
                  type="textarea"
                  placeholder="包括出行人在活动期间的食宿费用、活动项目体验费、课程师资费、场地费、教具物资费等" />
              </div>
              <div>
                <div>本价格未包含的费用，包括但不限于</div>
                <el-input
                  v-model="form.price_exclude"
                  type="textarea"
                  placeholder="未包含费用中应当包括：1.其他个人消费（必须填写）；2.收费提供的服务项目，须说明服务内容及其价格；3.活动过程中其他可选择的自费项目及其价格，如：洗漱用具、各地和集散地之间往返的交通费、门票费用、SPA馆体验费、干洗费、住宿升级费用等。" />
              </div>

              <div>
                <div>产品包含的保险情况说明</div>
                <el-input
                  v-model="form.price_insurance_detail"
                  type="textarea"
                  placeholder="应当填写人身意外伤害险的投保情况，组织者责任险情况无须填写。填写样例如下：已为您投保由天安财险承保的人身意外保险保额10万元/人，保障范围为个人意外10万元，其中5万元高风险运动保障，另外救援服务2万元，个人财产遗失1万元，公共交通 (不含自驾)2万元，意外伤害10万元，具体保障范围可根据保险名称查询保险保单条款。" />
              </div>
              <div>
                <div>特殊条件退订机制</div>
                <el-input
                  disabled
                  type="textarea"
                  placeholder="超出无损退订期后，因下述几项特定情形导致无法按时履约的，用户可在商品和服务活动开始日期前联系营探客服，提交“特殊原因退订”申请；符合特殊原因退订要求的，营探将按照下述约定向用户提供退款服务，不再适用“有条件退”的具体方案，详情请见《预定退费须知》" />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="特别提醒">
            <el-input
              disabled
              type="textarea"
              placeholder="1.出行人可能不适合参的活动情形:
例:活动中包含碰碰车项目，10岁以下的儿童不宜参与 (如仍选择报名参加但只参与部分活动，原则上非门票类费用不予退款)
2.活动日程将根据交通、政策、天气等原因调整顺序,如因顺序调整导致部分日程无法履行的,我们将及时与您联系.
3.活动提纲、师生比、团队人员配置，可能会根据实际情况进行小幅调整
4.若出行人出现单数的情况,我们会根据报名时间安排最后报名的出行人与同性别工作人员同住
5.本次出行的照片可能会发布在自媒体平台上，如果您认为此举可能会给您造成心理上的不愉悦，请提前告知主办方，否则视为默认许可。" />
          </el-form-item>
        </template>
      </product-form>
    </main>
    <camp-footer>
      <!-- 创建商品 -->
      <template v-if="isNewProdoct">
        <el-button type="success" @click="createProduct">提交审核</el-button>
        <el-button type="success" disabled>查看预览</el-button>
        <el-button type="success" @click="saveDraft">保存草稿</el-button>
      </template>
      <!-- 提交审核后 -->
      <template v-if="isCheck">
        <el-button type="success" disabled>复制商品</el-button>
        <el-button type="success" disabled>查看预览</el-button>
        <el-button type="success" disabled>提交审核</el-button>
      </template>
      <!-- 审核通过后 -->
      <template v-if="isChecked">
        <el-button type="success" @click="createProduct">提交修改</el-button>
        <el-button type="success" @click="upShalve">点击上架</el-button>
        <el-button type="success" disabled>查看预览</el-button>
        <el-button type="success" disabled="">复制商品</el-button>
      </template>
    </camp-footer>
  </div>
</template>
<script setup>
import ProductForm from './components/product-form.vue'
import { regionData } from 'element-china-area-data'
import { Plus } from '@element-plus/icons-vue'
import { request, authHeader } from '../../../../api/index.js'
import { userApi } from '../../../../api/modules/user/user.js'
import { ref, reactive, computed, onMounted } from 'vue'
import { useStore } from '../../../../store'
import campFooter from '../../../../component/camp-footer.vue'
import campDataPicker from '../../../../component/camp-data-picker.vue'
import campUpload from '../../../../component/camp-upload.vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const radio1 = ref(true)
const store = useStore()
const router = useRouter()
const areaOptions = ref(regionData)
const isLiabilitySelf = computed(
  () => form.liability_insurance_self_details === insurenceOptions[0].value
)
const isAccidentSelf = computed(
  () => form.accident_insurance_self_details === insurenceOptions[0].value
)
let form = reactive({
  full_name: '',
  categories: [],
  group_limit_size: 0,
  group_limit_if: radio1.value,
  activity_start_time: '',
  activity_end_time: '',
  price_original: 0,
  price_selling: 0,
  product_general_features: [],
  size_valid: 0,
  age_min: 0,
  age_max: 18,
  stay_if: false,
  activity_mode: '',
  difficulty: 0,
  activity_type: [],
  teacher_student: [0, 0],
  video_short: '',
  product_certified_features: [
    {
      feature_id: '',
      certificate: ''
    }
  ],
  languages: [],
  liability_insurance_self_if: isLiabilitySelf,
  liability_insurance_self_details: '',
  accident_insurance_self_if: isAccidentSelf,
  accident_insurance_self_details: '',
  main_slogon: '',
  sub_slogon: '',
  theme: '',
  theme_details: '',
  advantage: [
    {
      title: '',
      detail: ''
    }
  ],
  gains: '',
  refundpolicy_id: 0,
  outline: [
    {
      title: '',
      detail: ''
    }
  ],
  venue: '',
  record: {
    provide_if: false,
    team_size: 0,
    device: ''
  },
  food: {
    type: '',
    detail: ''
  },
  accommodations: '',
  teaching_aids: '',
  teams: {
    team_nums: 0,
    detail: ''
  },
  team: '111',
  medical_care: '',
  must_know: '',
  daily_schedule: [
    {
      date: '2021-08-26T00:00:00Z',
      content: [
        {
          start_time: '2022-04-03T09:30:00Z',
          end_time: '2022-04-03T09:30:00Z',
          detail: 'xx'
        }
      ]
    }
  ],
  activity_time_location: {
    start_location: '',
    end_location: '',
    start_time: '',
    start_date: '',
    end_date: '',
    start_location_detailed: '',
    end_location_detailed: ''
  },
  preparation: '',
  emergency_contacts: [
    {
      name: '',
      title: '',
      phone: '',
      detail: ''
    }
  ],
  clothing: {
    detail: '',
    unified_if: false
  },
  horizontal_shows: [],
  vertical_shows: [],
  facility_shows: [],
  briefing: {
    start_time: '',
    end_time: '',
    type: '',
    detail: ''
  },
  preparation: '',
  price_include: '',
  price_exclude: '',
  price_insurance_detail: '',
  product_general_features: ''
})

const onUploadSuccess = (file, key) => {
  form[key] = URL.createObjectURL(file.raw)
}

const upShalve = () => {
  request
    .post(userApi.product, {
      user: {
        id: store.user?.id
      },
      version: '1.0.0',
      create_reason: '商品上架',
      work_line_id: 1400,
      work_operation: 4600,
      content: {
        id: store.product?.id
      }
    })
    .then(r => {
      if (r.data.Code == '200') {
        ElMessage({
          type: 'success',
          message: r.data.msg || '提交成功'
        })
        router.push('/workbench/productLunch')
      }
    })
}
const createProduct = () => {
  request
    .post(userApi.product, {
      content: form,
      create_reason: '创建商品',
      user: { id: store.user.id},
      version: '1.0.0',
      work_line_id: 1400,
      work_operation: 4200
    })
    .then(r => {
      if (r.data.Code == '200') {
        ElMessage({
          type: 'success',
          message: r.data.msg || '提交成功'
        })
        router.push('/workbench/productLunch')
      }
    })
}
const saveDraft = () => {
  request
    .post(userApi.product, {
      content: form,
      create_reason: '保存草稿',
      user: { id: store.user.id},
      version: '1.0.0',
      work_line_id: 1400,
      work_operation: 4300
    })
    .then(r => {
      if (r.data.Code == '200') {
        ElMessage({
          type: 'success',
          message: r.data.msg || '提交成功'
        })
        router.push('/workbench/productLunch')
      }
    })
}

// 新创建的
const isNewProdoct = ref(false)
// 提交审核后
const isCheck = computed(() => '5200 5310'.includes(store.product.status))
// 审核通过后
const isChecked = computed(() => '5900 5300'.includes(store.product.status))

const addAdvantage = () => {
  form.advantage.push({
    title: '',
    detail: ''
  })
}
const addOutline = () => {
  form.outline.push({
    title: '',
    detail: ''
  })
}
const addDaily = arr => {
  arr.push({
    start_time: '',
    end_time: '',
    detail: ''
  })
}
const addDate = () => {
  form.daily_schedule.push({
    date: '',
    content: [
      {
        start_time: '',
        end_time: '',
        detail: ''
      }
    ]
  })
}
const deleteDate = item => {
  form.daily_schedule = form.daily_schedule.filter(
    schedule => schedule !== item
  )
}

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

onMounted(() => {
  if (!/new/.test(window.location.href)) {
    form = reactive(store.product)
    form.video_short = JSON.parse('"' + form?.video_short + '"')?.url || ''
    if (!form.product_certified_features?.length)
      form.product_certified_features = [
        {
          feature_id: '',
          certificate: ''
        }
      ]
  } else {
    store.setProduct({})
    isNewProdoct.value = true
  }
})
</script>
<script>
// 优势认证
const certifiedFeatures = [
  {
    label: '公益商品',
    value: '公益商品'
  },
  {
    label: '国际奖项',
    value: '国际奖项'
  },
  {
    label: '国家奖项',
    value: '国家奖项'
  },
  {
    label: '省市奖项高级职称',
    value: '省市奖项高级职称'
  },
  {
    label: '中级职称',
    value: '中级职称'
  },
  {
    label: '荣誉称号',
    value: '荣誉称号'
  },
  {
    label: '医护保障',
    value: '医护保障'
  },
  {
    label: '专家认证',
    value: '专家认证'
  },
  {
    label: '自营场地',
    value: '自营场地'
  },
  {
    label: '优质场地',
    value: '优质场地'
  },
  {
    label: '国际品牌',
    value: '国际品牌'
  },
  {
    label: '国有品牌',
    value: '国有品牌'
  },
  {
    label: '自研课程',
    value: '自研课程'
  }
]
// 退改方案
const backOptions = [
  {
    label: '无理由',
    value: 1
  },
  {
    label: '不可退',
    value: 2
  },
  {
    value: 3,
    label: '有条件退',
    children: [
      {
        label:
          '有条件退一：行程开始前4-6日取消合同，按订单费用总额的50%支付违约金；行程开始前1-3日取消合同，按订单费用总额的70%支付违约金；行程开始当天取消合同，按订单费用总额的100%支付违约金。',
        value: 3
      },
      {
        label:
          '有条件退二：行程开始前4-6日取消合同，按订单费用总额的20%支付违约金；行程开始前1-3日取消合同，按订单费用总额的40%支付违约金；行程开始当天取消合同，按订单费用总额的70%支付违约金。',
        value: 4
      },
      {
        label:
          '有条件退三：行程开始前10-15日取消合同，按订单费用总额的50%支付违约金；行程开始前4-9日取消合同，按订单费用总额的70%支付违约金；行程开始前0-3天取消合同，按订单费用总额的100%支付违约金。',
        value: 5
      },
      {
        label:
          '有条件退四：行程开始前10-15日取消合同，按订单费用总额的20%支付违约金；行程开始前4-9日取消合同，按订单费用总额的40%支付违约金；行程开始前0-3天取消合同，按订单费用总额的70%支付违约金。',
        value: 6
      }
    ]
  }
]
// 商品类别
const typeOptions = [
  {
    label: '体育',
    value: 1
  },
  {
    label: '机械',
    value: 2
  },
  {
    label: '手工',
    value: 3
  },
  {
    label: '医疗',
    value: 4
  },
  {
    label: '军事',
    value: 5
  },
  {
    label: '天文',
    value: 6
  },
  {
    label: '自然',
    value: 7
  },
  {
    label: '计算机',
    value: 8
  },
  {
    label: '商业',
    value: 9
  },
  {
    label: '其他',
    value: 10
  }
]
// 活动特色
const features = [
  {
    value: '空降嘉宾',
    label: '空降嘉宾'
  },
  {
    value: '前沿领域',
    label: '前沿领域'
  },
  {
    value: '小班授课',
    label: '小班授课'
  },
  {
    value: 'add低碳活动',
    label: 'add低碳活动'
  },
  {
    value: '碳中和认证',
    label: '碳中和认证'
  },
  {
    value: '优质场地',
    label: '优质场地'
  },
  {
    value: '外场教学',
    label: '外场教学'
  },
  {
    value: '多语言授课',
    label: '多语言授课'
  },
  {
    value: '特色住宿',
    label: '特色住宿'
  },
  {
    value: '教学五年＋',
    label: '教学五年＋'
  },
  {
    value: '教学十五年＋',
    label: '教学十五年＋'
  },
  {
    value: '教学二十年+',
    label: '教学二十年+'
  },
  {
    value: '教学三十年+',
    label: '教学三十年+'
  }
]
// 支持语言
const languages = [
  {
    label: '中文',
    value: {
      name: '中文'
    }
  },
  {
    label: '普通话',
    value: {
      name: '普通话'
    }
  },
  {
    label: '英语',
    value: {
      name: '英语'
    }
  },
  {
    label: '俄语',
    value: {
      name: '俄语'
    }
  },
  {
    label: '日语',
    value: {
      name: '日语'
    }
  },
  {
    label: '西语',
    value: {
      name: '西语'
    }
  },
  {
    label: '泰语',
    value: {
      name: '泰语'
    }
  },
  {
    label: '韩语',
    value: {
      name: '韩语'
    }
  },
  {
    label: '上海话',
    value: {
      name: '上海话'
    }
  },
  {
    label: '粤语',
    value: {
      name: '粤语'
    }
  },
  {
    label: '闽南语',
    value: {
      name: '闽南语'
    }
  },
  {
    label: '陕西话',
    value: {
      name: '陕西话'
    }
  },
  {
    label: '蒙语',
    value: {
      name: '蒙语'
    }
  }
]
// 活动类型
const activityTypes = [
  {
    label: '游学',
    value: '游学'
  },
  {
    label: '研学',
    value: '研学'
  },
  {
    label: '夏令营',
    value: '夏令营'
  },
  {
    label: '冬令营',
    value: '冬令营'
  },
  {
    label: '集训特训',
    value: '集训特训'
  },
  {
    label: '营地活动',
    value: '营地活动'
  },
  {
    label: '亲子活动',
    value: '亲子活动'
  },
  {
    label: '产融项目',
    value: '产融项目'
  },
  {
    label: '赛事活动',
    value: '赛事活动'
  },
  {
    label: '其他',
    value: '其他'
  }
]
// 保险
const insurenceOptions = [
  {
    label: '自行购买其他人保险',
    value: '自行购买其他人保险'
  },
  {
    value: '购买与营探合作的第三方保险',
    label: '购买与营探合作的第三方保险',
    children: [
      {
        label: '天安·组织者责任险·每人赔偿限额10万档',
        value: '天安·组织者责任险·每人赔偿限额10万档'
      },
      {
        label: '天安·组织者责任险·每人赔偿限额20万档',
        value: '天安·组织者责任险·每人赔偿限额20万档'
      },
      {
        label: '天安·组织者责任险·每人赔偿限额30万档',
        value: '天安·组织者责任险·每人赔偿限额30万档'
      }
    ]
  }
]
// 餐饮标准
const foodOptions = [
  {
    label: '活动主办方提供自营餐饮服务',
    value: '活动主办方提供自营餐饮服务'
  },
  {
    label: '活动主办方安排其他供餐单位提供餐饮',
    value: '活动主办方安排其他供餐单位提供餐饮'
  },
  {
    label: '不提供餐饮，活动参加者自理',
    value: '不提供餐饮，活动参加者自理'
  }
]
</script>
<style lang="scss">
.product-detail {
  .product-form {
    width: 910px;
  }
  padding-bottom: 80px;
  .desc {
    color: rgba(0, 0, 0, 0.45061);
    font-size: smaller;
    padding-left: 10px;
  }
  .hardware {
    width: 100%;
    margin-bottom: 20px;
    .el-textarea {
      width: 80%;
      height: 100px;
      .el-textarea__inner {
        height: 100%;
      }
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 120px 120px 160px 120px;
    gap: 0 60px;
    .product-detail .el-tooltip__trigger {
      margin-left: 0px;
    }
  }
  .schdule {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    margin: 10px 0;
    background: #f2f2f2;
  }
  .add {
    border: 1px dotted black;
    width: 90%;
    text-align: center;
  }
  .boxs {
    .add {
      width: 100%;
      margin: 10px 0;
    }
  }
  .schdule-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
