import Http from '_common/http'
import Axios from 'axios'

export function QualityData(params) {
  return Http.httpRequest('get', '/product/quality', params)
}

export function BatchData(params) {
  return Http.httpRequest('get', '/product/batch', params)
}

export function QualityUpload(params) {
  return requestAsFormData({ url: '/whapi/product/quality', params })
}

export function BatchUpload(params) {
  return requestAsFormData({ url: '/whapi/product/batch', params })
}

function requestAsFormData({ url, params, method = 'post' }) {
  Axios.defaults.timeout = 60 * 1000
  const rootUrl = window.location.origin
  Axios.defaults.baseURL = rootUrl
  var data = new FormData()
  Object.keys(params).forEach((key) => {
    data.append(key, params[key])
  })
  return Axios({
    method,
    url,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: localStorage.getItem('Authorization') + '',
    },
  })
}
