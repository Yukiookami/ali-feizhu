<template>
  <div class="choose-sec" @click="changeShowPanel" :class="{'not-choose': !port.indexOf('选择')}">
    <span class="setume-text">{{portText}}</span>
    <span>{{port}}</span>
  </div>

  <choose-panel-port :cityList="cityList" :showPanel="showPanel" 
  @changePanel="changeShowPanel"
  :saveValue="saveValue"></choose-panel-port>
</template>

<script>
import store from '@/store'
import { reactive, toRefs } from '@vue/reactivity'
import { getCurrentInstance } from '@vue/runtime-core'
import choosePanelPort from './choosePanel/choosePanelPort'

export default {
  props: ['port', 'saveValue'],
  setup () {
    const { ctx } = getCurrentInstance()

    const state = reactive({
      // 判断是否选择了城市
      choosed: false,
      // 上方的文字
      portText: '城市/港口',
      // 城市列表
      cityList: [],
      /**
       * 获得城市列表，网络请求
       */
      getCityList: () => {
        ctx.$http.get('/mock/portList').then(res => {
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
    choosePanelPort
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