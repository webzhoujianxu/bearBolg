import * as types from './mutations-types'
import { Commit, Action, ActionTree } from 'vuex'
import {States} from '../../../type/vuex_type'
import request from '../../server'
import {Notification} from 'element-ui'
import { ActionContext } from 'vuex'
const SetLoginStutes: Action<States, any> = (context: { commit: Commit }, login: boolean) => {
    context.commit(types.SET_LOGIN, login)
}
const SetUserInfo: Action<States, any> = (context: { commit: Commit }, userInfo: object) => {
    context.commit(types.SET_USERINFO, userInfo)
}
const SetLoginAndUserInfo : Action<States, any> = (context: { commit: Commit }, loginObj:any) => {
    context.commit(types.SET_USERINFO, loginObj.userInfo)
    context.commit(types.SET_LOGIN, loginObj.login)
}
const actions = {
    SetLoginStutes,
    SetUserInfo,
    SetLoginAndUserInfo,
    /*
    * @method userLogin
    * @param   userAdmin 用户登录名 , password 用户密码
    * @return  0/1/...  0 登录成功  or 失败
    * */
    async userLogin (contenxt:{commit:Commit},params:any){
       let result:any =  await request.post('/users/loginUsers' , params)
         if (result.data.code === 0) {
           sessionStorage.setItem('BishareAdmin', JSON.stringify(result.data.list))
           contenxt.commit(types.SET_LOGIN, true)
           contenxt.commit(types.SET_USERINFO, result.data.list)
             Notification({
                 title: '成功',
                 message: result.data.msg,
                 type: 'success'
             })
         } else {
             Notification({
                 title: '失败',
                 message: result.data.msg,
                 type: 'error'
             })
         }
         return result.data.code
    },
    async outLogin (contenxt: {commit:Commit}) {
        sessionStorage.removeItem('BishareAdmin')
        contenxt.commit(types.SET_LOGIN, false)
        contenxt.commit(types.SET_USERINFO, {})

    }

}
export default actions