<template>
  <router-view></router-view>
</template>

<script>
import Router from './router'

export default {
  setup () {

    return {}
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