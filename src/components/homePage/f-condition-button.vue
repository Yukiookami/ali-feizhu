<template>
  <div class="check-button">
    <div @click="changeCheck()" class="check-box"
    :class="{'checked': checked}"></div>
    <span>{{condition}}</span>
  </div>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'

export default {
  // 条件,是否选择
  props: ['condition', 'checked', 'index'],
  emits: ['changeCheck'],
  setup (props, cxt) {
    const state = reactive({
      changeCheck: () => {
        cxt.emit("changeCheck", props.index)
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
$button-w: 17px;

.check-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #292c33;

  .check-box {
    height: $button-w;
    width: $button-w;
    background-image: url('../../assets/img/check/check.png');
    background-size: cover;
    margin-right: 10px;
  }

  .checked {
    background-image: url('../../assets/img/check/checked.png');
  }
}
</style>