<template>
  <router-view></router-view>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { buriedPoint } from './assets/js/common'

export default {
  setup () {
    // PV埋点
    const state = reactive({
      sendPv: () => {
        buriedPoint({
          eventId: 'loadPage',
          page: 'app'
        })
      }
    })

    state.sendPv()

    return {
      ...toRefs(state)      
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/variable.scss';
*::-webkit-scrollbar {
  display: none;
  width: 0px;
}

body {
  font-size: $font-size-main;
}

span,
div {
  -webkit-tap-highlight-color:rgba(0,0,0,0); 
}
</style>