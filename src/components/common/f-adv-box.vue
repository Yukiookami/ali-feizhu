<template>
  <a v-if="isShow" class="adv-sec" :href="router">
    <span>{{advMsg}}</span>
    <img src="../../assets/img/advImg/ajirushii.png" alt="">
    <div @click.prevent="close" class="close"></div>
  </a>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
export default {
  // 广告消息,跳转链接
  props: ['advMsg', 'router'],
  setup (props) {
    const state = reactive({
      isShow: true,
      /**
       * 关闭，点击叉触发
       * @event
       */
      close: e => {

        state.isShow = false
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
$close-w: 12px;

.adv-sec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 86vw;
  margin: 0 4vw;
  padding: 5px 3vw;
  border-radius: 5px;
  font-size: 12px;
  color: $adv-font-color;
  background-color: $adv-back;
  text-decoration: none;

  span {
    overflow: hidden; 
    display: block;
    height: 1rem;
    line-height: 1rem;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img {
    width: 6px;
  }

  .close {
    position: relative;
    display: flex;
    align-items: center;
    background-image: url('../../assets/img/advImg/close.png');
    height: $close-w;
    width: $close-w;
    background-size: cover;
    z-index: 99;

    &::before {
      content: '';
      display: block;
      position: absolute;
      height: 11px;
      width: 1px;
      left: -10px;
      background-color: $adv-font-color;
      opacity: .3;
    }
  }
}
</style>