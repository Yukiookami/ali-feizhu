<!--
 * @Author: zxy
 * @Date: 2021-06-23 23:46:05
 * @LastEditTime: 2021-06-24 18:56:17
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/airportItem.vue
-->
<template>
  <div class="item-sec" @click="goToPay">
    <div class="cover-box">
      <span class="type-span">{{content}}</span>
      <img :src="cover" alt="">
      <span class="selled-span">已售{{selled}}件</span>
    </div>

    <div class="info-box">
      <span class="title-box">{{title}}</span>

      <span class="ps-box">{{ps}}</span>

      <span class="money-box">¥<span class="money-span">{{money}}</span>起</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import router from '../../../../router'

export default {
  props: [
    'id',
    'content',
    'type',
    'cover',
    'money',
    'title',
    'ps',
    'selled'
  ],
  setup (props) {
    const state = reactive({
      goToPay: () => {
        router.push({
          path: `/airportPay`,
          query: {
            id: props.id
          }
        })
      }
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.item-sec {
  width: 47%;
  font-size: 10px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;

  .cover-box {
    position: relative;
    height: 122px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .type-span {
      position: absolute;
      top: 5px;
      left: 7px;
      background-color: rgba(0, 0, 0, 0.5);
      color: #fff;
      padding: 3px 6px;
      border-radius: 10px;
      border-top-right-radius: 0;
    }

    .selled-span {
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: rgba(255, 64, 26, 0.8);
      color: #fff;
      padding: 3px 5px 1px;
      border-top-right-radius: 8px;
    }
  }

  .info-box {
    display: flex;
    flex-direction: column;
    padding: 5px;

    .title-box {
      display: -webkit-box;
      font-size: 12px;
      text-overflow: ellipsis;
      text-align: left;
      letter-spacing: 0.0667vw;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      min-height: 9.6vw;
      line-height: 4.8vw;
      margin: 5px 0;
      overflow: hidden;
    }

    .ps-box {
      display: -webkit-box;
      font-size: 11px;
      text-overflow: ellipsis;
      text-align: left;
      letter-spacing: 0.0667vw;
      -webkit-box-orient: vertical;
      min-height: 4.8vw;
      line-height: 4.8vw;
      color: #999;
      overflow: hidden;
    }

    .money-box {
      color: rgb(255, 64, 26);
      font-size: 11.5px;
      font-weight: 500;

      .money-span {
        font-size: 17px;
      }
    }
  }
}
</style>