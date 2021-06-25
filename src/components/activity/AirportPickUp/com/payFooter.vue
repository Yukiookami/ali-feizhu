<!--
 * @Author: zxy
 * @Date: 2021-06-24 20:46:40
 * @LastEditTime: 2021-06-25 19:18:12
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/payFooter.vue
-->
<template>
  <div class="pay-footer">
    <img class="mise" src="../../../../assets/activity/payPage/footerImg.png" alt="">

    <div class="button-box">
      <div class="button-1">
        加入购物车
      </div>
      <div class="button-2" @click="showPale">
        立即购买
      </div>
    </div>
  </div>

  <pay-pale :show="show" @close="showPale"></pay-pale>
</template>

<script>
import { reactive, toRefs } from 'vue'
import payPale from './payPale.vue'

export default {
  setup () {
    const state = reactive({
      show: false,
      showPale: () => {
        state.show = !state.show 
      }
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    payPale
  }
}
</script>

<style lang="scss" scoped>
.pay-footer {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  bottom: 0;
  height: 46px;
  width: 100%;
  background-color: #fff;

  .mise {
    width: 120px;
    margin-left: 20px;
  }

  .button-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #fff;

    .button-1 {
      background-image: linear-gradient(90deg,#ffd101,#ff9302);
      border-radius: 20px 0 0 20px;
      padding: 10px 20px;
    }

    .button-2 {
      background-image: linear-gradient(90deg,#ff7500,#f35);
      border-radius: 0 20px 20px 0;
      padding: 10px 20px;
      margin-right: 5px;
    }
  }
}
</style>