<!--
 * @Author: zxy
 * @Date: 2021-06-22 20:15:27
 * @LastEditTime: 2021-06-22 20:52:51
 * @FilePath: /feizhu/src/views/activityPage/activityPage.vue
-->
<template>
  <div>
    123213
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>