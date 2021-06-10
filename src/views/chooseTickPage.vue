<template>
  <div class="tick-page">
    <header>
      <tick-header></tick-header>
    </header>

    <section class="main-tick-sec">
      <!-- 火车 -->
      <div class="train-sec" v-if="!nowT">
        <div class="tick-header">
          <img src="../assets/img/tickPage/train.png" alt="">
          <span>{{trainText}}</span>
        </div>

        <div @click="goToBuy(item, nowT)" v-for="(item, index) in tArr" :key="`train${index}`" class="tar-sec-item">
          <div class="top-box">
            <div class="city-box">
              <span class="time-span">{{item.depTime}}</span>
              <span class="city-span">{{item.depCity}}</span>
            </div>

            <div class="all-time-box">
              <span class="bango-span">{{item.bango}}</span>

              <div class="long-line">
                <i class="tan"></i>
                <i class="line"></i>
                <i class="last-tan"></i>
              </div>

              <span class="all-time-span">{{item.allTime}}</span>
            </div>

            <div class="city-box">
              <span class="time-span">{{item.tarTime}}</span>
              <span class="city-span right-city">{{item.tarCity}}</span>
            </div>

            <div class="money-box">
              <span class="money-span">¥{{item.money}}</span>
              <span class="very-small">起</span>
            </div>
          </div>

          <div class="bottom-box">
            <span>二等座:{{item.sen}}</span>
            <span>一等座:{{item.first}}</span>
            <span>无座:{{item.tachi}}</span>
          </div>
        </div>
      </div>
      <!-- 汽车 -->
      <div class="car-sec" v-else-if="nowT === 1">
        <div @click="goToBuy(item, nowT)" v-for="(item, index) in tArr" :key="`car${index}`" class="car-sec-item">
          <div class="left-box">
            <div class="tag-box">
              <span class="tag-item" v-for="(tag, tagIndex) in item.tag" :key="`tag${tagIndex}`">
                {{tag.title}}
                <i class="yajirush"></i>
              </span>
            </div>

            <div>
              <span class="time-span">{{item.depTime}}</span>
              <span class="class-span">首班</span>
            </div>

            <div>
              <span class="time-span">{{item.tarTime}}</span>
              <span class="class-span">末班车</span>
            </div>
          </div>

          <div class="mid-box">
            <div class="mid-top-box">
              <div class="line-box">
                <i class="tan"></i>
                <i class="line"></i>
                <i class="last-tan"></i>
              </div>

              <div class="city-box">
                <span class="city-span">{{item.depCity}}</span>
                <span class="city-span">{{item.tarCity}}</span>
              </div>
            </div>

            <div class="bango-box">
              <img src="../assets/img/tickPage/car.png" alt="">
              <span>{{item.bango}}</span>
            </div>
          </div>

          <div class="right-box">
            <span class="money-span">
              <span class="senbo">¥</span>{{item.money}} 
            </span>

            <span class="nokori">
              {{item.tickKazo}}张
            </span>
          </div>
        </div>
      </div>
      <!-- 船 -->
      <div class="ship-sec" v-else>
        <img src="../assets/img/tickPage/port404.png" alt="">
        <p>因疫情防控需要，航运班线陆续停运，恢复时间另行通知，所有停运班次都将联系您全额退款，请您耐心等待</p>
      </div>
    </section>
  </div>
</template>

<script>
import { getCurrentInstance, reactive, toRefs } from 'vue'
import tickHeader from '../components/tickPage/tickHeader'
import { useRoute } from 'vue-router'
import router from '../router'
import base64 from '../assets/js/base64'
import { buriedPoint } from '../assets/js/common'

export default {
  setup () {
    const route = useRoute()
    const { ctx } = getCurrentInstance()

    const state = reactive({
      // 当前旅行方式
      nowT: 0,
      // 票数组
      tArr: [],
      trainText: '火车票推荐路线',
      /**
       * 获取车票列表
       */
      getAllTick: () => {
        let searchData = JSON.parse(base64.decode(route.query.ticPage))

        state.nowT = searchData.travelMode

        ctx.$http.post(
          '/mock/getTick', 
          searchData
        ).then(res => {
          state.tArr = res.data
        })
      },
      // 跳转页面
      goToBuy: (item, nowT) => {
        // 选票埋点
        buriedPoint({
          eventId: 'chooseTick',
          tickId: item.id
        })

        router.push({
          path: '/buyTick',
          query: {
            info: base64.encode(JSON.stringify(item)),
            nowT: base64.encode(nowT)
          }
        })
      }
    })

    state.getAllTick()
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    tickHeader
  }
}
</script>

<style lang="scss" scoped>
.tick-page {
  background-color: #f4f4f4;
  min-height: 100vh;
  width: 100vw;

  .main-tick-sec {
    padding: 5px 0;
  
    .tick-header {
      font-size: 15px;
      display: flex;
      align-items: center;
      height: 44px;
      width: 100%;
      background-color: #fff;

      img {
        width: 20px;
        margin: 0 15px 0 5px;
      }
    }

    // 火车
    .tar-sec-item {
      background-color: #fff;
      color: #3d3d3d;
      font-size: 20px;
      margin-bottom: 5px;

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
        font-size: 11px;
        color: #3d3d3d;
        padding: 10px;

        span {
          margin-right: 33px;
        }
      }
    }

    // 汽车
    .car-sec-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      color: #3d3d3d;
      font-size: 18px;
      margin-bottom: 5px;
      padding: 10px;

      .left-box {

        .tag-box {
          margin-bottom: 5px;

          .tag-item {
            position: relative;
            padding: 0 6px 0 4px;
            margin-right: 4px;
            font-size: 10px;
            color: #FCA500;
            border: 1px solid #FCE9B8;
  
            .yajirush {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-bottom: 1px solid #e90;
              border-left: 1px solid #e90;
              transform: rotate(-135deg) scale(.5);
              position: absolute;
              top: 0;
              bottom: 0;
              margin: auto;
              right: 0px;
            }
          }
        }

        .time-span {
          font-weight: 700;
          line-height: 24px;
        }

        .class-span {
          font-size: 12px;
          color: #999;
        }
      }

      .mid-box {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .mid-top-box {
          display: flex;
          align-items: center;

          .line-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-right: 8px;
    
            .tan {
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #ccc;
              margin-bottom: 3px;
            }
    
            .line {
              display: block;
              width: 3px;
              height: 16px;
              background-color: rgba(0, 0, 0, .1);
            }
    
            .last-tan {
              display: block;
              width: 7px;
              height: 7px;
              border-radius: 50%;
              border: 1px solid #ccc;
              margin-top: 3px;
            }
          }
        }

        .city-box {
          display: flex;
          flex-direction: column;
          font-size: 15px;
          line-height: 28px;
        }

        .bango-box {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #999;
          margin-top: 5px;

          img {
            width: 12px;
            margin-right: 5px;
          }
        }
      }

      .right-box {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .money-span {
          display: block;
          margin: 2px 0;
          color: #ff5000;
        }

        .senbo {
          font-size: 12px;
        }

        .nokori {
          font-size: 12px;
          color: #999;
        }
      }
    }

    // 船
    .ship-sec {
      padding: 100px 0 0 0;
      height: calc(100vh - 50px);
      box-sizing: border-box;
      font-size: 14px;
      white-space: pre-wrap;
      color: rgb(153, 153, 153);
      line-height: 5.6vw;
      text-align: center;

      img {
        width: 200px;
      }
    }
  }
}

</style>