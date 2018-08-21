import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './utils/store'
import * as Element from 'element-ui'
import * as axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import request from './utils/server'
Vue.prototype.$axios = request
// Vue.prototype.$axios = axiosConfig
Vue.use(Element,axios)
declare module 'vue/types/vue' {
    interface Vue {
        $axios: any
    }
}

Vue.config.productionTip = false
router.beforeEach((to:any, from:any, next:any) => {
    var user = sessionStorage.getItem('BishareAdmin')
    if (!store.state.LoginStutes) {
        if (user && user != null) {
            store.commit('SET_LOGIN', true)
            store.commit('SET_USERINFO', JSON.parse(user))
            if (to.path === '/login'){
                next('/')
            } else {
                next()
            }
        }
        else {
            if (to.path !== '/login') {
                store.commit('SET_LOGIN', false)
                next('/login')
            } else {
                next ()
            }
        }
    } else {
        next()
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
