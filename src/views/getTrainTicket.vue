<template>
  <div>
    <f-adv-box :advMsg="adv.msg" :router="adv.router"></f-adv-box>

    <f-select-panel :conditonList="selPanel.conditionList"
    :icon="selPanel.icon" :travelMode="selPanel.travelMode" @changeCheck="changeCheck"></f-select-panel>

    <div class="adv-button-sec">
      <f-adv-button v-for="(item, index) in advButtonArr" :key="`adv${index}`"
      :title="item.title" :content="item.content" :router="item.router"
      :cover="item.cover"></f-adv-button>
    </div>

    <div class="mayi-logo">
      <img src="../assets/img/homePage/mayi-logo.png" alt="">
      <span>购票获得蚂蚁森林绿色能量</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import fAdvBox from '../components/common/f-adv-box'
import fSelectPanel from '../components/homePage/f-select-panel'
import fAdvButton from '../components/homePage/f-adv-button'

export default {
  setup () {
    const state = reactive({
      // 广告信息
      adv: {
        msg: '支付宝12306小程序火车票订单查询指引',
        router: 'https://f.m.taobao.com/wow/z/pcraft/act/wupr?wh_biz=tm&wh_weex=true&wh_pid=flight%2Ftrain-notice12306&program_type=H5&ttid=201300%40travel_h5_3.1.0&spm=181.7406756.10840052.tip&scm=&_preProjVer=1.25.0'
      },
      // 选择面板
      selPanel: {
        conditionList: [
          {
            cond: '学生票查询',
            checked: false
          },
          {
            cond: '只看高铁动车',
            checked: false
          }
        ],
        icon: require('../assets/img/chooseImg/train.svg'),
        travelMode: 0,
      },
      changeCheck: index => {
        state.selPanel.conditionList[index].checked = !state.selPanel.conditionList[index].checked
      },
      advButtonArr: [
        {
          title: '飞猪租车',
          content: '信用免押',
          cover: require('../assets/img/homePage/car.png'),
          router: 'https://market.m.taobao.com/app/trip/h5-vehicle-new/pages/home/index.html?vehicleType=rent-car&program_type=H5&ttid=201300%40travel_h5_3.1.0&spm=181.7406756.10840052.nav0&scm=&_preProjVer=1.25.0&_projVer=1.5.4'
        },
        {
          title: '接送站',
          content: '提前约接机',
          cover: require('../assets/img/homePage/yoyaku.png'),
          router: 'https://market.m.taobao.com/app/trip/h5-vehicle-new/pages/home/index.html?vehicleType=train-transfer&program_type=H5&ttid=201300%40travel_h5_3.1.0&spm=181.7406756.10840052.nav1&scm=&_preProjVer=1.25.0&_projVer=1.5.4'
        }
      ]
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: {
    fAdvBox,
    fSelectPanel,
    fAdvButton
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';

.adv-button-sec {
  display: flex;
  margin: 10px 0 30px 4vw;
}

.mayi-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  font-size: 12px;
  color: $g-m-color;

  img {
    width: 15px;
    margin-right: 5px;
  }
}
</style>