<!--
 * @Author: zxy
 * @Date: 2021-06-23 18:06:52
 * @LastEditTime: 2021-06-25 19:30:10
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/ariportPay.vue
-->
<template>
  <div class="main-sec">
    <div class="video-sec">
      <img src="../../../assets/activity/payPage/banner.webp" alt="">
    </div>

    <div class="info-box">
      <span class="money">¥<span class="money-span">40-228</span></span>
     
      <div class="logo-box">
        <img src="../../../assets/activity/payPage/payLogo.png" alt="">
        <span>月销 130 笔</span>
      </div>

      <h3 class="info-title">北京机场接机 北京机场送机  北京首都机场 大兴机场接送机服务</h3>

      <div class="hyouka-box">
        <div class="m-box">
          <img src="../../../assets/activity/payPage/like.webp" alt="">
          <span>4.8分 非常好</span>
        </div>

        <div class="m-box">
          <img src="../../../assets/activity/payPage/komento.webp" alt="">
          <span>607条评论</span>
        </div>

        <div class="m-box">
          <img src="../../../assets/activity/payPage/share.webp" alt="">
          <span>分享</span>
        </div>
      </div>
    </div>
  </div>

  <pay-footer></pay-footer>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import payFooter from './com/payFooter.vue'
import { useRoute } from 'vue-router'
import store from '../../../store'

export default {
  setup () {
    const route = useRoute()

    const state = reactive({
      id: computed(() => {
        store.commit('setAirId', route.query.id)
        return route.query.id
      })
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    payFooter
  }
}
</script>

<style lang="scss" scoped>
.main-sec {
  background-color: #f0f0f0;
  min-height: 100vh;

  .video-sec {
    height: 360px;
    width: 100%;
    background-color: #000;

    img {
      width: 100%;
    }
  }

  .info-box {
    background-color: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;

    .money {
      color: rgb(255, 64, 26);
      font-size: 17px;
      font-weight: 800;

      .money-span {
        font-size: 23px;
      }
    }
  }

  .logo-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #919499;
    font-size: 11px;
    margin: 10px 0;
    
    img {
      width: 100px;
    }
  }

  .info-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 23px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 15px;
  }

  .hyouka-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: #919499;
    padding-top: 20px;
    border-top: 1px dashed rgba(0, 0, 0, .1);

    img {
      width: 12px;
      margin-right: 7px;
    }

    .m-box {
      display: flex;
      align-items: center;
    }
  }
}
</style>