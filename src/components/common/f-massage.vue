<!--
 * @Author: zxy
 * @Date: 2021-05-26 15:35:25
 * @LastEditTime: 2021-06-18 16:36:03
 * @FilePath: /feizhu/src/components/common/f-massage.vue
-->
<template>
  <transition name="msg">
    <div class="msg-box" v-if="showMidZ">
      <span>{{msg}}</span>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  props: ['msg', 'showMidZ'],
  setup (props) {
    const state = reactive({
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-box {
  $text-w: 140px;

  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  font-size: 14px;
  display: block;
  text-align: center;
  height: $text-w / 2;
  width: $text-w;
  line-height: $text-w / 2;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
  z-index: 99999;
}

// 消息面板出入
.msg-enter-from,
.msg-leave-to {
  opacity: 0;
}

.msg-enter-to,
.msg-leave-from {
  opacity: 1;
}

.msg-enter-active,
.msg-leave-active {
  transition: all .5s linear
}
</style>