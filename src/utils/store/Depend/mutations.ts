import * as types from './mutations-types'
import {States} from '../../../type/vuex_type'
const mutations = {
    [types.SET_USERINFO] (state:States, userInfo:object) {
        state.userInfo = userInfo
    },
    [types.SET_LOGIN] (state:States, login:boolean) {
        state.LoginStutes = login
    },

}
export default mutations