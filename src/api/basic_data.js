import Http from '_common/http/'

/**
 * 获取年度生产计划
 * @param {Object} params 
 * @param {String} method 
 */
export function AnnualPlanMain(params, method = 'get') {
  return Http.httpRequest(method, '/annual_plan/main', params)
}

/**
 * 获取班次列表
 * @param {Object} params 
 * @param {String} method 
 */
export function ScheduleMain(params, method = 'get') {
  return Http.httpRequest(method, '/schedule/main', params)
}

/**
 * 获取车间列表
 * @param {Object} params 
 * @param {String} method 
 */
export function WorkshopMain(params, method = 'get') {
  return Http.httpRequest(method, '/workshop/main', params)
}

/**
 * 获取工段列表
 * @param {Object} params 
 * @param {String} method 
 */
export function SectionMain(params, method = 'get') {
  return Http.httpRequest(method, '/section/main', params)
}
