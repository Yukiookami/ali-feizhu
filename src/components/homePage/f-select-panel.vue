<template>
  <section class="f-sel-pan-main" :class="{'go-bottom': navList}">
    <nav class="nav-list-sec" v-if="navList">
      <span v-for="(item, index) in navList" :key="`navList${index}`" :ref="titleSpan"
      :style="{'--index': navList.length}" :class="{'selected': index === selectedNum}"
      @click="changeSelectedNum(index)">
        {{item.title}}
        <f-hot v-if="index === 1" :hotTag="'Hot'"></f-hot>
        <f-hot v-else-if="index === 2" :hotTag="'New'"></f-hot>
      </span>

      <div class="select-box" :style="{'--left': left}">
        <span class="select-box-line"></span>
      </div>
    </nav>

    <div class="f-sel-choose-sec">
      <!-- 0城市，1景点，2港口 -->
      <f-choose-city :city="depCity" saveValue="setDepCity"
      v-if="!nowTravelMode"></f-choose-city>
      <f-choose-attr :arrt="depArrt" saveValue="setDepArrt"
      v-else-if="nowTravelMode === 1"></f-choose-attr>
      <f-choose-port :port="depPort" saveValue="setDepPort"
      v-else></f-choose-port>

      <div class="f-sel-ring">
        <img :src="nowIcon" alt="">
      </div>

      <f-choose-city :city="targetCity" saveValue="setTargetCity"
      v-if="!nowTravelMode"></f-choose-city>
      <f-choose-attr :arrt="targetCityAttr" saveValue="setTargetArrt"
      v-else-if="nowTravelMode === 1"></f-choose-attr>
      <f-choose-port :port="targetCityPort" saveValue="setTargetPort"
      v-else></f-choose-port>
    </div>

    <f-choose-time></f-choose-time>

    <div class="f-sel-cond-box" v-if="conditonList">
      <f-condition-button v-for="(ele, index) in conditonList" :index="index" @changeCheck="changeCheck"
      :key="`cond${index}`" :condition="ele.cond" :checked="ele.checked"></f-condition-button>
    </div>

    <button class="search-button">{{buttonText}}</button>

    <div class="flypig-logo">
      <img src="../../assets/img/pageCover/feizhu-logo.png" alt="">
    </div>
  </section>
</template>

<script>
import fChooseTime from '../common/f-choose-time'
import fChooseCity from '../common/f-choose-city'
import fChoosePort from '../common/f-choose-port'
import fChooseAttr from '../common/f-choose-attr'
import fConditionButton from './f-condition-button'
import fHot from '../common/f-hot'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { computed, onBeforeUpdate, onMounted } from '@vue/runtime-core'
import store from '@/store'

