<!--
 * @Author: zxy
 * @Date: 2021-06-25 17:54:34
 * @LastEditTime: 2021-06-25 19:44:29
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/payPale.vue
-->
<template>
  <transition name="mask" @click="close">
    <div class="mask" v-if="show"></div>
  </transition>

  <transition name="panel">
    <div class="main-pale" v-if="show">
      <div class="top-box">
        <div class="img-box">
          <img src="../../../../assets/activity/payPage/banner.webp" alt="">
        </div>

        <div class="info-box">
          <span class="money">¥ {{money}}</span>

          <span>已选: "{{level}}" "{{type}}"</span>
        </div>
      </div>

      <div class="content-box">
        <h3 class="content-title">车型等级</h3>

        <span class="check" v-for="(item, index) in levelList" :key="`level${index}`"
        @click="changeLevel(index)" :class="{'checked': index === levelIndex}">
          {{item.level}}
        </span>

        <h3 class="content-title">套餐类型</h3>

        <span class="check" v-for="(item, index) in typeList" :key="`type${index}`"
        @click="changeType(index)" :class="{'checked': index === typeIndex}">
          {{item.type}}
        </span>

        <div class="num-sec">
          <h3 class="content-title">购买数量</h3>

          <div class="buy-sec">
            <span>库存{{have}}件</span>

            <div class="buy-box">
              <span @click="add(1)">-</span>
              <span class="number-box">{{buyNum}}</span>
              <span @click="add()">+</span>
            </div>
          </div>
        </div>
      </div>

      <div class="pay-button" @click="pay">立即购买</div>
    </div>
  </transition>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import router from '../../../../router'

export default {
  props: ['show'],
  emits: ['close'],
  setup (props, context) {
    const state = reactive({
      money: computed(() => 
        state.buyNum * (state.levelList[state.levelIndex].money + state.typeList[state.typeIndex].money)
      ),
      level: computed(() => 
        state.levelList[state.levelIndex].level
      ),
      type: computed(() => 
        state.typeList[state.typeIndex].type
      ),
      buyNum: 1,
      have: 5,
      levelList: [
        {
          level: "舒适五座",
          money: 40
        },
        {
          level: "舒适七座",
          money: 70
        }
      ],
      typeList: [
        {
          type: "市区单程",
          money: 40
        },
        {
          type: "郊区单程",
          money: 70
        },
        {
          type: "20KM内特惠",
          money: 20
        }
      ],
      levelIndex: 0,
      changeLevel: (index) => {
        state.levelIndex = index
      },
      typeIndex: 0,
      changeType: index => {
        state.typeIndex = index
      },
      add: (flag) => {
        if (flag) {
          !(state.buyNum - 1) ? null : state.buyNum--
        } else {
          state.buyNum + 1 > state.have ? null : state.buyNum++
        }
      },
      close: () => {
        context.emit('close')
      },
      pay: () => {
        router.push({
          path: '/aliPayPage',
          query: {
            money: state.money,
          }
        })
      }
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, .5);
}

.main-pale {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 540px;
  width: calc(100% - 20px);
  z-index: 1000;
  border-radius: 10px 10px 0 0;
  padding: 10px;

  .top-box {
    display: flex;
    margin: 10px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    
    .img-box {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    
    .info-box {
      display: flex;
      flex-direction: column;
      font-size: 11px;
      padding-left: 20px;

      .money {
        color: #FF5000;
        font-size: 14px;
        font-weight: 500;
        line-height: 30px;
      }
    }
  }


  .content-box {

    .content-title {
      font-size: 14px;
      color: #3d3d3d;
      margin: 0;
    }

    .check {
      display: inline-block;
      margin-left: 5px;
      margin-bottom: 10px;
      max-width: 27em;
      border-radius: 20px;
      text-align: left;
      font-size: 12px;
      background: #f7f8fa;
      padding: 9px 15px;
      white-space: pre-wrap;
    }

    .checked {
      background: #fd0;
    }

    .num-sec {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      margin-top: 10px;

      .buy-sec {
        display: flex;
        align-items: center;
        color: #999;

        .buy-box {
          margin-left: 5px;

          span {
            display: inline-block;
            border: 1px solid rgba(0, 0, 0, .2);
            padding: 3px 5px;
            color: #FCA500;
          }

          .number-box {
            padding: 3px 10px;
            border-left: none;
            border-right: none;
            color: #3d3d3d;
            width: 15px;
            text-align: center;
          }
        }
      }
    }
  }

  .pay-button {
    position: fixed;
    bottom: 10px;
    background-image: linear-gradient(90deg,#fe6614,#fe4045);
    background-size: cover;
    color: #fff;
    font-size: 13px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    height: 35px;
    line-height: 35px;
    border-radius: 40px;
  }
}

// 蒙板进出动画
.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.mask-enter-to,
.mask-leave-from {
  opacity: 1;
}

.mask-enter-active,
.mask-leave-active {
  transition: all .3s linear
}

// 面板进出动画
.panel-enter-from,
.panel-leave-to {
  transform: translateY(100vw);
}

.panel-enter-to,
.panel-leave-from {
  transform: translateY(0);
}

.panel-enter-active,
.panel-leave-active {
  transition: all .3s linear
}
</style>