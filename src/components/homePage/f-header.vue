<template>
  <header class="f-header-sec" :style="{'--left': left}">
    <span v-for="(item, index) in titleList" :ref="titleSpan"
    :key="`titleList${index}`" class="f-header-title"
    @click="changePage(index)" 
    :class="{'seleted-title': index === seletFlag}">
      {{item.title}}
    </span>

    <transition name="cover-img">
      <img class="f-header-cover-img" src="../../assets/img/pageCover/back-cover.jpeg" v-if="!seletFlag" alt="">
      <img class="f-header-cover-img" src="../../assets/img/pageCover/back-cover-car.png" v-else alt="">
    </transition>
  </header>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/reactivity'
import { gotoPage } from '../../assets/js/common'
import { onBeforeUpdate, onMounted } from '@vue/runtime-core'
import { computed, getCurrentInstance } from '@vue/runtime-core'

export default {
  props: ["titleList"],
  setup () {
    const state = reactive({
      /**
       * 获取当前页面路由
       * 
       * @returns {String}
       */
      nowIndex: computed(() => {
        const { ctx }= getCurrentInstance()
        const pageName = ctx.$router.currentRoute.value.path.substr(1)

        if (pageName !== 'trainTicket' && pageName !== 'busTicket' || pageName === 'trainTicket') {
          return 0
        } else {
          return 1
        }
      }),
      // 当前目录
      seletFlag: 0,
      /**
       * 切换目录，点击时触发
       * @event
       * 
       * @param {number} index
       */
      changePage: index => {
        state.seletFlag = index
        state.setLeft(index)

        if (index) {
          gotoPage('/busTicket')
        } else {
          gotoPage('/trainTicket')
        }
      },
      // 伪元素偏移量
      left: '0px',
      /**
       * 设置伪元素偏移
       * 
       * @param {number} index 
       */
      setLeft: index => {
        state.left = `${titleSpanArr[index].offsetLeft + 10}px`
      }
    })

    // 获得锚点元素
    let titleSpanArr = []

    const titleSpan = ref((e) => {
        if (e) {
          titleSpanArr.push(e)
        }
    })

    onBeforeUpdate (() => {
      titleSpanArr = []
    })

    onMounted(() => {
      state.seletFlag = state.nowIndex 
      state.setLeft(state.seletFlag)
    })

    return {
      ...toRefs(state),
      titleSpan
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
// 高度
$header-h: 46px;
// 伪元素
$befor-w: 30px;
$befor-left: var(--left);

.f-header-sec {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100vw;
  height: $header-h;
  font-size: $font-size-header;
  color: $font-color;
  font-weight: 400;
  margin-bottom: 20px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: $befor-left;
    bottom: 0;
    width: $befor-w;
    height: 3px;
    border-radius: 5px;
    background-color: $yel-color;
    transition: all .3s ease-in-out;
  }

  .f-header-title {
    transition: color .4s;
    cursor: pointer;
  }

  .seleted-title {
    position: relative;
    color: $yel-color;
  }

  .f-header-cover-img {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .cover-img-enter-from,
  .cover-img-leave-to {
    opacity: 0;
  }

  .cover-img-enter-to,
  .cover-img-leave-from {
    opacity: 1;
  }

  .cover-img-enter-active,
  .cover-img-leave-active {
    transition: all .3s linear
  }
}
</style>