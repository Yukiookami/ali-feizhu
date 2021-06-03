<template>
  <div class="tick-header">
    <f-choose-time showModel="1"></f-choose-time>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import fChooseTime from '../common/f-choose-time'


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
    fChooseTime
  }
}
</script>

<style lang="scss" scoped>
.tick-header {
  display: flex;
  padding: 5px 0;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 100%;
}
</style>