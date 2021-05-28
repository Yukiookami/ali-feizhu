<template>
  <label class="hot-tag">{{hotTag}}</label>
</template>

<script>
export default {
  // 标签
  props: ['hotTag'],
  setup (props) {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>
.hot-tag {
  position: absolute;
  top: 2px;
  right: 8px;
  height: 10px;
  padding: 2px 3.8px;
  border-radius: 15px;
  font-size: 10px;
  background: #ff5000;
  color: #fff;
  font-weight: 400;

  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    left: 2px;
    bottom: -2px;
    border-top: 2.8px solid #ff5000;
    border-left: 3.8px solid #ff5000;
    border-bottom: 2.7px solid transparent;
    border-right: 3.8px solid transparent;
  }
}
</style>