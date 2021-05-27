<template>
  <router-view></router-view>
</template>

<script>
import Router from './router'

export default {
  setup () {
    Router.beforeEach((to, from, next) => {
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next()
    })

    return {}
  }
}
</script>

<style lang="scss">
@import './assets/css/variable.scss';

body {
  font-size: $font-size-main;
}

span,
div {
  -webkit-tap-highlight-color:rgba(0,0,0,0); 
}
</style>