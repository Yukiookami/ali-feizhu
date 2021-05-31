<template>
  <div @click="isShowPanel" class="f-c-time-sec">
    <span>{{nowTime}}</span>
    <span class="small-text">{{dayAfter}}</span>
  </div>

  <transition name="panel">
    <section ref="panel" class="f-c-time-panel" v-show="showPanel">
      <header class="f-c-time-heaer">
        <div class="text-box">
          <span @click="isShowPanel" class="cancel-button">{{cancelText}}</span>
          <h3>{{timeTitle}}</h3>
        </div>

        <ul class="day-list">
          <li v-for="(item, index) in dayList" :key="`dayList${index}`">
            {{item.dayName}}
          </li>
        </ul>
      </header>

      <section class="f-c-cal-sec">
        <div v-for="(item, index) in calendarArr" :key="`cal${index}`"
        class="cal-item">
          <div class="f-c-now-mon-box" :ref="monTitleSpan"
          :class="{'fixed-title': index === isFixedTitle}">
            <span class="f-c-now-mon">{{item.monTitle}}</span>
          </div>

          <div v-for="(dayItem, dayIndex) in item.calList" :key="`day${dayIndex}`"
          @click="chooseDay(index, dayIndex)"
          class="day-item" :class="{'today': dayItem.selectDay, 'passed': dayItem.isPass}">
            <span class="holiday">{{dayItem.holiday}}</span>
            {{dayItem.day}}
          </div>
        </div>
      </section>
    </section>
  </transition>
</template>

