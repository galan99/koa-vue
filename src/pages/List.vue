<template>
    <div class="my-list">
      <el-row class="content">
            <el-col>
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
                <div class="page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-sizes="pageSizeArray"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div> 
                <div v-if="!list.length">
                  暂无待办事项
                </div>
              </el-col>
            </el-col>
          </el-row>
        
        <!--编辑、创建-->
        <el-dialog title="编辑" :visible.sync="editActivityMessage" width="30%">
            <el-form :model="editForm" :rules="rules" label-width="100px" ref="form-preview">
                <el-form-item label="待办事项" prop="content">
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
import { Ajax } from "src/utils";

export default {
  created() {
    // const userInfo = this.getUserInfo()
    // if (userInfo !== null) {
    //   this.id = userInfo.id
    //   this.name = userInfo.name
    // } else {
    //   this.id = ''
    //   this.name = ''
    // }
    this.getTodolist();
  },
  data() {
    return {
      name: "",
      todos: "",
      activeName: "first",
      list: [
        //{id:1, user_id:2, content:'测试文本'}
      ],
      count: 0,
      id: "",
      editActivityMessage: false,
      editForm: {
        content: "",
        id: "",
        userId: ""
      },
      rules: {
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      pageSizeArray: [10, 20, 30, 50],
      curPage: 1, //当前页数
      total: 0, //总条目数
      pageSize: 10 //每页显示条目个数
    };
  },
  methods: {
    //创建
    async addTodos() {
      if (this.todos === "") {
        return false;
      }
      let obj = {
        user_id: this.list.length + 1,
        content: this.todos
      };
      let data = await Ajax("post", this.$url + "/api/list/add", obj);
      if (data.code == 0) {
        this.$message({
          type: "success",
          message: "创建成功！"
        });
        this.getTodolist();
      }
      this.todos = "";
    },
    //删除
    async remove(item) {
      let data = await Ajax("post", this.$url + "/api/list/remove", {
        id: item.id,
        userId: item.user_id
      });
      if (data.code == 0) {
        this.$message({
          type: "success",
          message: "删除成功！"
        });
        this.getTodolist();
      }
    },
    getUserInfo() {
      const token = sessionStorage.getItem("demo-token");
      if (token !== null && token !== "null") {
        let decode = jwt.decode(token);
        return decode;
      } else {
        return null;
      }
    },
    //获取列表
    async getTodolist() {
      const code = await Ajax("get", this.$url + "/api/list/page", {
        page: this.curPage,
        pageSize: this.pageSize
      });
      if (code.code == 0) {
        this.list = code.data.list;
        this.total = code.data.count;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTodolist();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getTodolist();
    },
    update(item) {
      this.editActivityMessage = true;
      //this.editForm = JSON.parse(JSON.stringify(item));
      this.editForm.id = item.id;
      this.editForm.content = item.content;
      this.editForm.userId = item.user_id;
    },
    //更新
    async handleSave(formName) {
      let that = this;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let ajaxData = this.editForm;
          const data = await Ajax(
            "post",
            this.$url + "/api/list/update",
            ajaxData
          );
          if (data.code == 0) {
            this.$message({
              message: data.msg,
              type: "success"
            });
            this.editActivityMessage = false;
            this.getTodolist();
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.head-top {
  margin: 20px 0;
}
.el-input {
  .todo-list {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
  }
  .item {
    font-size: 20px;
    &.finished {
      text-decoration: line-through;
      color: #ddd;
    }
  }
  .pull-right {
    float: right;
  }
}
.todo-list {
  margin-bottom: 10px;
}
</style>
<style lang="less" >
.page {
  padding: 20px 0 20px;
  text-align: right;
}
.my-list {
  @media screen and (max-width: 640px) {
    .el-form-item__content button {
      padding: 10px 10px;
    }
    .el-form-item__label {
      width: auto !important;
    }
    .el-form-item__content {
      margin-left: 80px !important;
    }
    .el-pagination .el-select .el-input,
    .el-pagination__jump,
    .el-pagination__sizes {
      display: none !important;
    }
    .el-pagination {
      .el-pagination__total {
        display: block;
        margin: 0;
        text-align: center;
      }
    }
    .page {
      padding-top: 5px;
      text-align: center;
    }
  }
  .todo-list {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 32px;
    .item {
      display: block;
    }
    .pull-right {
      display: block;
    }
    .item {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
  }
  .content {
    padding: 10px 10px;
    max-width: 800px;
    margin: 0 auto;
  }
  .el-dialog {
    min-width: 300px;
  }
  .head-top {
    width: 100%;
    overflow: hidden;
    margin-left: -12px !important;
    margin-right: 0 !important;
    .el-col-20 {
      width: calc(100% - 78px);
    }
    .el-col-4 {
      padding: 0 !important;
      width: auto !important;
      button {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
      }
    }
  }
}
</style>