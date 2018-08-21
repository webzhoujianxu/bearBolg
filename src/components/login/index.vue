<template>
    <el-container class="index-warp">
        <el-header class="header">周建旭的个人博客后台</el-header>
        <el-container >
            <el-aside width="200px" style="background: white">
                <el-row class="tac">
                    <el-col :span="24">
                        <el-menu
                                :default-active="$route.path"
                                router
                                class="el-menu-vertical-demo">
                            <el-submenu :index="String(index)" v-for="item, index in MenuArray" :key="item.name">
                                <template slot="title">
                                    <span>{{item.name}}</span>
                                </template>
                                <el-menu-item-group v-for="items in item.children" :key="items.name">
                                    <el-menu-item :index="items.path">{{items.name}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main style="position: relative">
                <router-view class='router'></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
    .el-menu{
        border-right: none;
    }
</style>
<style scoped>
    .index-warp{
        width: 100%;
        height: 100%;
    }
    .header{
        background: #409EFF;
        color: white;
        line-height: 60px;
        margin-bottom: 10px;
    }
    .header span {
        font-size: 22px;
        letter-spacing: 3px;
        font-family: 'Hiragino Sans GB';
    }
    .router{
        position: absolute!important;
        left: 10px;
        right: 10px;
        top:0;
        bottom: 0;
        background: white;
    }
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class allIndex  extends Vue {
    private MenuArray? : object
    private data () {
        return {
            MenuArray: [
                {
                    name: '权限管理',
                    path: '/null',
                    children: [
                        {
                            name: '用户列表',
                            path: '/userList'
                        },
                        {
                            name: '添加用户',
                            path: '/addUser'
                        }
                    ]
                },
                {
                    name: '文章管理',
                    children: [
                        {
                            path: '/index/life',
                            name: '生活日志'
                        },
                        {
                            path: '/index/share',
                            name: '技术分享'
                        }
                    ]
                }
            ]
        }
    }
}

</script>