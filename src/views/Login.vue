<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form">
      <el-form-item class="button-container">
        <h2>请登陆</h2>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" placeholder="Enter username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" type="password" placeholder="Enter password"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button @click="goToRegister" type="text">没有用户名去注册</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      // 在这里执行登陆逻辑
      console.log(this.loginForm);
    },
    goToRegister() {
      // 跳转到注册页面
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #eaf7ed;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  margin-top: 20px;
}
</style>