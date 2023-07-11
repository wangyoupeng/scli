<template>
  <div class="register-container">
    <div class="back-link">
      <el-button @click="goToLogin" icon="el-icon-arrow-left">Back</el-button>
    </div>
    <el-form ref="registerForm" :model="registerForm" class="register-form">
      <el-form-item class="button-container">
        <h2>注册</h2>
      </el-form-item>
      <el-form-item label="Username">
        <el-input v-model="registerForm.username" placeholder="Enter username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="registerForm.password" type="password" placeholder="Enter password"></el-input>
      </el-form-item>
      <el-form-item label="Confirm Password">
        <el-input v-model="registerForm.confirmPassword" type="password" placeholder="Confirm password"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button type="primary" @click="register">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    register() {
      // 在这里执行注册逻辑
      console.log(this.registerForm);
    },
    goToLogin() {
      // 跳转回登陆页面
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register-container {
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
.register-form {
  margin-top: 20px;
}
</style>