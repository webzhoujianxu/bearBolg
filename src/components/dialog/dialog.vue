<template>
    <el-dialog title="新增生活日志" :visible.sync="outerVisible" width="60%" top="15vh" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
        <el-form ref="form" :model="form" label-width="95px" :inline="true" class="formStyle" :rules="rules" >
            <el-form-item :label="item.label" v-for="item in createList" :key="item.value" :prop="item.key">
                <el-input v-model="form[item.key]" :type="item.type" v-if="item.type === 'text' || item.type === 'textarea'"></el-input>
                <el-select v-model="form[item.key]"  v-if="item.type === 'select'" >
                    <el-option :label="items.name" :value="items.id" v-for="items in item.children" :key="items.id"></el-option>
                </el-select>
                <el-upload
                        v-if="item.type === 'upload' && item.uploadType === 'image'"
                        class="avatar-uploader"
                        :action="apiURL+ 'uploadFile'"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        @click.native="setType('image', item.key)"
                        :show-file-list="false">
                    <img v-if="form[item.key]" :src="form[item.key]" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"  ></i>
                </el-upload>
                <el-upload
                        v-if="item.type === 'upload' && item.uploadType === 'file'"
                        class="btn-w"
                        :action="apiURL+'uploadFileMds'"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        @click.native="setType('file', item.key)"
                        :show-file-list="false">
                    <el-button style="width: 100%">
                        <span class="fileText" v-if="form[item.key]">{{form[item.key]}}</span>
                        <span v-else>上传文件</span>
                    </el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
    </el-dialog>
</template>
<style>
    .el-form-item{
        width: 45%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 3%;
    }
    .el-form-item__content {
        width: calc(100% - 95px);
    }
    .el-select,.btn-w .el-upload{
        width: 100%;
    }
    .formStyle{
        display: flex;
        flex-flow: row wrap;
    }
    .el-form--inline .el-form-item__label{
        text-align: left;
    }
</style>
<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        border: 1px solid whitesmoke;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
    .fileText{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        width: 90%;
    }
</style>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import api from '../../assets/api'
@Component
export default class dialogMent extends Vue {
    @Prop({default: Array}) createList?: object
    @Prop({default: false}) outerVisible?: boolean
    @Prop({default: Array}) rules ?: object
    private form ?: any
    private useType?:string
    private useKey ?: string
    public data () {
        return {
            form:{},
            useType: null,
            apiURL: api ,
            useKey: null
        }
    }
    public beforeCreate () {}
    public created () {
        let _this:any = this
            _this.createList.forEach((item: any) => {
                _this.$set(_this.form, item.key , '')
            })
    }
    public onSubmit() {
        let _this:any = this
        _this.$refs['form'].validate((valid:boolean) => {
            if (valid) {
                this.$emit('submitFunc', _this.form)
            } else {
                return false;
            }
        });
    }
    public handleAvatarSuccess(response:any,file:any, fileList:any) {
        let _this:any = this
        _this.form[_this.useKey] = response.path
    }
    public beforeAvatarUpload(file:any) {
        let isJPG = null
        if (this.useType === 'image') {
             isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        } else {
            isJPG = true
        }
        const isLt2M = file.size / 1024 / 1024 < 1;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传文件大小不能超过 1MB!');
        }
        return isJPG && isLt2M;
    }
    public setType(type:string , key:string){
        this.useType = type
        this.useKey = key
    }
    public closeDialog() {
        this.$emit('close')
    }
    public setEditValue (form:any) {
        this.form = JSON.parse(JSON.stringify(form))
    }
    public clearInfo () {
        let _this:any = this
        if (_this.$refs['form']) {
            _this.$refs['form'].resetFields()
        }
    }
}

</script>