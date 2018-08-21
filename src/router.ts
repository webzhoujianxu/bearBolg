import Vue from 'vue'
import Router from 'vue-router'
import login from './components/login/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/index'
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/login/login.vue')
    },
      {
          path: '/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "about" */ './components/login/index.vue'),
          children: [
              {
                path: 'life',
                component: () => import(/* webpackChunkName: "about" */ './components/life/life.vue')
              },
              {
                path: 'share',
                component: () => import(/* webpackChunkName: "about" */ './views/share/share.vue')
              }
          ]
      }
  ]
})

