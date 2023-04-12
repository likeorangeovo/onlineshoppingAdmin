<template lang="">
  <div>
    <div id="background">
    <div id="login">
      <el-form :model="loginForm" class="loginContainer">
        <h3 class="loginTitle">
          系统登录
        </h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码">
          </el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="loginReq">
            Sign in
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { login } from "../request/index.js"
import errThrow from "../hooks/errThrow.js"
import { store } from "../request/store.js";
import { useRouter } from 'vue-router'
export default {
  name: "AdminLogin",
  setup() {
    const router = useRouter()
    let loginForm = reactive({
      username: "admin",
      password: "testpassword",
    });
    async function loginReq() {
      const res = await login(JSON.stringify(loginForm))
      if (res.data.code == 0) {
        return;
      }
      store.isLogin = true;
      localStorage.setItem("isLogin", true)
      router.push({
        name: 'Backstage',
      })
      return errThrow(res)
    }

    return {
      loginForm,
      loginReq,
    }
  }
};
</script>
<style scoped>
.loginContainer {
  border-radius: 15px;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: rgb(255, 255, 255);
  text-align: center;
  padding-left: 3%;
  box-shadow: 0 10px 12px -10px rgb(133 133 133 / 60%);
}

.loginTitle {
  margin: 0px auto 48px auto;
  text-align: center;
  font-size: 30px;
}

#background {
  width: 100%;
  height: 100%;
  background-color: #99cccc;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>