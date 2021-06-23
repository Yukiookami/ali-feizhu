<!--
 * @Author: zxy
 * @Date: 2021-06-23 23:01:28
 * @LastEditTime: 2021-06-23 23:07:17
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/title.vue
-->
<template>
  <div class="title-box">
    <img src="../../../../assets/activity/airport/niji-l.webp" alt="">
    <span>{{title}}</span>
    <img src="../../../../assets/activity/airport/niji-r.webp" alt="">
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: ['title'],
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
.title-box {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;

  span {
    margin: 5px 10px;
  }

  img {
    width: 40px;
  }
}
</style>