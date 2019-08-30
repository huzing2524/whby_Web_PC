export default [
  //---------物料消耗------------
  {
    path: '/data_entry/material_consumption',
    name: '/data_entry/material_consumption',
    component: () => import('_views/data_entry/material_consumption'),
    meta: {
      title: '物料消耗记录',
    },
  },
  {
    path: '/data_entry/material_consumption/add_data',
    name: '/data_entry/material_consumption/add_data',
    component: () => import('_views/data_entry/material_consumption/add_data'),
    meta: {
      title: '添加数据',
    },
  },
  //---------物料消耗表------------
  {
    path: '/data_entry/material_consumption_table',
    name: '/data_entry/material_consumption_table',
    component: () => import('_views/data_entry/material_consumption_table'),
    meta: {
      title: '物料消耗表',
    },
  },
  {
    path: '/data_entry/material_consumption_table/add_data',
    name: '/data_entry/material_consumption_table/add_data',
    component: () => import('_views/data_entry/material_consumption_table/add_data'),
    meta: {
      title: '添加数据',
    },
  },
  //---------压机操作记录------------
  {
    path: '/data_entry/record_press_operation',
    name: '/data_entry/record_press_operation',
    component: () => import('_views/data_entry/record_press_operation'),
    meta: {
      title: '压机操作记录',
    },
  },
  {
    path: '/data_entry/record_press_operation/add_data',
    name: '/data_entry/record_press_operation/add_data',
    component: () => import('_views/data_entry/record_press_operation/add_data'),
    meta: {
      title: '添加数据',
    },
  },
  //----------压机运行记录-----------
  {
    path: '/data_entry/record_press_run',
    name: '/data_entry/record_press_run',
    component: () => import('_views/data_entry/record_press_run'),
    meta: {
      title: '压机运行记录',
    },
  },
  {
    path: '/data_entry/record_press_run/add_data',
    name: '/data_entry/record_press_run/add_data',
    component: () => import('_views/data_entry/record_press_run/add_data'),
    meta: {
      title: '添加数据',
    },
  },
  //----------砂光锯切表-----------
  {
    path: '/data_entry/record_sanding_cut',
    name: '/data_entry/record_sanding_cut',
    component: () => import('_views/data_entry/record_sanding_cut'),
    meta: {
      title: '砂光锯切表',
    },
  },
  {
    path: '/data_entry/record_sanding_cut/add_data',
    name: '/data_entry/record_sanding_cut/add_data',
    component: () => import('_views/data_entry/record_sanding_cut/add_data'),
    meta: {
      title: '添加数据',
    },
  },
  {
    path: '/data_entry/record_sanding_cut/add_data_one',
    name: '/data_entry/record_sanding_cut/add_data_one',
    component: () => import('_views/data_entry/record_sanding_cut/add_data_one'),
    meta: {
      title: '添加数据',
    },
  },
  {
    path: '/data_entry/record_sanding_cut/add_data_two',
    name: '/data_entry/record_sanding_cut/add_data_two',
    component: () => import('_views/data_entry/record_sanding_cut/add_data_two'),
    meta: {
      title: '添加数据',
    },
  },
  {
    path: '/data_entry/record_sanding_cut/add_data_three',
    name: '/data_entry/record_sanding_cut/add_data_three',
    component: () => import('_views/data_entry/record_sanding_cut/add_data_three'),
    meta: {
      title: '添加数据',
    },
  },
  //---------停机记录------------
  {
    path: '/data_entry/record_shutdown',
    name: '/data_entry/record_shutdown',
    component: () => import('_views/data_entry/record_shutdown'),
    meta: {
      title: '停机记录',
    },
  },
  {
    path: '/data_entry/record_shutdown/add_data',
    name: '/data_entry/record_shutdown/add_data',
    component: () => import('_views/data_entry/record_shutdown/add_data'),
    meta: {
      title: '添加数据',
    },
  },
]
