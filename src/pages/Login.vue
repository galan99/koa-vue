<template>
    <div class="login-wrap">
        <div class="ms-title">欢迎登录</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips :用户名：admin, 密码：123。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import { Ajax } from "src/utils";

export default {
  data: function() {
    return {
      ruleForm: {
        username: "admin",
        password: "123"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted(){
    document.querySelector('.login-wrap').style.height = document.documentElement.clientHeight + 'px';
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await Ajax(
            "post",
            this.$url + "/api/login",
            this.ruleForm
          );
          if (data.code == 0) {
            this.$router.push("/list");
          }
          //sessionStorage.setItem('ms_username',this.ruleForm.username);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }

};
</script>

<style scoped lang="less" type="text/less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: #324157;
  overflow: hidden;
  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }
  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
  }
}
</style>