import { Component, Vue} from 'vue-property-decorator';

import {table , event} from '../../type/type'
// You can declare a mixin as the same style as components.
@Component
export class MixinTable extends Vue {
    public pageConfig: table= {
        pageNum: 1,
        pageSize: 10,
        currentPage: 1,
        allSize: 1
    }
    public eventConfig: event = {
        getFuncKey: '',
        clickType: 0,
        EditIndex: 0,
        addUrl: '',
        editUrl: '',
        ArrayKey: '',
        deleteUrl: '',
        name: ''
    }
    public changePage(num:number) {
        let _this:any = this
        _this.pageConfig.currentPage = num
        _this[_this.eventConfig.getFuncKey](num)
        // this.getList(num)
    }
    /**
     * @method onSubmit
     * @params form
     * */
    public async onSubmit(form:any) {
        let _this:any = this, url = _this.eventConfig.clickType===0?_this.eventConfig.addUrl:_this.eventConfig.editUrl
         if (_this.eventConfig.clickType !== 0) {
             form.id = form._id
         }
        let  result = await _this.$axios.post(url ,form)
         if(result.data.code === 0) {
             _this.$notify({
                 title: '成功',
                 message: '操作成功',
                 type: 'success'
             })
             _this.outerVisible = false
             if (_this.eventConfig.clickType === 0) {
                 _this[_this.eventConfig.getFuncKey](_this.pageConfig.currentPage)
             } else {
                 // _this[_this.eventConfig.ArrayKey][_this.eventConfig.EditIndex] = JSON.parse(JSON.stringify(form))
                 _this.$set(_this[_this.eventConfig.ArrayKey], [_this.eventConfig.EditIndex] ,JSON.parse(JSON.stringify(form)))
             }

         } else {
             _this.$notify({
                 title: '失败',
                 message: result.data.msg,
                 type: 'error'
             })
         }
    }
    public deleteFunc (index:number , item:any) {
        let _this:any = this
        _this.$confirm(`此操作将永久删除选中${_this.eventConfig.name}, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _this.$axios.post(_this.eventConfig.deleteUrl, {id: item._id})
                .then((result:any) => {
                  if(result.data.code === 0) {
                      _this.$notify({
                          title: '成功',
                          message: '删除成功',
                          type: 'success'
                      })
                      _this[_this.eventConfig.ArrayKey].splice(index, 1)
                  } else {
                      _this.$notify({
                          title: '失败',
                          message: result.data.msg,
                          type: 'error'
                      })
                  }
                })

        }).catch(() => {

        });
    }
}
