<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="image-center">
        <img src="/static/images/book.png" alt="图书销售管理系统" />
      </div>

      <div class="sign-text">
        <span>{{ title }}</span>
      </div>

      <el-form-item>
        <span>请输入用户名：</span>
        <el-input name="username" type="text" v-model="loginForm.username" placeholder="用户名" autoComplete="on" clearable />
      </el-form-item>

      <el-form-item>
        <span>请输入密码：</span>
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" placeholder="密码" v-model="loginForm.password" autoComplete="on" clearable />
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin" :loading="loading">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      title: '图 书 销 售 管 理 系 统',
      loading: false,
      loginForm: {
        username: null,
        password: null
      }
    }
  },
  created () {
    // if (this.getCookie('admin') != null) {
    //   this.$router.replace({path: '/dashboard/CustomerService'})
    // }
  },
  methods: {
    handleLogin () {
      this.loading = true
      this.$http.post('/api/user/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then((res) => {
        // console.log(res.data)
        this.loading = false
        if (res.status === 200 && res.data.status === true) {
          // let expireDays = 1000 * 60 * 60
          this.$router.push({path: '/Dashboard/CustomerService'})
          // this.setCookie(this.loginForm.username, this.loginForm.password, expireDays)
          this.$message({
            type: 'success',
            message: res.data.message
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width : 100%;
    background-size: cover;
  }

  .login-form{
    position: absolute;
    border-radius: 10px;
    left: 0;
    right: 0;
    width: 400px;
    background-color: rgba(0,0,0,0.05);
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .el-form-item {
    border: 1px solid rgba(211, 55, 55, 0.1);
    background: rgba(0,0,0,0.05);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item span{
    display: block;
    width: 100px;
    font-size: 10px;
    line-height: 2em;
    text-align: left;
    padding-left: 5px;
  }

  .el-input {
    display: block;
    height: 47px;
    width: 100%;
  }

  .image-center {
    clear: right;
    text-align: center;
  }
  .image-center img{
    width: 100px;
    height: 100px;
  }
  .err-font{
    text-align: left;
    color: rgb(255, 80, 74);
    font-size: 12px;
    line-height: 1.5;
    margin-top: -22px;
    margin-bottom: 0px;
    position: absolute;
  }

  .sign-text{
    color: #777;
    display: block;
    font-size: 15px;
    font-style: normal;
    position: relative;
    text-align: center;
    margin-bottom: 10px;
  }
</style>
