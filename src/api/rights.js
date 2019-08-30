import Http from '_common/http/'

/**
 * 权限
 * @param {Object} params 
 * @param {String} method 
 */
export function Rights(params, method = 'get') {
  return Http.httpRequest(method, '/rights', params)
}