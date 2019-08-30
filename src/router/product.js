export default [
  {
    path: '/product/product_target',
    name: 'product_target',
    component: () => import('_views/product/product_target'),
    meta: {
      title: '生产目标差异',
    },
  },
  {
    path: '/product/product_list',
    name: 'product_list',
    component: () => import('_views/product/product_list'),
    meta: {
      title: '设置内容',
    },
  },
]