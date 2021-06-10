<template>
  <div class="tick-sec">
    <!-- 火车票票头 -->
    <div class="train-sec" v-if="!nowT">
      <div class="tar-sec-info">
        <div class="top-box">
          <div class="city-box">
            <span class="city-span">{{info.depCity}}</span>
            <span class="time-span">{{info.depTime}}</span>
          </div>

          <div class="all-time-box">
            <span class="bango-span">{{info.bango}}</span>

            <div class="long-line">
              <i class="tan"></i>
              <i class="line"></i>
              <i class="last-tan"></i>
            </div>

            <span class="all-time-span">{{info.allTime}}</span>
          </div>

          <div class="city-box">
            <span class="city-span right-city">{{info.tarCity}}</span>
            <span class="time-span">{{info.tarTime}}</span>
          </div>
        </div>

        <router-link to="/pay" 
        class="bottom-box">
          <div>
            <img src="../assets/img/tickPage/waring.png" alt="">
            <span>退票、改签低价票有手续费</span>
          </div>

          <div class="canle">
            <span>购票退改须知</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 汽车 -->
    <div v-if="nowT === 1">
      <div v-for="(item, index) in tickArr" :key="`car${index}`" class="car-sec">
        <div class="cover-box">
          <img class="cover-img" :src="item.cover" alt="">
          <span class="cover-title">{{item.title}}</span>
        </div>

        <div class="car-item">
          <div class="item-top">
            <div class="left">
              <div class="time-box">
                <f-choose-time showModel="1" noColor="1" noAji="1"></f-choose-time>
                <span>{{info.depTime}}</span>-<span>{{info.tarTime}}</span>乘车
              </div>

              <div class="city-box">
                <span>{{info.depCity}}</span>
                <i class="goto"></i>
                <span>{{info.tarCity}}</span>
              </div>
            </div>

            <div class="right">
              <img src="../assets/img/tickPage/map.svg" alt="">
              <span>地图</span>
            </div>
          </div>

          <div class="item-bottom">
            <div>
              <div class="ok"></div>
              <span>可在线退票</span>
            </div>

            <div>
              <div class="ok"></div>
              <span>服务须知</span>
            </div>

            <div class="need-know">
              <span>预定须知</span> 
              <img src="../assets/img/tickPage/ajirush.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 购票 -->
    <div class="buy-tick-sec" v-if="!nowT">
      <div class="time-header">
        <f-choose-time showModel="1" noColor="1" noAji="1"></f-choose-time>
      </div>

      <div class="tar-tick-box">
        <div class="tick-item" v-for="(item, index) in tickArr" :key="`t${index}`">
          <span class="name-span">{{item.name}}</span>
          <span class="has-span">{{item.has}}</span>
          <div class="money">
            <span>
              <span class="senbo">¥</span>{{item.money}}
            </span>

            <router-link class="lon-button" to="/pay" @click.prevent="goTo">
              立即预定
            </router-link>
          </div>
        </div>
      </div>

    </div>

    <div v-if="nowT === 1">
      <div v-for="(item, index) in tickArr" :key="`buyCar${index}`"
      class="buy-tick-car">
        <div class="left">
          <span>{{item.tickTitle}}</span>
          <p>{{item.content}}</p>
        </div>

        <div class="right">
          <span>
            <span class="senbo">¥</span>{{item.money}}
          </span>

          <router-link class="buy" to="/pay" @click.prevent="goTo">
            立即预定
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import base64 from '../assets/js/base64'
import fChooseTime from '../components/common/f-choose-time'
import store from '@/store'
import router from '../router'
import { buriedPoint } from '../assets/js/common'

export default {
  props: [],
  setup () {
    const route = useRoute()
    const { ctx } = getCurrentInstance()

    const state = reactive({
      // 票数据
      tickArr: [],
      // 当前模式
      nowT: 0,
      // 票体信息
      info: {},
      // 获取当前页面数据
      getData: () => {
        let nowT = JSON.parse(base64.decode(route.query.nowT))
        let info = JSON.parse(base64.decode(route.query.info))

        ctx.$http.post('/mock/getTickInfo', {
          id: info.id,
          nowT: nowT
        }).then(res => {
          state.tickArr = res.data
        })

        state.nowT = nowT
        state.info = info
        store.commit('setTickMode', nowT)
        store.commit('setTickInfo', info)
      },
      // 跳转购票界面
      goTo: () => {
        // 购票埋点
        buriedPoint({
          eventId: 'buyTick',
          buyTickId: state.info.id
        })

        router.push({
          path: '/pay'
        })
      }
    })

    state.getData()
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    fChooseTime
  }
}
</script>

