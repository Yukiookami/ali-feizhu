<template>
  <div>

  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'

export default {
  setup () {
    const state = reactive({
      // 当前页面模式
      nowT: computed(() => state.tickMode)
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>