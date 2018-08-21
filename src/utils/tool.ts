import {Notice} from '../type/type'
export const addNotice = (that:any,obj:Notice):void => {

    return that.$notify({
        title: obj.title,
        message: obj.message,
        type: obj.type
    })
}

// export const addNotice = (obj:Notice):void => {
//
//     return this.$notify({
//         title: obj.title,
//         message: obj.message,
//         type: obj.type
//     })
// }