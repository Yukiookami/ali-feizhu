<!--
 * @Author: zxy
 * @Date: 2021-06-18 17:55:06
 * @LastEditTime: 2021-06-18 20:12:34
 * @FilePath: /feizhu/src/views/aliPay.vue
-->
<template>
  <header class="pay-header">
    <div class="back-button"></div>

    <div class="logo-box">
      <img class="alipay-icon" src="../assets/img/alipay/logo.png" alt="">
      <span>支付宝付款</span>
    </div>

    <div class="help"></div>
  </header>

  <div class="money-box">
    <span>¥</span>
    <span class="pay-money">{{money}}</span>
  </div>

  <div class="info-sec">
    <div class="info-box">
      <span class="title-box">订单信息</span>
      <span>淘宝合并交易共2笔</span>
    </div>
    <div class="info-box">
      <span class="title-box">支付宝账号</span>
      <span>107***@qq.com</span>
    </div>
    <div class="info-box">
      <span class="title-box">付款方式</span>
      <span>建设银行储蓄卡</span>
    </div>
  </div>

  <button @click="changePass" class="ok-button">确认付款</button>

  <img class="footer-text" src="../assets/img/alipay/footer-text.png" alt="">

  <transition name="pay">
    <div v-if="nowPass">
      <div class="mask"></div>

      <div class="input-sec">
        <div class="input-box">
          <span>输入支付密码</span>
          <input-password :money="money"></input-password>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import inputPassword from '../components/aliPayPage/inputPassword.vue'

export default {
  setup () {
    const route = useRoute()

    const state = reactive({
      money: computed(() => route.query.money),
      nowPass: false,
      changePass: () => {
        state.nowPass = true
      }
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    inputPassword
  }
}
</script>

<style lang="scss" scoped>
.pay-header {
  font-size: 18px;
  color: #333333;
  display: flex;
  padding: 0 10px;
  height: 50px;
  width: calc(100% - 20px);
  justify-content: space-between;
  align-items: center;

  .back-button {
    border-bottom: none;
    border-right: none;
    background-image: url('../assets/img/alipay/goback.png');
    width: 11px;
    height: 20px;
    transform: none;
    background-size: contain;
  }

  .logo-box {
    display: flex;
    align-items: center;

    .alipay-icon {
      margin-right: 4px;
      width: 22px;
    }  

    span {
      font-weight: 600;
    }
  }

  .help {
    width: 36px;
    height: 36px;
    background-image: url('../assets/img/alipay/help.png');
    background-position: 10px 10px;
    background-size: 18px 18px;
    background-repeat: no-repeat;
  }
}

.money-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;

  span {
    font-size: 30px;
    margin-right: 6px;
  }

  .pay-money {
    word-break: break-all;
    line-height: 1;
    font-size: 45px;
    color: #333;
    line-height: 42px;
    margin-bottom: 5px;
  }
}

.info-sec {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: #333;
  font-weight: 400;
  margin: 30px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  padding-bottom: 20px;

  .info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .title-box {
      color: #999999;
    }
  }
}

.ok-button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: none;
  background: #1677FF;
  color: #fff;
  font-weight: 200;
  font-size: 18px;
  border-radius: 5px;
  margin: 20px auto 0;
  width: calc(100% - 20px);
}

.footer-text {
  position: absolute;
  bottom: 20px;
  transform: translateX(-50%);
  left: 50%;
  width: 100px;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}

.input-sec {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  // align-items: center;
  padding: 140px 10px 10px;

  .input-box {
    background-color: #fff;
    border-radius: 15px;
    height: 200px;
    width: 100%;
    text-align: center;
    padding: 10px;

    span {
      display: block;
      margin: 10px auto 40px;
      font-size: 27px;
      color: #333333;
      line-height: 33px;
      font-weight: 100;
    }
  }
}

// 蒙板进出动画
.pay-enter-from,
.pay-leave-to {
  opacity: 0;
}

.pay-enter-to,
.pay-leave-from {
  opacity: 1;
}

.pay-enter-active,
.pay-leave-active {
  transition: all .3s linear
}
</style>