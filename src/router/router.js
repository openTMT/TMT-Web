export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
    redirect: 'login',
    children: [
      {
        path: '/update',
        name: 'update',
        component: () => import('@/views/update/index.vue'),
      },
      {
        path: '/tmt',
        name: 'tmt',
        component: () => import('@/views/tmt/index.vue'),
      },

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]
