<!--
 * @Author: zxy
 * @Date: 2021-06-23 23:57:48
 * @LastEditTime: 2021-06-24 16:44:08
 * @FilePath: /feizhu/src/components/activity/AirportPickUp/com/nav.vue
-->
<template>
  <div class="nav-sec" ref="navSec" :class="{'is-top': nowTop}">
    <div  v-for="(item, index) in finList" :key="`nav${index}`" class="nav-items"
    :class="{'sel': selNum === index}">
      <img v-if="selNum === index" src="../../../../assets/activity/airport/nowIchi.png" alt="">

      <span>
        {{item[0].type}}
      </span> 
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs, ref } from 'vue'

export default {
  props: ['navList'],
  setup (props) {
    const navSec = ref(null)

    const state = reactive({
      /**
       * @description: 处理数组
       * @param {*}
       * @return {*}
       */
      finList: computed(() => {
        return props.navList
      }),
      // 当前选择 
      selNum: 0,
      // 监听触顶
      nowTop: false,
      /**
       * @description: 检测是否触顶
       * @param {*}
       * @return {*}
       */
      getTop: () => {
        if (navSec.value) {
          let top = navSec.value.getBoundingClientRect().top
  
          if (!top) {
            state.nowTop = true
          } else {
            state.nowTop = false
          }
        }
      /**
       * @description: 节流
       * @param {function} fn
       * @param {numebr} gapTime
       * @return {function}
       */
      },
      throttle: (fn, gapTime) => {
        let _lastTime = null;

        return function () {
          let _nowTime = + new Date()
          if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn();
            _lastTime = _nowTime
          }
        }
      }
    })

    onMounted(() => {
      window.addEventListener('scroll', state.throttle(state.getTop, 100), true)
    })
  
    return {
      ...toRefs(state),
      navSec
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-sec {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
  font-size: 12px;
  height: 40px;
  border-radius: 10px;
  margin: 5px 10px 0;
  z-index: 999;

  .nav-items {
    display: flex;
    align-items: center;
    margin: 0 10px;

    span {
      display: inline-block;
      position: relative;
      margin-left: 5px;
    }

    img {
      visibility: hidden;
      width: 10px;
    }
  }

  .sel {
    color: rgb(255, 0, 54);

    img {
      visibility: visible;
    }
  }
}

.is-top {
  width: 100%;
  margin: 5px 0 0;
  border-radius: 0;
}
</style>