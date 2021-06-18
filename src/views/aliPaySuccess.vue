<!--
 * @Author: zxy
 * @Date: 2021-06-18 20:05:45
 * @LastEditTime: 2021-06-18 20:24:02
 * @FilePath: /feizhu/src/views/aliPaySuccess.vue
-->
<template>
  <div class="pay-success">
    <img src="../assets/img/alipay/logo-maru.svg" alt="">
    <span>支付成功</span>

    <div class="money-box">
      <span>¥</span>
      <span class="money-span">{{money}}</span>
    </div>

    <div class="info-box">
      <span class="title-box">付款方式</span>
      <span>建设银行储蓄卡</span>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const route = useRoute()

    const state = reactive({
      money: computed(() => route.query.money),
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-success {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
  height: 100vh;
  width: 100vw;

  img {
    width: 60px;
    margin-bottom: 10px;
  }

  span {
    color: #06B4FD;
    font-size: 24px;
  }

  .money-box {
    margin-top: 40px;

    span {
      color: #333;
    }

    .money-span {
      font-size: 40px;
      margin-left: 5px;
    }
  }

  .info-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 60px auto 0;
    width: calc(100% - 40px);

    span {
      color: #333;
      font-size: 14px;
    }

    .title-box {
      color: #999;
    }
  }
}
</style>