import Http from '_common/http/'

/**
 * 获取产品列表
 * @param {Object} params
 * @param {String} method
 */
export function ProductTargetType(params, method = 'get') {
  return Http.httpRequest(method, '/product/target/type', params)
}

/**
 * 生产目标差异
 * @param {*} params
 */
export function ProductTarget(params, method) {
  return Http.httpRequest(method, '/product/target', params )
}