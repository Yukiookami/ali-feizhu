<template>
  <div class="f-c-time-sec">
    <span>{{nowTime}}</span>
    <span class="small-text">{{dayAfter}}</span>
  </div>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'
export default {
  setup () {
    const state = reactive({
      // 选择的时间
      nowTime: '5月28日',
      // 距离出发有多少天
      dayAfter: '明天出发'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
$after-w: 6px;
$after-h: $after-w * 2;

.f-c-time-sec {
  position: relative;
  height: 48px;
  line-height: 48px;
  border: 1px solid rgba(0, 0, 0, .06);
  border-left: none;
  border-right: none;
  width: 100%;
  margin: 10px;
  font-size: $font-size-header;

  .small-text {
    margin-left: 5px;
    color: $g-color;
    font-size: $font-size-smoll;

    &::after {
      content: '';
      position: absolute;
      top: 17px;
      right: 10px;
      display: block;
      height: $after-h;
      width: $after-w;
      background-image: url('../../assets/img/advImg/ajirushii.png');
      background-size: cover;
      filter: grayscale(100%);
    }
  }
}
</style>