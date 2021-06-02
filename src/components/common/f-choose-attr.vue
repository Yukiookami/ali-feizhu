<template>
  <div class="choose-sec" @click="changeShowPanel" :class="{'not-choose': !arrt.indexOf('选择')}">
    <span class="setume-text">{{arrtText}}</span>
    <span>{{arrt}}</span>
  </div>

  <choose-panel :cityList="cityList" :showPanel="showPanel" 
  @changePanel="changeShowPanel"
  :saveValue="saveValue"></choose-panel>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import choosePanel from './choosePanel/choosePanel'

export default {
  props: ['arrt', 'saveValue'],
  setup () {
    const { ctx } = getCurrentInstance()

    const state = reactive({
      // 判断是否选择了城市
      choosed: false,
      // 上方的文字
      arrtText: '城市/景点',
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

.choose-sec {
  display: flex;
  flex-direction: column;
  font-size: 17px;

  .setume-text {
    font-size: 12px;
    color: $not-choose-color;
  }
}
</style>