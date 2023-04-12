import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      redirect:"/login"
    },{
      path: '/login',
      name: 'AdminLogin',
      component: () => import('../views/AdminLogin.vue'),
    },{
      path: '/backstage',
      name: 'Backstage',
      redirect:"/backstage/editUser",
      component:  () => import('../views/Backstage.vue'),
      children: [
        {
          path: 'editUser',
          name: 'EditUser',
          component: () => import('../views/EditUser.vue'),
          meta: {
            requireLogin:true,
          },
        },{
          path: 'editAdmin',
          name: 'EditAdmin',
          component: () => import('../views/EditAdmin.vue'),
          meta: {
            requireLogin:true,
          },
        },{
          path: 'goods',
          name: 'Goods',
          component: () => import('../views/Goods.vue'),
          meta: {
            requireLogin:true,
          },
        },{
          path: 'goods/:id',
          name: 'EditGoods',
          component: () => import('../views/EditGoods.vue'),
          meta: {
            requireLogin:true,
          },
        },{
          path: 'orders',
          name: 'Orders',
          component: () => import('../views/Orders.vue'),
          meta: {
            requireLogin:true,
          },
        },{
          path: 'orders/:id',
          name: 'EditOrders',
          component: () => import('../views/EditOrders.vue'),
          meta: {
            requireLogin:true,
          },
        }
      ]
    }
  ],
})

export default router
