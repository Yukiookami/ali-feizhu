<template>
  <div>
    <f-select-panel :navList="selPanel.navList" @setSelectedNum="setSelectedNum"></f-select-panel>

    <div class="f-arrt-sec" v-show="nowIndex === 1">
      <span class="f-arrt-sec-title">{{arrtSecText}}</span>
      <div class="f-arrt-item-box">
        <f-rec-places v-for="(item, index) in arrtArr" :key="`rec${index}`"
        :title="item.title" :cover="item.cover" :content="item.content"></f-rec-places>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import fAdvBox from '../components/common/f-adv-box'
import fSelectPanel from '../components/homePage/f-select-panel'
import fAdvButton from '../components/homePage/f-adv-button'
import fRecPlaces from '../components/homePage/f-rec-places'

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
        navList: [
          {
            title: '汽车票',
            icon: require('../assets/img/chooseImg/bus.png'),
            travelMode: 0
          },
          {
            title: '旅游专线',
            icon: require('../assets/img/chooseImg/bus.png'),
            travelMode: 1
          },
          {
            title: '船票',
            icon: require('../assets/img/chooseImg/ship.png'),
            travelMode: 2
          }
        ]
      },
      // 当前面板
      nowIndex: 0,
      /**
       * 获得当前面板index
       * 
       * @param {number} index
       */
      setSelectedNum: index => {
        state.nowIndex = index
        console.log(index)
      },
      // 景点信息
      arrtSecText: '景点推荐',
      arrtArr: [
        {
          title: '西栅景区',
          content: '欣赏楼台戏剧,河sssssssss',
          cover: require('../assets/img/rec-img/cover-1.jpeg')
        },
        {
          title: '乌镇西栅景区',
          content: '当地十分有名的sssssss',
          cover: require('../assets/img/rec-img/cover-2.jpeg')
        },
        {
          title: '上海南站',
          content: '',
          cover: require('../assets/img/rec-img/cover-3.jpeg')
        },
        {
          title: '东栅景区',
          content: '寺庙',
          cover: require('../assets/img/rec-img/cover-4.jpeg')
        }
      ]
    })
  
    return {
      ...toRefs(state)
    }
  },
  components: {
    fAdvBox,
    fSelectPanel,
    fAdvButton,
    fRecPlaces
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/variable.scss';

.adv-button-sec {
  display: flex;
  margin: 10px 0 30px 4vw;
}

.f-arrt-sec {
  font-size: 20px;
  color: $bl-color;
  font-weight: 700;
  margin: 0 auto;
  width: 90vw;

  .f-arrt-sec-title {
    margin: 0px;
  }

  .f-arrt-item-box {
    overflow-x: auto;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>