<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1 style="font-weight: 500">智慧园区-登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <p style="margin: 0 0 -5px 1px; font-size: 16px; color: #8b929d">
              账号
            </p>
            <el-input v-model.trim="form.username" />
          </el-form-item>
          <el-form-item prop="password">
            <p style="margin: 0 0 -5px 1px; font-size: 16px; color: #8b929d">
              密码
            </p>
            <el-input
              v-model.trim="form.password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-checkbox>记住我</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px" @click="submit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { loginApi } from "@/api/user";
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      // 表单绑定数据
      form: {
        username: process.env.NODE_ENV === "development" ? "demo" : "",
        password: process.env.NODE_ENV === "development" ? "zh@hm#23" : "",
      },
      // 表单校验规则
      rules: {
        username: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // isAgree: [
        //   {
        //     validator: (rule, value, callback) => {
        //       value ? callback() : callback(new Error('没有勾选用户平台协议'))
        //     }
        //   }
        // ]
      },
    };
  },
  methods: {
    submit() {
      // 校验整个表单
      this.$refs.form.validate(async (valid) => {
        // if (!valid) return
        if (valid) {
          // 执行登录相关的操作
          // 跳转到主页
          this.list();
          const res = await loginApi(this.form);
          await this.$store.dispatch("user/login", this.form);
          this.$router.push("/workbench");
        }
      });
    },
    list() {
      axios
        .post("https://api-hmzs.itheima.net/api/park/login", this.form)
        .then((response) => {
          this.$message({
            type: "success",
            message: response.data.msg,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/luxing.png) no-repeat center /
      cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 100px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        // background: #f4f5fb;
        background: #fff;
      }
    }
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