export default {
  // nav数组（可选）,条件限制（可选），图标，出行方式
  props: ['navList', 'conditonList', 'icon', 'travelMode'],
  emits: ['changeCheck', 'setSelectedNum'],
  setup (props, cxt) {
    const state = reactive({
      // 当前选中目录
      selectedNum: 0,
      /**
       * 更改目录，点击触发
       * @event
       * 
       * @param {number} index
       */
      changeSelectedNum: index => {
        cxt.emit('setSelectedNum', index)
        state.selectedNum = index
        state.setLeft(index)
      },
      // 伪元素偏移量
      left: "0px",
      /**
       * 设置伪元素偏移
       * 
       * @param {number} index 
       */
      setLeft: index => {
        state.left = `${titleSpanArr[index].offsetLeft}px`
      },
      // 设置icon
      nowIcon: computed(() => {

        if (props.navList) {
          return props.navList[state.selectedNum].icon
        } else {
          return props.icon
        }
      }),
      // 设置旅行方式
      nowTravelMode: computed(() => {
        if (props.navList) {
          return +props.navList[state.selectedNum].travelMode
        } else {
          return +props.travelMode
        }
      }),
      // button文字
      buttonText: '开始搜索',
      // 改变条件状态
      changeCheck: index => {
        cxt.emit('changeCheck', index)
      },
      // 出发（城市）
      depCity: computed(() => {
        if (store.state.depCity) {
          return store.state.depCity
        } 

        return '选择出发'
      }),
      // 到达（城市）
      targetCity: computed(() => {
        if (store.state.targetCity) {
          return store.state.targetCity
        } 

        return '选择到达'
      }),
      // 出发（景点）
      depArrt: computed(() => {
        if (store.state.depArrt) {
          return store.state.depArrt
        } 

        return '选择出发'
      }),
      // 到达（景点）
      targetArrt: computed(() => {
        if (store.state.targetArrt) {
          return store.state.targetArrt
        } 

        return '选择到达'
      }),
      // 出发（港口）
      depPort: computed(() => {
        if (store.state.depPort) {
          return store.state.depPort
        } 

        return '选择出发'
      }),
      // 到达（港口）
      targetPort: computed(() => {
        if (store.state.targetPort) {
          return store.state.targetPort
        } 

        return '选择到达'
      })
    })


      let titleSpanArr = []
      // 获得锚点元素
  
      const titleSpan = ref((e) => {
          if (e) {
            titleSpanArr.push(e)
          }
      })

      onBeforeUpdate (() => {
        titleSpanArr = []
      })

      onMounted(() => {
        if (props.navList){
          state.setLeft(state.selectedNum)
        }
      })
    

    return {
      ...toRefs(state),
      titleSpan
    }
  },
  components: {
    fChooseTime,
    fChooseCity,
    fChoosePort,
    fChooseAttr,
    fConditionButton,
    fHot
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
$ring-w: 32px;
$button-h: 42px;
// $navIndex: var(--index);
$border-r: 10px;
$left: var(--left); 

.f-sel-pan-main {
  // overflow: hidden;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  margin: 4vw;
  padding: 20px 6vw 5px;
  background-color: $wite-color;
  border-radius: $border-r;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);

  .nav-list-sec {
    overflow: hidden;
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 0;
    background-color: $g-nav-color;
    border-top-left-radius: $border-r;
    border-top-right-radius: $border-r;
    color: $bl-d-color;
    font-size: 14px;
    height: 39px;
    width: 100%;

    span {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      // width: (100% / $navIndex);
      width: calc(100% / var(--index));
      height: 100%;
      z-index: 1;
      transition: all .3s;
    }

    .selected {
      font-weight: 800;
    }

    .select-box {
      position: absolute;
      top: 0;
      left: $left;
      height: 100%;
      width: calc(100% / 3);
      background-color: $wite-color;
      border-top-left-radius: $border-r;
      border-top-right-radius: $border-r;
      transition: all .3s;

      $b-w: 11px;

      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        right: -$b-w;
        width: $b-w;
        height: $b-w;
        background-image: url('../../assets/img/homePage/nav-list-back.png');
        background-size: 100%;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: -$b-w;
        width: $b-w;
        height: $b-w;
        transform: rotate(-90deg);
        background-image: url('../../assets/img/homePage/nav-list-back.png');
        background-size: 100%;
      }

      .select-box-line {
        position: absolute;
        display: block;
        left: 50%;
        width: 20px;
        height: 3px;
        border-radius: 10px;
        background-color: $yel-color;
        transform: translateX(-50%);
        bottom: 0px;
      }
    }
  }

  .f-sel-choose-sec {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .f-sel-ring {
      display: flex;
      justify-content: center;
      align-items: center;
      width: $ring-w;
      height: $ring-w;
      background: no-repeat 50% url('../../assets/img/homePage/ring.png');
      background-size: contain;

      img {
        width: 60%;
      }
    }
  }

  .f-sel-cond-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
  }

  .search-button {
    border-radius: $button-h;
    color: $bl-color;
    width: 100%;
    height: $button-h;
    line-height: $button-h;
    font-size: 17px;
    text-align: center;
    background-color: $yel-color;
    border: none;
    margin: 10px 0 30px;
  }

  .flypig-logo {
    width: 100%;

    img {
      width: 100%;
    }
  }
}

.go-bottom {
  padding-top: 50px;
}
</style>