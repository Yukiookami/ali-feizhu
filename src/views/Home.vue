<template>
  <f-header :titleList="titleList"></f-header>

  <router-view></router-view>

  <f-footer></f-footer>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
// 页头
import fHeader from '../components/homePage/f-header'
// 页脚
import fFooter from '../components/homePage/f-footer/f-footer'

export default {
  setup () {
    const state = reactive ({
      // 标题数组
      titleList: [
        {
          title: '火车票'
        },
        {
          title: '汽车票'
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    fHeader,
    fFooter
  }
}
</script>

<style lang="scss" scoped>

</style>