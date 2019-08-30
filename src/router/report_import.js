export default [
  {
    path: '/report_import/product_instock',
    name: 'product_instock',
    component: () => import('_views/report_import/product_instock'),
    meta: {
      title: '产品入库质量等级统计',
    },
  },
  {
    path: '/report_import/product_patch',
    name: 'product_patch',
    component: () => import('_views/report_import/product_patch'),
    meta: {
      title: '生产批次',
    },
  },
]