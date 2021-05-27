<template>
  <div class="choose-sec" :class="{'not-choose': !city.indexOf('选择')}">
    <span>{{city}}</span>
  </div>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'

export default {
  props: ['city'],
  setup () {
    const state = reactive({
      // 判断是否选择了城市
      choosed: false
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/chooseCommon.scss';

</style>