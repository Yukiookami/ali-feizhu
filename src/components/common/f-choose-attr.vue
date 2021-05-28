<template>
  <div class="choose-sec" :class="{'not-choose': !arrt.indexOf('选择')}">
    <span class="setume-text">{{arrtText}}</span>
    <span>{{arrt}}</span>
  </div>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'

export default {
  props: ['arrt'],
  setup () {
    const state = reactive({
      // 判断是否选择了城市
      choosed: false,
      // 上方的文字
      arrtText: '城市/景点'
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