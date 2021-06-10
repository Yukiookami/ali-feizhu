<template>
  <transition name="panel">
    <div ref="minSec" class="choose-panel-sec" v-if="showPanel">
      <div class="search-box">
        <input type="text" class="search-input" v-model="keyword" @keyup="search" placeholder="搜索出发/到达城市/港口">
      </div>

      <div class="yoko-list">
        <span v-for="(item, index) in cityList" :key="`cityNavList$${index}`"
        :class="{'sel': nowSel === index}"
        @click="changeNowIndex(index)">
          {{item.navTitle}}
        </span>
      </div>

      <section class="city-sec" v-if="!searchList.length">
        <div v-for="(item, index) in finCityList" :key="`cityList${index}`">
          <span class="group-title" :ref="cityTitle">{{item[0].group}}</span>

          <span @click="chooseCity(cityName)"
          class="city-item" v-for="(cityName, cityIndex) in item" :key="`cityName${cityIndex}`">
            {{cityName.protLineDep}}-{{cityName.portLineTar}}
          </span>
        </div>
      </section>

      <section class="city-sec" v-else>
        <div v-for="(item, index) in searchList" :key="`search${index}`">
          <span class="group-title" :ref="searchCityTitle">{{item[0].group}}</span>

          <span @click="chooseCity(cityName)" class="city-item" 
          v-for="(cityName, cityIndex) in item" :key="`searchcityName${cityIndex}`">
            {{cityName.protLineDep}}-{{cityName.portLineTar}}
          </span>
        </div>
      </section>

      <div class="index-sec" v-if="!searchList.length">
        <div v-for="(item, index) in finCityList" :key="`index${index}`">
          <span @click.stop="jump(index, 0)" class="group-title">{{item[0].group}}</span>
        </div>
      </div>

      <div class="index-sec" v-else>
        <div v-for="(item, index) in searchList" :key="`indexSearch${index}`">
          <span @click.stop="jump(index, 1)" class="group-title">{{item[0].group}}</span>
        </div>
      </div>

      <transition name="hit">
        <span class="mid-text" v-if="showMidZ">{{clickZ}}</span>
      </transition>
    </div>
  </transition>
</template>

<script>
import { onBeforeUpdate, reactive, ref, toRefs, watch } from 'vue'
import store from '../../../store'