<script>
import store from '@/store'
import { reactive, ref, toRefs } from '@vue/reactivity'
import { nextTick, onBeforeUpdate, onMounted, onUpdated } from '@vue/runtime-core'
export default {
  setup () {
    const state = reactive({
      // 选择的时间
      nowTime: '5月28日',
      // 距离出发有多少天
      dayAfter: '明天出发',
      // 面板区域
      // 是否显示面板
      showPanel: false,
      // 关闭面板
      cancelText: '取消',
      // 面板标题
      timeTitle: '选择日期',
      // 日期面板
      dayList: [
        {
          dayName: '日'
        },
        {
          dayName: '一'
        },
        {
          dayName: '二'
        },
        {
          dayName: '三'
        },
        {
          dayName: '四'
        },
        {
          dayName: '五'
        },
        {
          dayName: '六'
        }
      ],
      // 现在的月份
      nowMon: '2021年5月',
      // 是否需要固定标题
      isFixedTitle: -1,
      // 默认日期现在在几号
      isNext: {},
      // 日历表
      calendarArr: [],
      /**
       * 获取时间表
       */
      getAllTime: () => {
        const nowDate = new Date()
        let nowYear = nowDate.getFullYear()
        let nowMon = nowDate.getMonth() + 1
        let nowDays = nowDate.getDate()
        state.nowMon = `${nowYear}年${nowMon}月`

        let nextOnj = state.getNextMon(nowYear, nowMon)
        let nextYear = nextOnj.nextYear
        let nextMon = nextOnj.nextMon

        let lastOnj = state.getNextMon(nextYear, nextMon)
        let lastYear = lastOnj.nextYear
        let lastMon = lastOnj.nextMon

        let nextDayObj = state.getMonCal(nowYear, nowMon, nowDays, true)
        state.getMonCal(nextYear, nextMon, 0, false)
        state.getMonCal(lastYear, lastMon, 0, false)

        if (nextDayObj.nextMon) {
          let thisDay = state.calendarArr[index].calList[state.calendarArr[1].calList.findIndex(ele => ele)]
          state.chooseDayDef(1)
          state.nowTime = `${nextMon}月${1}日` 
          state.dayAfter = state.getWeekDay(thisDay.year, thisDay.mon, thisDay.day)
        } else {
          state.chooseDayDef(0, nextDayObj.nextDay)
          state.nowTime = `${nowMon}月${nowDays + 1}日` 
          state.dayAfter = state.getWeekDay(nowYear, nowMon, nowDays + 1)
        }
      },
      /**
       * 选择日期(默认)
       * 
       * @param {number} index
       * @param {number} indexDay
       */
      chooseDayDef: (index, indexDay) => {
        if (indexDay) {
          let chooseDay = state.calendarArr[index].calList[indexDay]

          chooseDay.selectDay = true
          chooseDay.holiday = '出发'
            
          state.isNext = {
            index: index,
            indexDay: indexDay
          }
        } else {
          let chooseDay = state.calendarArr[index].calList.find(ele => {
            return ele
          })

          state.isNext = {
            index: index,
            indexDay: chooseDay
          }

          chooseDay.selectDay = true
          chooseDay.holiday = '出发'
        }

        if (index) {
          nextTick(() => {
            panel.value.scrollTo(0, monTitleSpanArr[index].offsetTop - monTitleSpanArr[index - 1].offsetTop)
            // monTitleSpanArr[1].getBoundingClientRect().top
          })
        }
      },
      /**
       * 获取每个月的时间表,返回下一天
       * 
       * @param {number} nowYear
       * @param {number} nowMon
       * @param {number} nowDay
       * @param {boolean} isNow
       * 
       * @returns {object}}
       */
      getMonCal: (nowYear, nowMon, nowDay, isNow) => {
        // 存储每月数组
        let calList = []
        let cont = 1

        let monObj = state.getMonAndWeekday(nowYear, nowMon)

        for(let i = 0; i < (monObj.MonDays + monObj.firstWeekDay); i++) {
          if (i < monObj.firstWeekDay) {
            calList.push('')
          } else {
            let selectDay = false
            let holiday = ''
            let isPass = false

            if (i - monObj.firstWeekDay + 1 === nowDay) {
              holiday = '今天'
            }

            if (i - monObj.firstWeekDay + 1 < nowDay && isNow) {
              isPass = true
            }

            calList.push({
              day: cont,
              mon: nowMon,
              year: nowYear,
              selectDay: selectDay,
              holiday: holiday,
              isPass: isPass
            })
            cont++
          }
        }

        state.calendarArr.push({
          monTitle: `${nowYear}年${nowMon}月`,
          calList: calList
        })

        if (nowDay + 1 > monObj.MonDays) {
          return {
            nextDay: 1,
            nextMon: true
          }
        } else {
          return {
            nextDay: nowDay + 2,
            nextMon: false
          }
        }
      },
      /**
       * 获得下一个月的信息
       * 
       * @param {number} nowYear
       * @param {number} nowMon
       * 
       * @returns {object}
       */
      getNextMon: (nowYear, nowMon) => {
        let nextYear = 0
        let nextMon = 0
        if (nowMon + 1 > 12) {
          nextYear = nowYear + 1
          nextMon = 1
        } else {
          nextYear = nowYear
          nextMon = nowMon + 1
        }

        return {
          nextYear: nextYear,
          nextMon: nextMon
        }
      },
      /**
       * 通过年份月份获得当前月有多少天，该月第一天是星期几
       * 
       * @param {number} year
       * @param {numebr} mon
       * 
       * @returns {object}
       */
      getMonAndWeekday: (year, mon) => {
        const firstWeekDay = new Date(`${year}, ${mon}, 1`).getDay()
        const getMonDays = new Date(year, mon, 0).getDate()
        
        return {
          firstWeekDay: firstWeekDay,
          MonDays: getMonDays
        }
      },
      /**
       * 监听标题是否触顶，滚动时触发
       * 
       * @event
       */
      listenPageTop: () => {
        // console.log(monTitleSpanArr)
        Array.prototype.forEach.call(monTitleSpanArr, (ele, index) => {
          // let top = ele.offsetTop
          let scorllTop = Math.floor(ele.getBoundingClientRect().top)
          // if (index !==0) {
          //   console.log(index)
          // }
          
          if (scorllTop <= 95 && scorllTop > -200) {
            state.isFixedTitle = index
          }
        })
      },
      /**
       * 选择日期
       * 
       * @param {number} index
       * @param {numebr} indexDay
       */
      chooseDay: (index, indexDay) => {
        let thisDay = state.calendarArr[index].calList[indexDay]
        let next = state.isNext

        if (!thisDay.isPass) {
          let oldDay = state.calendarArr[next.index].calList[next.indexDay]
          thisDay.selectDay = true
          thisDay.holiday = '出发'
          oldDay.selectDay = false
          oldDay.holiday = ''

          state.isNext = {
            index: index,
            indexDay: indexDay
          }

          state.nowTime = `${thisDay.mon}月${thisDay.day}日` 
          state.dayAfter = state.getWeekDay(thisDay.year, thisDay.mon, thisDay.day)
          state.isShowPanel()
        }
      },
      /**
       * 获得星期数
       * 
       * @param {number} year
       * @param {number} mon
       * @param {number} day
       */
      getWeekDay: (year, mon, day) => {
        const nowDate = new Date(`${year}, ${mon}, ${day}`)
        let week = nowDate.getDay()
        let dayList = ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
        
        return dayList[week]
      },
      /**
       * 是否显示面板
       */
      isShowPanel: () => {
        state.showPanel = !state.showPanel
      }
    })

    let monTitleSpanArr = []
    let panel = ref(null)
    
    const monTitleSpan = ref(e => {
      if (monTitleSpanArr.length < 3) {
        if (e) {
          monTitleSpanArr.push(e)
        }
      }
    })

    // 为什么不触发
    onBeforeUpdate(() => {
      monTitleSpanArr = []
    })

    onMounted(() => {
      window.addEventListener('scroll', state.listenPageTop, true)
      state.getAllTime()
    })

    // onUpdated(() => {
    //   console.log(2)
    //   if (state.isNext) {
    //     window.scrollTo(0, monTitleSpanArr[1].offsetTop)
    //   }
    // })

    return {
      ...toRefs(state),
      monTitleSpan,
      panel
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
$after-w: 6px;
$after-h: $after-w * 2;

.f-c-time-sec {
  position: relative;
  height: 48px;
  line-height: 48px;
  border: 1px solid rgba(0, 0, 0, .06);
  border-left: none;
  border-right: none;
  width: 100%;
  margin: 10px;
  font-size: $font-size-header;

  .small-text {
    margin-left: 5px;
    color: $g-color;
    font-size: $font-size-smoll;

    &::after {
      content: '';
      position: absolute;
      top: 17px;
      right: 10px;
      display: block;
      height: $after-h;
      width: $after-w;
      background-image: url('../../assets/img/advImg/ajirushii.png');
      background-size: cover;
      filter: grayscale(100%);
    }
  }
}

// 面板区域
.f-c-time-panel {
  // position: absolute;
  // top: -108px;
  // left: -4vw;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  background-color: $wite-color;
  z-index: 99;
  padding-top: 140px;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  backface-visibility: hidden;

  // 头部
  .f-c-time-heaer {
    position: fixed !important;
    top: 0;
    width: 100%;
    background-color: $wite-color;
    z-index: 9999;

   .text-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46px;

      .cancel-button {
        position: absolute;
        left: 0;
        display: block;
        padding: 0 10px;
        font-size: 15px;
        cursor: pointer;
        height: 100%;
        line-height: 46px;
        width: 45px;
      }

      h3 {
        margin: 0;
        padding: 0;
        font-size: 18px;
      }
    }
  }

  .day-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 20px 0;
    font-size: 13px;

    & :first-child,
    & :last-child {
      color: $adv-font-color;
    }

    li {
      list-style: none;
      text-align: center;
      width: calc(100% / 7);
    }
  }

  // 每个月标题
  .f-c-now-mon-box {
    position: sticky;
    height: 36px;
    line-height: 36px;
    text-align: center;
    width: 100%;
    // margin: 10px 0 0 0;
    border-top: 1px solid #ebedf0;
    font-weight: 700;
    font-size: 18px;
    color: #292c33;
  }

  .fixed-title {
    position: fixed;
    top: 96px;
    box-shadow: 0 2px 1px rgba(0, 0, 0, .06);
    background-color: #fff;
    z-index: 999;
  }

  .f-c-cal-sec {
    display: flex;
    flex-direction: column;

    .cal-item {
      display: flex;
      flex-wrap: wrap;

      .day-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 58px;
        width: calc(100% / 7);
        text-align: center;
        font-size: 18px;
        color: #292c33;
        border-radius: 10px;
        font-weight: 700;
      }

      .today {
        background-color: $yel-color;
      }

      .holiday {
        position: absolute;
        top: 5px;
        margin: 0 auto;
        font-size: 10px;
        font-weight: 400;
      }

      .passed {
        color: #d2d4d9;
        background: none!important;
      }
    }
  } 
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