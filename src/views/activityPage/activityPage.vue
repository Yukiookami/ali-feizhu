<!--
 * @Author: zxy
 * @Date: 2021-06-22 20:15:27
 * @LastEditTime: 2021-06-23 23:03:18
 * @FilePath: /feizhu/src/views/activityPage/activityPage.vue
-->
<template>
  <div>
    <airport></airport>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import airport from '../../components/activity/AirportPickUp/ariport.vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    airport
  }
}
</script>

<style lang="scss" scoped>

</style>