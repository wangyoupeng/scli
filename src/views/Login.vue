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
  import crypto from 'crypto';
  import getSocket from '../libs/socket'
  import { mapState, mapGetters, mapMutations } from 'vuex'
  // 加密函数
  function encryptText(username,password) {
    let secretKey = username + 'bawei'
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapState(['count']),  // 使用数组方式
  },
  methods: {
    ...mapGetters(['getSocket']),
    ...mapMutations(['setSocket']),
    login() {
      // 在这里执行登陆逻辑
      let username = this.loginForm.username
      let pwd = this.loginForm.password
      let pwdd = encryptText(username, pwd)
      this.$axios.post('/api/login', {
        username, pwd: pwdd
      }).then((res) => {
        if(res.data && res.data.message == "ok"){
          if(res.data.token) localStorage.setItem('token', res.data.token)
          if(res.data.tokenExp) localStorage.setItem('tokenExp', res.data.tokenExp)
          if(res.data.refreshToken) localStorage.setItem('refreshToken', res.data.refreshToken)
          if(res.data.refreshTokenExp) localStorage.setItem('refreshTokenExp', res.data.refreshTokenExp)
          if(res.data.userInfo) localStorage.setItem('userInfo', res.data.userInfo)
          console.log("userInfo:::", res.data.userInfo)
          this.$message.success('登录成功')
            setTimeout(() => {
              // 跳转
              this.$router.push('/goods')
              // 初始化socket
              
              let socket = getSocket()
              this.setSocket(socket)
            }, 200);
        } else {
          this.$message.error(res.data.message)
        }
      });
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