export function showStatusStr(statusCode) {
  switch (statusCode) {
    case 4300:
      return '审核不通过'

    case 5100:
      return '草稿商品' // 草稿商品

    case 5200:
      return '审核中' // 审核中
    //
    case 5300:
      return '待提交上架'

    case 5310:
      return '已提交上架待审核' // 审核中

    case 5400:
      return '已上架' // 已上架
    case 5900:
      return '点击提交上架请求'
    default:
      return '默认状态'
  }
}
