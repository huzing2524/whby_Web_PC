import Http from '_common/http/'

/**
 * return 压机运行记录   参数date(Integer)和schedule(string)
 * @param method get：获取列表，post：增加一个数据，put：修改一个数据
 * params
 *        get列表：参数date(Integer)和schedule(string)
 *        post新增一个：body:{}
 *        put修改一个： body:{}
 */
export function PressRecordsRun(method, params) {
  return Http.httpRequest(method, '/data/input/press_records', params)
}

/**
 * return 物料消耗表   参数date(Integer)和schedule(string)
 * @param method get：获取列表，post：增加一个数据，put：修改一个数据
 * params
 *        get列表：参数date(Integer)和schedule(string)
 *        post新增一个：body:{}
 *        put修改一个： body:{}
 */
export function MaterialCosumptionTable(method, params) {
  return Http.httpRequest(method, '/data/input/material_records', params)
}

/**
 * return 物资消耗   参数date(Integer)和schedule(string)
 * @param method get：获取列表，post：增加一个数据，put：修改一个数据
 * params
 *        get列表：参数date(Integer)和schedule(string)
 *        post新增一个：body:{}
 *        put修改一个： body:{}
 */
export function MaterialCosumption(method, params) {
  return Http.httpRequest(method, '/data/input/material_consumption', params)
}

/**
 * return 停机记录   参数date(Integer)和schedule(string)
 * @param method get：获取列表，post：增加一个数据，put：修改一个数据
 * params
 *        get列表：参数date(Integer)和schedule(string)
 *        post新增一个：body:{}
 *        put修改一个： body:{}
 */
export function ShoutDownRecord(method, params) {
  return Http.httpRequest(method, '/data/input/shutdown_records', params)
}

// 获取砂光锯切记录列表
export function SandingList(params) {
  return Http.httpRequest('get', '/data/input/sanding_sawing', params)
}

// 添加砂光锯切记录
export function AddSanding(params) {
  return Http.httpRequest('post', '/data/input/sanding_sawing', params)
}

// 修改砂光锯切记录
export function ChangeSanding(params) {
  return Http.httpRequest('put', '/data/input/sanding_sawing', params)
}

/**
 * return 压机操作记录   参数date(Integer)和schedule(string)
 * @param method get：获取列表，post：增加一个数据，put：修改一个数据
 * params
 *        get列表：参数date(Integer)和schedule(string)
 *        post新增一个：body:{}
 *        put修改一个： body:{}
 */
export function PressOperation(method, params) {
  return Http.httpRequest(method, '/data/input/press_operation', params)
}
