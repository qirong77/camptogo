// 商户端路由
export const userRouter = [
  {
    path: '/workbench',
    component: () => import('../../view/user/workbench/workbench.vue'),
    children: [
      // 基本信息
      {
        path: 'basicInfo',
        component: () =>
          import('../../view/user/workbench/basic-Info/basic-info.vue')
      },
      // 商品发布
      {
        path: 'productLunch',
        component: () =>
          import('../../view/user/workbench/product-lunch/product-lunch.vue')
      },
      {
        path: 'product/:id',
        component: () =>
          import('../../view/user/workbench/product-lunch/product-detail.vue')
      },
      // 商品管理
      {
        path: 'product-manage',
        component: () =>
          import('../../view/user/workbench/product-manage/product-manage.vue')
      },
      // 主理人设置
      {
        path: 'manager-setting',
        component: () => import('../../view/user/workbench/manager-setting/manager-setting.vue')

      },
      // 订单管理
      {
        path: 'manager-ordering',
        component: () => import('../../view/user/workbench/manager-ordering/manager-ordering.vue')

      },
      // 使用反馈
      {
        path: 'feedback',
        component: () => import('../../view/user/workbench/feedback/feedback.vue')
      }, {
        path:'progress',
        component:()=>import('../../view/user/workbench/progress/progress.vue')
      }
    ]
  },
  {
    path:'/rule',
    component:()=>import('../../view/user/rules/rule.vue')
  }
]
