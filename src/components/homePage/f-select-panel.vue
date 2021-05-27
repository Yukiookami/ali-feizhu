<template>
  <section class="f-sel-pan-main">
    <nav v-if="navList"></nav>

    <div class="f-sel-choose-sec">
      <!-- 0城市，1景点，2港口 -->
      <f-choose-city :city="depCity" v-if="!travelMode"></f-choose-city>
      <f-choose-attr v-else-if="travelMode === 1"></f-choose-attr>
      <f-choose-port v-else></f-choose-port>

      <div class="f-sel-ring">
        <img :src="icon" alt="">
      </div>

      <f-choose-city :city="targetCity" v-if="!travelMode"></f-choose-city>
      <f-choose-attr v-else-if="travelMode === 1"></f-choose-attr>
      <f-choose-port v-else></f-choose-port>
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
import { reactive, toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import store from '@/store'

export default {
  // nav数组（可选）,条件限制（可选），图标，出行方式
  props: ['navList', 'conditonList', 'icon', 'travelMode'],
  emits: ['changeCheck'],
  setup (props, cxt) {
    const state = reactive({
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

    return {
      ...toRefs(state)
    }
  },
  components: {
    fChooseTime,
    fChooseCity,
    fChoosePort,
    fChooseAttr,
    fConditionButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
$ring-w: 32px;
$button-h: 42px;

.f-sel-pan-main {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  margin: 4vw;
  padding: 20px 6vw 5px;
  background-color: $wite-color;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);

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
</style>