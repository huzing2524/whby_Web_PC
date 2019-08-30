import Http from '_common/http/'

// 生产日报表
export function ProductDailyReport(params) {
  return Http.httpRequest('get', '/board/product_daily_report', params)
}

// 生产产量
export function ProductOutput(params) {
  return Http.httpRequest('get', '/board/product_output', params)
}

// 生产入库质量
export function ProductIncomingQuality(params) {
  return Http.httpRequest('get', '/board/product_incoming_quality', params)
}

// 停机时间
export function ShutdownStats(params) {
  return Http.httpRequest('get', '/board/shutdown_stats', params)
}

// 物资消耗记录列表
export function MaterialConsumption(params) {
  return Http.httpRequest('get', '/data/input/material_consumption', params)
}
