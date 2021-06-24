<!--
 * @Author: zxy
 * @Date: 2021-06-22 20:15:07
 * @LastEditTime: 2021-06-24 18:49:24
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

      <ari-nav :navList="finAirList"></ari-nav>

      <div class="airport-items-sec">
        <!-- <span class="items-type-title">- 爆款推荐 -</span>
          
        <div class="items-box">
          <template v-for="(item, index) in airList" :key="`airList${index}`">
            <airport-item v-if="index < 4"
            :content="item.content" :type="item.type" :cover="item.cover"
            :money="item.money" :title="item.title" :ps="item.ps" :selled="item.selled"></airport-item>
          </template>
        </div> -->

        <template v-for="(finItem, finIndex) in finAirList" :key="`fin${finIndex}`">
          <!--  v-if="finItem[0] && finIndex" -->
          <span class="items-type-title">- {{finItem[0].type}} -</span>
          
          <!-- v-if="finIndex" -->
          <div class="items-box">
            <template v-for="(item, index) in finItem" :key="`items${index}`">
              <airport-item :id="item.id"
              :content="item.content" :type="item.type" :cover="item.cover"
              :money="item.money" :title="item.title" :ps="item.ps" :selled="item.selled"></airport-item>
            </template>
          </div>
        </template>
      </div>
    </div>

    <button class="yoyaku-button">
      <img src="../../../assets/activity/airport/botton.png" alt="">
      <span>立即预订</span>
    </button>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import ariTitle from './com/title.vue'
import tick from './com/tick.vue'
import ariNav from './com/nav.vue'
import airportItem from './com/airportItem.vue'

export default {
  setup () {
    const { ctx }  = getCurrentInstance()

    const state = reactive({
      // 活动数组
      airList: [],
      // 处理后数据
      finAirList: [],
      /**
       * @description: 获得活动数组 
       * @param {*}
       * @return {*}
       */
      getAirportList: () => {
        ctx.$http.get('/mock/getAirportList').then(res => {
          state.airList = res.data
          state.finAirList = state.getFinCityList(state.airList)
        })
      },
      /**
       * 处理城市数组，分组
       * 
       * @param {array} oldData
       * 
       * @returns {array}
       */
      getFinCityList: oldData => {
        const s = new Set()

        oldData.forEach(ele => {
          s.add(ele.type)
        })

        let newData = Array.from({ length: s.size }, () => [])

        oldData.forEach(ele => {
          let index = [...s].indexOf(ele.type)

          newData[index].push(ele)
        })

        return newData
      },
    })

    onMounted(() => {
      state.getAirportList()
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    ariTitle,
    tick,
    ariNav,
    airportItem
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
    padding-bottom: 50px;

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

  .airport-items-sec {

    .items-type-title {
      display: block;
      font-size: 12px;
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      color: #fff;
    }

    .items-box {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}

.yoyaku-button {
  position: fixed;
  bottom: 0;
  font-size: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0);  
  border: none;

  img {
    width: 100%;
  }

  span {
    width: 100%;
    position: absolute;
    left: 0;
    top: 15px;
  }
}
</style>