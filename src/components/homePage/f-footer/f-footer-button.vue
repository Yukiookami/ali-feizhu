<template>
  <a class="f-footer-button-sec" :href="router">
    <img :src="icon" alt="">
    <span>{{title}}</span>
  </a>
</template>

<script>
export default {
  // 图标，标题
  props: ['icon', 'title', 'router'],
  setup (props) {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/variable.scss';

.f-footer-button-sec {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: $font-size-footer;
  text-decoration: none;
  margin-bottom: 3px;

  img {
    width: 20px;
    margin: 5px;
  }

  span {
    color: $bl-color;
  }
}
</style>