<template>
    <div class="login">
        <div class="inset-login">
            <h3 class="name">比比熊博客后台管理</h3>
            <el-form ref="forms" :model="form" label-width="0px" :rules="rules">
                <el-form-item prop="userAdmin">
                    <div class="input-wrap">
                        <i class="el-icon-tickets lefI"></i>
                        <el-input type="text" class="userName" placeholder="请输入用户名" v-model="form.userAdmin"></el-input>
                    </div>
                </el-form-item>
                <el-form-item  prop="password">
                    <div class="input-wrap">
                        <i class="el-icon-tickets lefI"></i>
                        <el-input :type="ShowStutes?'password':'text'" class="userName" placeholder="请输入密码" v-model="form.password"></el-input>
                        <i class="el-icon-view right" @click="ShowStutes = !ShowStutes"></i>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" long class="btns" @click="login" :loading="loadingStutes">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Action, namespace} from 'vuex-class'
@Component
export default class login extends Vue {
    @Action ('userLogin') public userLogin: any
    private form? : object
    private loadingStutes?: boolean
    private ShowStutes ?: boolean
    private data() {
        return {
            form: {
                userAdmin: '',
                password:''
            },
            ShowStutes: true,
            loadingStutes: false,
            rules: {
                userAdmin: [
                    { required: true, message: '请输入登录名', trigger: 'blur' },
                    { min: 6, message: '最小6个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '最小6个字符', trigger: 'blur' }
                ]

            }

        }
    }
    private mounted () {
    }

    private login() {
        const { form } = this;
        (this.$refs.forms as any).validate((valid:any) => {
            if (valid) {
                this.loadingStutes  = true
                this.userLogin(form)
                    .then((result:number) => {
                        if(result === 0 ) {
                            this.$router.push('/')
                        } else {
                            return false
                        }
                    })
            } else {
                return false;
            }
        })
    }
}
</script>
<style>
    .userName input{
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        height: 100%;
        color: #eee;
        font-size: 16px;
    }
</style>
<style lang="css" scoped>
    .login{
        background: #2d3a4b;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .inset-login{
        width: 420px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
    }
    .name{
        font-size: 26px;
        color: #eee;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
    }
    .input-wrap{
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        height: 45px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .lefI ,.right {
        color: white;
        font-size: 16px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .right {
        cursor: pointer;
    }
    .btns{
        width: 100%;
    }
</style>