import state from './store'
import {States} from '../../../type/vuex_type'
const getters = {

    userInfo:(state:States) => state.userInfo,
    LoginStutes:(state:States) => state.LoginStutes

}
export default getters