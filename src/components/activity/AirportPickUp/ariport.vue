<!--
 * @Author: zxy
 * @Date: 2021-06-22 20:15:07
 * @LastEditTime: 2021-06-23 23:30:38
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/ariport.vue
-->
<template>
  <div class="airport-sec">
    <img class="banner" src="../../../assets/activity/airport/banner.webp" alt="">

    <div class="content-sec">
      <ari-title title="接送补贴更给力"></ari-title>
      <div class="tick-box">
        <tick money="5" type="境内接送券" line="满50元可减"></tick>
        <tick money="20" type="境内接送券" line="满100元可用"></tick>
      </div>

      <img class="img-nm" src="../../../assets/activity/airport/kokoku.webp" alt="">

      <ari-title title="您也可以选择"></ari-title>

      <div class="kokoku-box">
        <img src="../../../assets/activity/airport/kokoku-s-l.webp" alt="">

        <img src="../../../assets/activity/airport/kokoku-s-r.webp" alt="">
      </div>

      <ari-title title="更多推荐"></ari-title>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import ariTitle from './com/title.vue'
import tick from './com/tick.vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    ariTitle,
    tick
  }
}
</script>

<style lang="scss" scoped>
.img-nm {
  width: 100%;
}

.airport-sec {
  background-color: rgb(253, 217, 158);

  .banner {
    width: 100%;
  }

  .content-sec {

    .tick-box {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }

    .kokoku-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;

      img {
        width: 49.5%;
      }
    }
  }
}
</style>