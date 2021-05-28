<template>
  <div class="choose-sec" :class="{'not-choose': !port.indexOf('选择')}">
    <span class="setume-text">{{portText}}</span>
    <span>{{port}}</span>
  </div>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'

export default {
  props: ['port'],
  setup () {
    const state = reactive({
      // 判断是否选择了城市
      choosed: false,
      // 上方的文字
      portText: '城市/港口'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/chooseCommon.scss';

.choose-sec {
  display: flex;
  flex-direction: column;
  font-size: 17px;
  
  .setume-text {
    font-size: 12px;
  }
}
</style>