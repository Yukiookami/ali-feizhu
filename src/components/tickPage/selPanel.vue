<template>
  <div @click="change" class="show-sec">
    <span>{{nowName}}</span>
    <img src="../../assets/img/tickPage/open.svg" alt="">
  </div>

  <transition name="panel">
    <div class="sel-panel-sec" v-if="isShow">
      <span :class="{'seled': selNum === index}" @click="changeSel(index)"
      v-for="(item, index) in selList" :key="`sel${index}`">
        {{item.selName}}
      </span>
    </div>
  </transition>

  <transition name="mask">
    <div @click="change" class="mask" v-if="isShow"></div>
  </transition>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'

export default {
  props: ['selList'],
  emits: ['getSel'],
  setup (props, content) {
    const state = reactive({
      // 当前选择
      selNum: 0,
      // 改变选择
      changeSel: index => {
        state.selNum = index
        content.emit('getSel', state.nowName)
        state.change()
      },
      // 是否显示选择面板
      isShow: false,
      // 当前选择的名称
      nowName: computed(() => props.selList[state.selNum].selName),
      // 展开面板
      change: () => {
        state.isShow = !state.isShow
      }
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
// 显示区域
.show-sec {
  flex: 1;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// 面板
.sel-panel-sec {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: #fff;
  z-index: 10;

  span {
    position: relative;
    display: block;
    width: 97%;
    padding-left: 10px;
    height: 45px;
    font-size: 15px;
    line-height: 45px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding-right: 12px;
    color: #3d3d3d;
    background: #fff;
  }

  .seled {

    &::before {
      content: url('../../assets/img/tickPage/selected.svg');
      width: 25px;
      height: 25px;
      line-height: 25px;
      position: absolute;
      right: 12px;
      top: 50%;
      margin-top: -12.5px;
    }
  }
}

.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 9;
}

// 面板进出动画
.panel-enter-from,
.panel-leave-to {
  transform: translateY(100vh);
}

.panel-enter-to,
.panel-leave-from {
  transform: translateY(0);
}

.panel-enter-active,
.panel-leave-active {
  transition: all .3s linear
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
</style>