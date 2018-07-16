<template>
    <div class="my-list">
      <el-row class="content">
            <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
              <span>
                欢迎：{{name}}！你的待办事项是：
              </span>

              <el-row :gutter="24" class="head-top">
                <el-col :span="20">
                  <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button size="small" class="finish-item" type="primary" @click="addTodos">确定</el-button>
                </el-col>
              </el-row>
              
              
              <el-col :xs="24">
                <template v-if="list.length">
                  <template v-for="(item, index) in list">
                    <div class="todo-list" :key="index">
                      <span class="item no-finished">
                        {{ index + 1 }}. {{ item.content }}
                      </span>
                      <span class="pull-right">
                        <el-button size="small" class="finish-item" type="primary" @click="update(item)">编辑</el-button>
                        <el-button class="remove-item" size="small" :plain="true" type="danger" @click="remove(item)">删除</el-button>
                      </span>
                    </div>
                  </template> 
                </template>
                <div v-else-if="!list.length">
                  暂无待办事项
                </div>
              </el-col>
            </el-col>
          </el-row>
        
        <!--编辑、创建-->
        <el-dialog title="编辑" :visible.sync="editActivityMessage" width="30%">
            <el-form :model="editForm" label-width="100px" ref="form-preview">
                <el-form-item label="待办事项">
                    <el-input v-model="editForm.content"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSave('form-preview')">确 定</el-button>
                    <el-button @click="editActivityMessage = false">取 消</el-button>
                </el-form-item>         
            </el-form>
        </el-dialog>

  </div>
</template>

<script>

import {Ajax} from 'src/utils'

export default {
    created () {
        // const userInfo = this.getUserInfo()
        // if (userInfo !== null) {
        //   this.id = userInfo.id
        //   this.name = userInfo.name
        // } else {
        //   this.id = ''
        //   this.name = ''
        // }
        this.getTodolist()
    },
    data () {
        return {
            name: '',
            todos: '',
            activeName: 'first',
            list: [
                //{id:1, user_id:2, content:'测试文本'}
            ],
            count: 0,
            id: '',
            editActivityMessage:false,
            editForm:{
                content:'',
                id:'',
                userId:''
            }
        }
    },
    methods: {
        //创建
        async addTodos () {
            if (this.todos === '') {
                return false
            }
            let obj = {
                user_id: this.list.length + 1,
                content: this.todos
            }
            let data = await Ajax('post', this.$url + '/api/list/add', obj);
            if(data.code == 0){
                this.$message({
                    type: 'success',
                    message: '创建成功！'
                })
                this.getTodolist()
            }
            this.todos = ''
        },
        //删除
        async remove (item) {
            let data = await Ajax('post', this.$url + '/api/list/remove', {id:item.id, userId:item.user_id});
            if(data.code == 0){
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
                this.getTodolist()
            }
        },
        getUserInfo () {
            const token = sessionStorage.getItem('demo-token')
            if (token !== null && token !== 'null') {
                let decode = jwt.decode(token)
                return decode
            } else {
                return null
            }
        },
        //获取列表
        async getTodolist () {
            const code = await Ajax('get', this.$url + '/api/list/get', {})
            if(code.code == 0){
                this.list = code.data
            }
        },
        update (item) {
            this.editActivityMessage = true;
            //this.editForm = JSON.parse(JSON.stringify(item));
            this.editForm.id = item.id;
            this.editForm.content = item.content;
            this.editForm.userId = item.user_id;
        },
        //更新
        async handleSave(formName) {
            let that = this;                      
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let ajaxData = this.editForm;                     
                    const data = await Ajax('post', this.$url + '/api/list/update', ajaxData);
                    if (data.code == 0) {
                        this.$message({
                          message: data.msg,
                          type: 'success'
                        });
                        this.editActivityMessage = false;
                        this.getTodolist();
                    }
                }                      
            });
        },
    }
}
</script>

<style lang="less" scoped>
    .head-top{
        margin:20px 0;
    }
    .el-input{
        .todo-list{
            width: 100%;
            margin-top: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
            overflow: hidden;
            text-align: left;
        }
        .item{
            font-size: 20px;
            &.finished{
                text-decoration: line-through;
                color: #ddd;
            }
        }
        .pull-right{
            float: right;
        }
    }
    .todo-list{
        margin-bottom: 10px;
    }
</style>
<style lang="less" >
    .my-list{
        @media screen and (max-width:600px) {
            .el-form-item__content button{
                padding:10px 10px;
            }
        }
        .el-dialog{
            min-width: 300px;
        }
    }
</style>