<!--
 * @Author: zxy
 * @Date: 2021-06-23 23:07:39
 * @LastEditTime: 2021-06-23 23:57:10
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/tick.vue
-->
<template>
  <div class="tick-box">
    <div class="top-box">
      <div class="left-part">
        <span>¥<span class="money">{{money}}</span></span>
        <span>{{type}}</span>
      </div>

      <div class="get-button">
        {{buttonText}}
      </div>
    </div>
    
    <div class="bottom-box">
      <span>{{line}}</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: ['money', 'type', 'line'],
  setup () {
    const state = reactive({
      buttonText: '领取'
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.tick-box {
  display: flex;
  flex-direction: column;
  background-image: url('../../../../assets/activity/airport/tick.webp');
  background-size: 100% 100%;
  width: 147px;
  height: 67px;
  font-size: 10px;
  color: #3D3D3D;

  .top-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 3px;
    margin-bottom: 6px;

    .left-part {
      display: flex;
      flex-direction: column;

      .money {
        font-size: 23px;
        font-weight: 800;
      }
    }

    .get-button {
      border: 0px solid black;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      place-content: flex-start center;
      flex-shrink: 0;
      background-image: linear-gradient(rgb(255, 249, 149), rgb(255, 240, 1));
      overflow: hidden;
      align-items: center;
      border-radius: 10px;
      height: 21px;
      width: 60px;
      color: rgb(255, 140, 48);
    }
  }

  .bottom-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>