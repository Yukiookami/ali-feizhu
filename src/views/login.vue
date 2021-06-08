<template>
  <div class="login-page">
    <img class="" src="../assets/img/login/logo.png" alt="">

    <div class="input-box">
      <input type="text" class="fm-text" v-model="username" placeholder="手机号/邮箱/会员名">
    </div>

    <div class="input-box">
      <input type="password" class="fm-text" v-model="password" placeholder="请输入登录密码">
    </div>

    <button class="login-button" @click="login">登录</button>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import router from '../router'

export default {
  setup () {
    const { ctx } = getCurrentInstance()

    const state = reactive({
      username: '',
      password: '',
      /**
       * 登录，点击触发
       * 
       * @event
       */
      login: () => {
        if (state.username === 'admin' && state.password === '123') {
          ctx.$cookie.setCookie("login_cookies", state.username, 60 * 60 * 24)

          router.push('/pay')
        }
      }
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  width: 100vw;

  img {
    width: 100px;
  }

  .login-button {
    width: 70%;
    background: -webkit-linear-gradient(left,#ff9000,#ff5000) no-repeat;
    color: #fff;
    box-shadow: 0 2px 4px #f7c7b1;
    height: 45px;
    border-radius: 35px;
    margin-top: 40px;
    font-size: 16px;
    border: none;
  }

  .input-box {
    border-bottom: 1px solid #ff5000;
    margin: 40px 0 0;
    width: 80%;

    .fm-text {
      outline: none;
      width: 100%;
      border: 0;
      padding-left: 5px;
      font-size: 16px;
      color: #333;
      height: 30px;
    }
  }
}
</style>