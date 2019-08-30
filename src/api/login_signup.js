import Http from '_common/http/'

/**
 * 万华板业登录
 * @param {Object} params
 * @param {String} method
 */
export function Login(params) {
    return Http.httpLoginRequest('get', '/whby/login', params)

    // return Http.httpGet('/whby/login', params, '/bbapi')
}

/**
 * 注册
 * @param {Object} params
 * @param {String} method
 */
export function SignUp(params, method = 'get') {
    return Http.httpLoginRequest(method, '/api/v2/signup', params)
}

/**
 * SendSms
 * @param {*} params
 */
export function SendSms(params) {
    return Http.httpLoginRequest('post', '/invite/sms', params)
}