export default {
  // 城市数组，显示模式
  props: ['cityList', 'showMode', 'showPanel', 'saveValue'],
  emits: ['changePanel'],
  setup (props, ctx) {
    const state = reactive({
      // 搜索关键字
      keyword: '',
      // 搜索结果数组
      searchList: [],
      // 当前目录
      nowSel: 0,
      /**
       * 更改当前目录，点击触发
       * @event
       * 
       * @param {numebr} index
       */
      changeNowIndex: index => {
        state.nowSel = index
      },
      /**
       * 搜索，输入触发
       * 
       * @event
       */
      search: () => {
        if (state.keyword) {
          state.searchList = state.getFinCityList(state.fuzzySearch(state.keyword, props.cityList[state.nowSel].portList))
        } else {
          state.searchList = []
        }
      },
      /**
       * 模糊搜索
       * 
       * @param {*} keyWord 搜索关键字
       * @returns {Array} 结果数组
       */
       fuzzySearch: (keyWord, arr) => {
        return arr.filter(ele => {
          return Object.keys(ele).some(key => {
            if (key === 'protLineDep' || key === 'portLineTar') {
              return String(ele[key]).toLowerCase().includes(keyWord)
            }
          })
        })
      },
      // 港口数组
      finCityList: [],
      /**
       * 处理城市数组
       * 
       * @param {array} oldData
       * 
       * @returns {array}
       */
      getFinCityList: oldData => {
        const s = new Set()

        oldData.forEach(ele => {
          s.add(ele.group)
        })

        let newData = Array.from({ length: s.size }, () => [])

        oldData.forEach(ele => {
          let index = [...s].indexOf(ele.group)

          newData[index].push(ele)
        })

        return newData
      },
      /**
       * 选择城市，点击触发
       * 
       * @event
       * @param {object} cityName
       */
      chooseCity: cityName => {
        store.commit('setDepPort', cityName.protLineDep)
        store.commit('setTargetPort', cityName.portLineTar)
        // 港口选择埋点
        buriedPoint({
          eventId: 'chooseCity',
          city: cityName.protLineDep
        })

        buriedPoint({
          eventId: 'chooseCity',
          city: cityName.portLineTar
        })
        state.closePanel()
      },
      /**
       * 关闭面板
       */
      closePanel: () => {
        ctx.emit('changePanel')
      },
      // 点击字母
      clickZ: 'A',
      // 是否显示中心字母
      showMidZ: false,
      /**
       * 锚点跳转，点击触发
       * @event
       * 
       * @param {number} index
       * @param {number} flag
       */
      jump: (index, flag) => {
        if (!flag) {
          minSec.value.scrollTo(0, cityTitleArr[index].offsetTop)
          state.clickZ = cityTitleArr[index].innerHTML
        } else {
          minSec.value.scrollTo(0, searchCityTitleArr[index].offsetTop)
          state.clickZ = searchCityTitleArr[index].innerHTML
        }
        state.showMidZ = true

        setTimeout(() => {
          state.showMidZ = false
        }, 600)
      }
    })

    watch(
      [
        () => props.cityList,
        () => state.nowSel
      ],
      ([cityList, nowSel]) => {
        state.finCityList = state.getFinCityList(cityList[nowSel].portList)
      }
    )

    let cityTitleArr = []
    let searchCityTitleArr = []

    const minSec = ref(null)
  
    const cityTitle = ref((e) => {
      if (e) {
        cityTitleArr.push(e)
      }
    })

    const searchCityTitle = ref((e) => {
      if (e) {
        searchCityTitleArr.push(e)
      }
    })

    onBeforeUpdate (() => {
      cityTitleArr = []
      searchCityTitleArr = []
    })
  
    return {
      ...toRefs(state),
      cityTitle,
      searchCityTitle,
      minSec
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/variable.scss';

.choose-panel-sec {
  overflow: scroll;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  padding-top: 40px;
  padding-left: 100px;
  z-index: 999;

  .search-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: calc(100% - 20px);
    background-color: $wite-color;
    padding: 5px 10px;

    .search-input {
      border: 0;
      outline: none;
      display: block;
      height: 32px;
      width: 100%;
      border-radius: 20px;
      line-height: 32px;
      padding: 0 34px 0 32px;
      background: url('../../../assets/img/chooseImg/search.png') 9px 8px no-repeat;
      background-size: 15px 15px;
      background-color: rgba(0, 0, 0, .05);
      color: #3d3d3d;
      font-size: 13px;
      box-sizing: border-box;
      text-align: left;
    }
    z-index: 1000;
  }

  .yoko-list {
    position: fixed;
    display: flex;
    flex-direction: column;
    text-align: center;
    top: 40px;
    bottom: 0;
    left: 0;
    width: 100px;
    background-color: #f7f8fa;
    font-size: 14px;

    span {
      position: relative;
      height: 45px;
      line-height: 45px;
      color: #292c33;
    }

    .sel {
      background-color: #fff;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 15px;
        width: 3px;
        height: 15px;
        border-radius: 5px;
        background: #fd0;
      }
    }
  }

  .city-sec {
    display: flex;
    flex-direction: column;
    color: $bl-d-color;
    font-size: 16px;

    .group-title {
      position: sticky;
      top: 0;
      display: block;
      padding: 0 10px;
      height: 24px;
      // border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      background-color: #fbfbfb;
      color: rgba(32,37,37,.4);
      width: 100%;
      font-size: 12px;
      line-height: 24px;
    }

    .city-item {
      display: block;
      overflow: hidden;
      padding: 0 10px 0;
      height: 45px;
      border-bottom: 1px solid rgba(32,35,37,.15);
      color: #3d3d3d;
      background-color: #fff;
      font-size: 16px;
      line-height: 45px;
    }
  }

  .index-sec {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 16px;
    right: 0;
    top: 60px;
    bottom: 0;
    z-index: 200;
    font-size: 10px;

    span {
      cursor: pointer;
      display: block;
      text-align: center;
      width: 30px;
      height: 16px;
      font-size: 9px;
      color: rgba(32,35,37,.6);
      -webkit-box-flex: 1;
      z-index: 9999;
    }
  }
}

.mid-text {
  $text-w: 60px;

  position: fixed;
  top: calc(50% - 30px);
  left: calc(50% - 30px);
  display: block;
  text-align: center;
  height: $text-w;
  width: $text-w;
  line-height: $text-w;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .6);
  color: #fff;
  z-index: 99999;
}

// 字体进出动画
.hit-enter-from,
.hit-leave-to {
  opacity: 0;
}

.hit-enter-to,
.hit-leave-from {
  opacity: 1;
}

.hit-enter-active,
.hit-leave-active {
  transition: all .3s linear
}

// 面板进出动画
.panel-enter-from,
.panel-leave-to {
  transform: translate(100vw);
}

.panel-enter-to,
.panel-leave-from {
  transform: translate(0);
}

.panel-enter-active,
.panel-leave-active {
  transition: all .3s linear
}
</style>