<style lang="scss" scoped>
// 总区域
.tick-sec {
  background-color: #f2f3f4;
  min-height: calc(100vh - 20px);
  width: calc(100vw - 20px);
  padding: 10px;

  // 火车
  .tar-sec-info {
    overflow: hidden;
    background-color: #fff;
    color: #3d3d3d;
    font-size: 20px;
    margin-bottom: 5px;
    border-radius: 5px;
  
    .top-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #f4f4f4;
      border-bottom: 1px dashed #f4f4f4;
      padding: 10px;
  
      .city-box {
        display: flex;
        flex-direction: column;
        font-weight: 800;
  
        .city-span {
          font-size: 14px;
          font-weight: normal;
        }
  
        .right-city {
          text-align: end;
        }
      }
  
      .all-time-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
  
        .bango-span {
          font-size: 12px;
        }
  
        .long-line {
          display: flex;
          align-items: center;
          
          .tan {
            display: block;
            width: 8px;
            height: 8px;
            background-color: #e0e0e0;
            border-radius: 50%;
          }
  
          .line {
            display: block;
            width: 43px;
            height: 2px;
            background-color: #e0e0e0;
            margin: 6px 2px;
          }
  
          .last-tan {
            display: block;
            width: 7px;
            height: 7px;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 50%;
          }
        }
  
        .all-time-span {
          font-size: 14px;
        }
      }
  
      .money-box {
        height: 44px;
  
        .money-span {
          color: #ff5000;
        }
  
        .very-small {
          font-size: 12px;
          color: #a5a5a5;
          margin-left: 3px;
        }
      }
    }
  
    .bottom-box {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #666;
      padding: 15px;
      background-color: #fffdf6;
      text-decoration: none;
  
      img {
        width: 14px;
        margin-right: 5px;
      }

      div {
        display: flex;
        align-items: center;
      }

      .canle {
        position: relative;
        color: #fca500;

        &::after {
          content: '';
          display: block;
          background-image: url('../assets/img/tickPage/ajirush.svg');
          background-size: 100%;
          height: 13px;
          line-height: 13px;
          width: 13px;
        }
      }
    }
  }

  // 汽车
  .car-sec {

    .cover-box {
      position: relative;
      margin: -10px;
      z-index: 0;

      img {
        width: 100%;
      }
      
      .cover-title {
        position: absolute;
        bottom: 30px;
        font-size: 16px;
        left: 10px;
        color: #fff;
        // z-index: 1;
      }
    }

    .car-item {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;
      margin-top: -20px;
      z-index: 1;

      .item-top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
          display: flex;
          flex-direction: column;
          color: #333;

          .time-box {
            display: flex;
            align-items: center;
            font-size: 14px;
          }

          .city-box {
            display: flex;
            align-items: flex-end;
            font-size: 16px;
            font-weight: 700;

            .goto {
              background-image: url('../assets/img/tickPage/goto.svg');
              background-size: 18px 6px;         
              width: 18px;
              height: 6px;
              margin: 6px 3px 3px;
            }
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          color: #fca500;
          text-align: center;
          width: 25px;

          img {
            width: 70%;
            margin-bottom: 5px;
          }
        }
      }

      .item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #666;
        font-size: 13px;
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, .1);

        div {
          display: flex;
          align-items: center;
        }

        .ok {
          background-image: url('../assets/img/tickPage/ok.svg');
          background-size: 12px 12px;
          width: 12px;
          height: 12px;
          background-repeat: no-repeat;
          padding-right: .1466666667rem;
        }

        .need-know {
          color: #f6a200;

          img {
            width: 12px;
            margin-left: 5px;
          }
        }
      }
    }
  }

  // 选票
  .buy-tick-sec {
    background-color: #fff;
    border-radius: 5px;
    width: 100%;

    .time-header {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .tar-tick-box {
      padding: 10px;

      .tick-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .name-span {
          font-size: 15px;
        }

        .has-span {
          font-size: 13px;
        }        
      } 

      .money {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #ff5000;

        .senbo {
          font-size: 12px;
        }

        .lon-button {
          margin: 10px 0 10px 10px ;
          text-decoration: none;
          color: #FFFFFF;
          background-image: linear-gradient(90deg,#FF9300,#FF3355);
          display: inline-block;
          width: 70px;
          height: 28px;
          line-height: 29px;
          border-radius: 3px;
          font-size: 13px;
          box-sizing: border-box;
          padding: 0 4px;
          text-align: center;
        }
      }
    }
  }

  // 汽车选票
  .buy-tick-car {
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;

    .left {
      width: 75%;
      
      span {
        font-size: 15px;
        color: #333;
        font-weight: 700;
      }

      p {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #F84E00;
      font-size: 18px;

      .senbo {
        font-size: 12px;
      }

      .buy {
        text-decoration: none;
        background-image: linear-gradient(to top left,#ff5100,orange);
        font-size: 13px;
        color: #fff;
        line-height: 30px;
        font-weight: 700;
        text-align: center;
        border-radius: 15px;
        padding: 0 9px;
        font-weight: normal;
        margin-top: 5px;
      }
    }
  }
}
</style>