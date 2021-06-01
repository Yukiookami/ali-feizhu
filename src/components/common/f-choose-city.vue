<template>
  <div class="choose-sec" @click="changeShowPanel" :class="{'not-choose': !city.indexOf('选择')}">
    <span>{{city}}</span>
  </div>

  <choose-panel :cityList="cityList" :showPanel="showPanel" 
  @changePanel="changeShowPanel"
  :saveValue="saveValue"></choose-panel>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'
import choosePanel from './choosePanel/choosePanel'
import { getCurrentInstance } from '@vue/runtime-core'

export default {
  props: ['city', 'saveValue'],
  setup () {
    const { ctx } = getCurrentInstance()

    const state = reactive({
      // 判断是否选择了城市
      choosed: false,
      // 城市列表
      cityList: [],
      /**
       * 获得城市列表，网络请求
       */
      getCityList: () => {
        ctx.$http.get('/mock/cityList').then(res => {
          state.cityList = res.data
        })
      },
      // 显示面板
      showPanel: false,
      /**
       * 显示面板，点击触发
       * 
       * @event
       */
      changeShowPanel: () => {
        state.showPanel = !state.showPanel
      }
    })

    state.getCityList()

    return {
      ...toRefs(state)
    }
  },
  components: {
    choosePanel
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/chooseCommon.scss';

</style>