import Vue from 'vue'
import Vuex from 'vuex'
import state from './Depend/store'
import getters from './Depend/getter'
import mutations from './Depend/mutations'
import actions from './Depend/actions'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    strict: debug,
    plugins : debug? [createLogger({collapsed:true})] : []
})
