<template>
    <div style="position: relative">
        <div class="topBtn" >
            <el-button size="small" type="primary" class="margin-r" @click="addorEdit(type = 0 )">
                <i class="el-icon-plus"></i>
                新增</el-button>
            <el-dropdown>
                <el-button type="primary" size="small">
                    文章筛选<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="searchList(1, 1)">已审批</el-dropdown-item>
                    <el-dropdown-item @click.native="searchList(1, 2)">未通过</el-dropdown-item>
                    <el-dropdown-item @click.native="searchList(1, 0)">待审核</el-dropdown-item>
                    <el-dropdown-item @click.native="searchList(1, 3)">已下架</el-dropdown-item>
                    <el-dropdown-item @click.native="searchList(1, '')">全部</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-table
                :data="List"
                class="margin"
                stripe
        >
            <el-table-column
                    type="index"
                    width="50"
            >
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="发布人"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="scontent"
                    label="内容简介"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="label"
                    show-overflow-tooltip
                    label="标签">
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="operation(scope.row)"
                    >
                        {{scope.row.stutes == 0 ? '审核': scope.row.stutes == 1? '下架' : scope.row.stutes == 3?'上架': ''}}
                    </el-button>
                    <el-button size="mini" type="primary" @click="addorEdit(1, scope.$index , scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="deleteFunc(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagtion">
            <el-pagination
                    @current-change="changePage"
                    layout="prev, pager, next"
                    :total="pageConfig.allSize">
            </el-pagination>
        </div>
        <dialogMent
                :createList="createList"
                :rules="rule"
                :outerVisible='outerVisible'
                @close = 'closeEvent'
                @submitFunc = 'onSubmit'
                ref="dialog"
        ></dialogMent>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Mixins} from 'vue-property-decorator';
    import {MixinTable} from '../../assets/mixin/mixinTable'
    import dialogMent from '../../components/dialog/dialog.vue'
    @Component({
        components: {
            dialogMent
        }
    })
    export default class shareIndex  extends Mixins(MixinTable) {
        private List ?: object
        private pageNum !: number
        private outerVisible !: boolean
        private createList !:object
        private rule !: object
        public data () {
            return {
                List: [],
                pageNum: 1,
                outerVisible: false,
                createList: [
                    {
                        type:'text',
                        label: '文章标题',
                        key: 'title'
                    },
                    {
                        type: 'text',
                        label :'文章标签',
                        key: 'label'
                    },
                    {
                        type: 'select',
                        label: '主页推荐',
                        key: 'isIndex',
                        children: [
                            {
                                id: '0',
                                name: '是'
                            },
                            {
                                id: '1',
                                name: '否'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '开启评价',
                        key: 'iscommet',
                        children: [
                            {
                                id: '0',
                                name: '是'
                            },
                            {
                                id: '1',
                                name: '否'
                            }
                        ]
                    },
                    {
                        type: 'upload',
                        label: '上传文件',
                        key: 'content',
                        uploadType: 'file'
                    },

                    {
                        type: 'textarea',
                        label: '内容简介',
                        key: 'scontent'
                    },
                    {
                        type: 'upload',
                        label: '上传封面图',
                        key: 'src',
                        uploadType: 'image'
                    }
                ],
                rule: {
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' }
                    ],
                    label: [
                        { required: true, message: '请输入文章标签', trigger: 'blur' }
                    ],
                    isIndex: [
                        { required: true, message: '请选择主页推荐', trigger: 'blur' }
                    ],
                    iscommet: [
                        { required: true, message: '请选择是否开启评价', trigger: 'blur' }
                    ],
                    scontent: [
                        { required: true, message: '请输入内容简介', trigger: 'blur' }
                    ],
                    src: [
                        { required: true, message: '请选择封面图', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请选择md文件', trigger: 'blur' }
                    ]

                }
            }
        }
        private created () {
            this.getList(this.pageNum, '')
            /*
            * 初始化配置函数名
            * */
            this.eventConfig = {
                getFuncKey: 'getList',
                clickType: 0,
                EditIndex: 0,
                addUrl: 'Itshares/uoloadItshare',
                editUrl: 'Itshares/editItshare',
                ArrayKey: 'List',
                deleteUrl: 'Itshares/deleteItshare',
                name: '技术分享'
            }
        }
        private async getList (pageNum:number, stutes: number|string) {
            let result = await this.$axios.post('/Itshares/findAllItshare', {
                pageNum: pageNum,
                stutes: stutes
            })
            this.List = result.data.list
            this.pageConfig.allSize = result.data.size
        }
        private async searchList (pageNum:number , stutes:number|string) {
            let result = await this.$axios.post('/lifes/searchItshare', {
                pageNum: pageNum,
                stutes: stutes
            })
            this.List = result.data.list
            this.pageConfig.allSize = result.data.size
        }
        public addorEdit(type:number , index:number , item:any) {
            let _this:any = this
            this.eventConfig.clickType = type
            if (type === 0) {
                this.outerVisible = true
                _this.$nextTick(() => {
                    _this.$refs.dialog.clearInfo()
                })
            } else {
                this.outerVisible = true
                _this.$refs.dialog.clearInfo()
                _this.$nextTick(() => {
                    this.eventConfig.EditIndex = index
                    _this.$refs.dialog.setEditValue(item)
                })
            }
        }
        public closeEvent() {
            this.outerVisible = false
        }
        public operation (item:any) {
            let _this:any = this
            let url = item.stutes === 0 ? 'Itshares/shItshare' : item.stutes === 1 ? 'Itshares/unItshare' : item.stutes === 3?'Itshares/xjItshare': ''
            let name = item.stutes === 0 ? '通过' : item.stutes === 1 ? '下架' : item.stutes === 3?'上架' :''
            _this.$confirm(`您确定要${name}此文章吗, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$axios.post(url, {id: item._id})
                    .then((result:any) => {
                        if(result.data.code === 0) {
                            _this.$notify({
                                title: '成功',
                                message: '操作成功',
                                type: 'success'
                            })
                            item.stutes = item.stutes === 0? 1:item.stutes ===1 ? 3: item.stutes === 3 ?0 : 0
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
</script>
<style scoped>
    .margin{
        width: calc(100% - 40px);
        margin-left: 20px;
    }
    .pagtion{
        text-align: right;
        margin-right: 20px;
        margin-top: 20px;
    }
    .topBtn{
        width: calc(100% - 40px);
        margin-top: 10px;
        margin-left: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .margin-r{
        margin-right: 10px;
    }
</style>