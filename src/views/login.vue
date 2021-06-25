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

    <f-massage :msg="msg" :showMidZ="showMidZ"></f-massage>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import fMassage from '../components/common/f-massage'
import router from '../router'
import { buriedPoint } from '../assets/js/common'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const { ctx } = getCurrentInstance()
    const route = useRoute()

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
          const id = route.query.id

          if (id || id === 0) {
            router.push({
              path: '/airportPay',
              query: {
                id
              }
            })
          } else {
            router.push('/pay')
          }
        } else {
          state.msg = '请输入正确用户名密码'
          state.showMidZ = true
          state.password = ''

          setTimeout(() => {
            state.showMidZ = false
          }, 800)
        }

        // 登录埋点
        if (!ctx.$cookie.getCookie("uv_cookies")) {
          let nowDate = new Date()
          let year = nowDate.getFullYear()
          let mon = nowDate.getMonth() + 1
          let day = nowDate.getDate()
          // let time = nowDate.getTime()
          let uvCookies = `${mon}${day}${state.username}`

          let setTime = new Date(year, mon, day)
          // let endTime = setTime.getTime()

          // let timeX = endTime - time
          // let hour = parseInt(timeX / (60 * 60 * 1000) % 24)
          // let min = parseInt(timeX / (60 * 1000) % 60)
          // let sec = parseInt(timeX / 1000 % 60)

          ctx.$cookie.setCookie("uv_cookies", uvCookies, setTime)

          console.log(ctx.$cookie.getCookie("uv_cookies"))

          buriedPoint({
            eventId: 'login',
            userId: state.username
          })
        }
      },
      // 是否显示
      showMidZ: false,
      msg: ''
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    fMassage
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
    outline: none;
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