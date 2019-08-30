export default [
  {
    path: '/basic_data/annual_production_plan',
    name: '年度生产计划',
    component: () => import('_views/basic_data/annual_production_plan'),
    meta: {
      title: '年度生产计划',
    },
  },
  {
    path: '/basic_data/schedule',
    name: '班次',
    component: () => import('_views/basic_data/schedule'),
    meta: {
      title: '班次',
    },
  },
  {
    path: '/basic_data/workshop',
    name: '车间',
    component: () => import('_views/basic_data/workshop'),
    meta: {
      title: '车间',
    },
  },
  {
    path: '/basic_data/section',
    name: '工段',
    component: () => import('_views/basic_data/section'),
    meta: {
      title: '工段',
    },
  },
]
