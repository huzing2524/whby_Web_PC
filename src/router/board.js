export default [
  {
    path: '/board',
    name: '看板',
    component: () => import('_views/board'),
    meta: {
      title: '看板',
    },
  },
  {
    path: '/board/indexs',
    name: '看板1',
    component: () => import('_views/board/indexs'),
    meta: {
      title: '看板',
    },
  },
  {
    path: '/board/test',
    name: '看板2',
    component: () => import('_views/board/test'),
    meta: {
      title: '看板',
    },
  },
]
