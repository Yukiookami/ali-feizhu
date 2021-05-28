<template>
  <a class="f-adv-button-main" :href="router" :style="{backgroundImage: `url(${cover})`}">
    <span>{{title}}</span>
    <span class="content-box">{{content}}</span>
  </a>
</template>

<script>
export default {
  // 标题，简介，背景图片
  props: ['title', 'content', 'cover', 'router'],
  setup (props) {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';

.f-adv-button-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  color: $bl-d-color;
  font-size: 13px;
  text-decoration: none;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0 5.7px 0 0;
  padding: 11.5px 9.6px 9.6px;
  height: 36px;
  width: 146px;

  .content-box {
    font-size: 12px;
    color: $g-m-color;
  }
}
</style>