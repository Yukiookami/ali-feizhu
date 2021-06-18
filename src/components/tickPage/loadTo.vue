<!--
 * @Author: zxy
 * @Date: 2021-06-18 16:43:04
 * @LastEditTime: 2021-06-18 20:15:07
 * @FilePath: /feizhu/src/components/tickPage/loadTo.vue
-->
<template>
  <transition name="load">
    <div v-if="show">
      <div class="load-mask"></div>

      <div class="load-panel-sec">
        <div class="load-panel">
          <div class="top-sec">
            <h3 :class="{'show-msg': count >= 0}">请确认火车票信息</h3>
            <span class="city-span" :class="{'show-msg': count >= 1}">
              {{info.depCity}}-{{info.tarCity}}
            </span>
            <span :class="{'show-msg': count >= 2}">
              {{nowTime}}
            </span>
            <span :class="{'show-msg': count >= 3}">
              {{info.bango}} {{info.depTime}}发车
            </span>
            <h3 :class="{'show-msg': count >= 4}">乘车人</h3>
            <span v-for="(item, index) in userInfo" :key="`user${index}`"
            :class="{'show-msg': count >= index + 5}">
              {{item.name}}
            </span>
          </div>

          <div class="load-pro-sec">
            <div class="pro-bar" :style="{width: `${barWid}%`}"></div>
            <div class="train-go" :style="{left: `${-34 + barWid}%`}"></div>
          </div>

          <div class="tip-sec">
            <span>正在核验乘车人，请耐心等候...</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, onMounted, reactive, toRefs, watch } from 'vue'
import store from '@/store'

export default {
  props: ['show', 'info', 'userInfo'],
  emits: ['loadOver'],
  setup (props, countext) {
    const state = reactive({
      userInfo: computed(() => {
        return props.userInfo
      }),
      info: computed(() => {
        return props.info
      }),
      nowTime: computed(() => `${store.state.time.time} ${store.state.time.goTime}`),
      barWid: 0,
      count: -1,
      /**
       * @description: 更改进度条
       * @param {*}
       * @return {*}
       */
      changeBarWid: () => {
        let timecount = 0
        let timer = setInterval(() => {
          if (!(timecount % 15)) {
            state.count++
          }

          timecount++
          state.barWid++

          if (state.barWid >= 100) {
            countext.emit('loadOver')
            clearInterval(timer)
          }
        }, 50)
      }
    })

    watch(
      () => props.show,
      show => {
        if (show === true) {
          state.changeBarWid()
        }
      }
    )
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.load-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
}

.load-panel-sec {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;

  .load-panel {
    overflow: hidden;
    background-color: #fff;
    border-radius: 15px;
    width: 100%;

    .top-sec {
      display: flex;
      flex-direction: column;
      height: 188px;
      padding: 10px;

      h3 {
        font-size: 14px;
        margin: 5px 0;
        color: #ccc;
        font-weight: 400;
        transition: all .4s ease-in-out;
        opacity: 0;
        transform: translateY(10px);
      }

      span {
        position: relative;
        display: flex;
        width: 100%;
        font-size: 16px;
        line-height: 30px;
        transition: all .4s ease-in-out;
        opacity: 0;
        color: #3d3d3d;
        transform: translateY(10px);

        &::after {
          content: '';
          position: absolute;
          right: 0;
          top: calc(30px - 22px);
          display: inline-block;
          height: 15px;
          width: 15px;
          background-image: url('../../assets/img/tickPage/loadOk.svg');
          background-size: 100%;
          background-position: center;
          background-repeat: no-repeat;
        }
      }

      .city-span {
        font-size: 20px;
        font-weight: 400;
      }

      .show-msg {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .load-pro-sec {
      position: relative;
      background-color: rgba(0, 0, 0, .1);

      .pro-bar {
        height: 5px;
        background-image: linear-gradient(90deg,#ffeeae,#ffb200);
      }

      .train-go {
        position: absolute;
        top: -8px;
        left: -36%;
        background-image: url('../../assets/img/tickPage/progress.png');
        height: 30px;
        width: 120px;
        background-repeat: no-repeat;
        background-size: 100%;
      }
    }

    .tip-sec {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      height: 50px;
    }
  }
}

// 蒙板进出动画
.load-enter-from,
.load-leave-to {
  opacity: 0;
}

.load-enter-to,
.load-leave-from {
  opacity: 1;
}

.load-enter-active,
.load-leave-active {
  transition: all .3s linear
}
</style>