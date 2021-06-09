<template>
  <div class="pay-page">
    <f-choose-time showModel="1" noColor="1" noAji="1" v-if="!nowT"></f-choose-time>

    <!-- 火车票票头 -->
    <div class="train-sec" v-if="!nowT">
      <div class="tar-sec-info">
        <div class="top-box">
          <div class="city-box">
            <span class="city-span">{{info.depCity}}</span>
            <span class="time-span">{{info.depTime}}</span>
          </div>

          <div class="all-time-box">
            <span class="bango-span">{{info.bango}}</span>

            <div class="long-line">
              <i class="tan"></i>
              <i class="line"></i>
              <i class="last-tan"></i>
            </div>

            <span class="all-time-span">{{info.allTime}}</span>
          </div>

          <div class="city-box">
            <span class="city-span right-city">{{info.tarCity}}</span>
            <span class="time-span">{{info.tarTime}}</span>
          </div>
        </div>

        <router-link to="/pay" 
        class="bottom-box">
          <div>
            <img src="../assets/img/tickPage/waring.png" alt="">
            <span>退票、改签低价票有手续费</span>
          </div>

          <div class="canle">
            <span>购票退改须知</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- 汽车票票头 -->
    <div class="car-sec" v-if="nowT === 1">
      <div class="time-box">
        <span class="now-time">{{nowTime}} {{info.depTime}}-{{info.tarTime}}出发</span>
        <span>滚动发车</span>
      </div>

      <div>
        <span>{{info.depCity}} - {{info.tarCity}}</span>
      </div>
    </div>

    <!-- 添加乘车人 -->
    <div class="add-person">
      <button @click="changeNewShow">添加乘车人</button>
      <span>请确保姓名，证件号码填写正确</span>

      <div class="user-sec">
        <div v-for="(item, index) in buyUserList" class="user-item top-border"
        @click="userChoose(index)"
        :key="`list${index}`">
          <div class="left">
            <div class="name-box">
              <span class="name">{{item.name}}</span>
              <span class="type">{{item.type}}</span>
            </div>

            <div class="z-box">
              <span>{{item.zType}}</span>
              <span class="z-num">{{item.nowzNum}}</span>
            </div>
          </div>

          <div class="right">
            <i class="sel-button del-button" @click="delUser(index)"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 乘车人面板 -->
    <transition name="mask">
      <div class="mask" @click="changeNewShow" v-if="isShowAddNew"></div>
    </transition>
    <transition name="panel">
      <div class="add-person-panel" v-if="isShowAddNew">
        <div class="kakunin">
          <span class="console">取消</span>
          <span class="ok" @click="changeNewShow(1)">确定</span>
        </div>

        <div @click="changeShow" class="add-new-box">
          <img src="../assets/img/tickPage/add.png" alt="">
          <span>新增乘车人</span>
        </div>

        <div class="user-sec">
          <div v-for="(item, index) in userList" class="user-item"
          @click="userChoose(index)"
          :key="`list${index}`">
            <div class="left">
              <div class="name-box">
                <span class="name">{{item.name}}</span>
                <span class="type">{{item.type}}</span>
              </div>

              <div class="z-box">
                <span>{{item.zType}}</span>
                <span class="z-num">{{item.nowzNum}}</span>
              </div>
            </div>

            <div class="right">
              <i class="sel-button" :class="{'seled': userSelNum === index}"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <add-person @getPInfo="getPInfo" :isShowAddPerson="isShowAddPerson"></add-person>

    <!-- 填写手机号码 -->
    <div class="add-phone">
      <span>手机号</span>
      <input type="text" v-model="phone" placeholder="用于接收短信">
      <img src="../assets/img/tickPage/user.png" alt="">
    </div>

    <!-- 页脚 -->
    <footer class="pay-footer">
      <div class="price">
        <span class="price-text"><i class="senbo">¥</i>{{contMoney}}</span>
        <span class="yosou">预计总价</span>
      </div>

      <button @click="pay" class="pay-now" :class="{'can-pay': contMoney !== '--'}">立即预订</button>
    </footer>
  </div>
  <f-massage :msg="msg" :showMidZ="showMidZ"></f-massage>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import fChooseTime from '../components/common/f-choose-time.vue'
import store from '../store'
import  { testPhone } from '../assets/js/check'
import fMassage from '../components/common/f-massage.vue'
import addPerson from '../components/tickPage/addPerson.vue'

export default {
  setup () {
    const state = reactive({
      // 当前页面模式
      nowT: computed(() => store.state.tickMode),
      // 票体信息
      info: computed(() => store.state.tickInfo),
      // 当前时间
      nowTime: computed(() => `${store.state.time.time} ${store.state.time.goTime}`),
      // 最终钱
      contMoney: computed(() => {
        if (state.buyUserList.length) {
          return state.buyUserList.length * state.info.money
        } else {
          return '--'
        }
      }),
      // 是否显示新增乘车人
      isShowAddNew: false,
      changeNewShow: flag => {
        if (flag === 1 && !isNaN(state.userSelNum)) {
          if (state.buyUserList.forEach(ele => {
            if (ele.zNum === state.userList[state.userSelNum].zNum) {
              return false
            } else {
              return true
            }
          }) || !state.buyUserList.length) {
            state.buyUserList.push(state.userList[state.userSelNum])
          } else {
            state.showMsg('请勿重复添加')
          }
        }
        state.isShowAddNew = !state.isShowAddNew
      },
      // 是否显示乘车人面板
      isShowAddPerson: false,
      // 更改面板显示
      changeShow: () => {
        state.isShowAddPerson = !state.isShowAddPerson
      },
      // 获得添加用户信息
      getPInfo: info => {
        let zNum = info.zNum
        info.nowzNum = zNum.substr(0,1) + '*******' + zNum.substr(zNum.length - 1)

        state.userList.push(info)
        state.changeShow()
      },
      // 用户列表
      userList: [],
      // 用户选择
      userSelNum: '',
      userChoose: index => {
        state.userSelNum = index
      },
      // 购票用户列表
      buyUserList: [],
      // 删除用户
      delUser: index => {
        state.buyUserList.splice(index, 1)
      },
      // 用户手机
      phone: '',
      // 支付
      pay: () => {
        if (testPhone(state.phone).status && state.buyUserList.length) {
          state.showMsg('支付成功')
        } else {
          state.showMsg('请正确填写')
        }
      },
      // 是否显示消息
      showMidZ: false,
      msg: '',
      // 控制消息显示
      showMsg: msg => {
        state.msg = msg
        state.showMidZ = true

        setTimeout(() => {
          state.showMidZ = false
        }, 800)
      }
    })
  
    return {
      ...toRefs(state),
    }
  },
  components: { 
    fChooseTime,
    addPerson,
    fMassage
  }
}
</script>

<style lang="scss" scoped>
.pay-page {
  background-image: linear-gradient(#f7ca45, rgba(0, 0, 0, 0) 300px);
  background-color: #f4f4f4;
  padding: 10px;
  width: calc(100vw - 20px);
  min-height: calc(100vh - 20px);

  // 火车
  .tar-sec-info {
    overflow: hidden;
    background-color: #fff;
    color: #3d3d3d;
    font-size: 20px;
    margin: 15px 0 10px 0;
    border-radius: 5px;
  
    .top-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px dashed #f4f4f4;
      border-bottom: 1px dashed #f4f4f4;
      padding: 10px;
  
      .city-box {
        display: flex;
        flex-direction: column;
        font-weight: 800;
  
        .city-span {
          font-size: 14px;
          font-weight: normal;
        }
  
        .right-city {
          text-align: end;
        }
      }
  
      .all-time-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
  
        .bango-span {
          font-size: 12px;
        }
  
        .long-line {
          display: flex;
          align-items: center;
          
          .tan {
            display: block;
            width: 8px;
            height: 8px;
            background-color: #e0e0e0;
            border-radius: 50%;
          }
  
          .line {
            display: block;
            width: 43px;
            height: 2px;
            background-color: #e0e0e0;
            margin: 6px 2px;
          }
  
          .last-tan {
            display: block;
            width: 7px;
            height: 7px;
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 50%;
          }
        }
  
        .all-time-span {
          font-size: 14px;
        }
      }
  
      .money-box {
        height: 44px;
  
        .money-span {
          color: #ff5000;
        }
  
        .very-small {
          font-size: 12px;
          color: #a5a5a5;
          margin-left: 3px;
        }
      }
    }
  
    .bottom-box {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #666;
      padding: 15px;
      background-color: #fffdf6;
      text-decoration: none;
  
      img {
        width: 14px;
        margin-right: 5px;
      }

      div {
        display: flex;
        align-items: center;
      }

      .canle {
        position: relative;
        color: #fca500;

        &::after {
          content: '';
          display: block;
          background-image: url('../assets/img/tickPage/ajirush.svg');
          background-size: 100%;
          height: 13px;
          line-height: 13px;
          width: 13px;
        }
      }
    }
  }

  // 汽车
  .car-sec {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    font-size: 13px;
    color: #333;

    .time-box {
      margin-bottom: 10px;
    }
    .now-time {
      font-size: 15px;
      font-weight: 700;
      margin-right: 10px;
    }
  }

  // 添加乘车人
  .add-person {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
    font-size: 14px;

    button {
      width: 145px;
      color: #333;
      border: none;
      padding: 10px 0;
      margin-bottom: 10px;
      background-image: linear-gradient(
      90deg
      ,#ffdc00,#ffc900);
      border-radius: 5px;
    }

    span {
      color: #999;
    }
  }

  // 添加手机号码
  .add-phone {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #fff;
    border-radius: 15px;
    margin-top: 10px;
    padding: 15px 10px;
    font-size: 14px;
    color: #666;

    span {
      min-width: 75px;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      line-height: 20px;
      padding: 0 10px;
    }

    img {
      width: 20px;
    }
  }

  // 页脚
  .pay-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;

    .price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .price-text {
        color: #ff5000;
        font-size: 20px;
        
        .senbo {
          font-style: normal;
          font-size: 12px;
          margin-right: 2px;
        }
      }

      .yosou {
        color: #a5a5a5;
        font-size: 12px;
      }
    }

    .pay-now {
      display: block;
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      font-size: 16px;
      font-weight: 700;
      margin-left: 12px;
      border-radius: 20px;
      border: none;
      background-color: #ebebf0;
      color: #d2d2d2;
    }

    .can-pay {
      background-color: #ff401a;
      color: #fff;
    }
  }

  // 乘车人面板
  .add-person-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 380px;
    background-color: #f4f4f4;
    z-index: 9;
    padding: 10px;
    font-size: 15px;

    .kakunin {
      display: flex;
      justify-content: space-between;

      .ok {
        font-weight: 700;
      }
    }

    .add-new-box {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fca500;
      background-color: #fff;
      margin-top: 10px;
      padding: 10px;
      border: 10px;
      z-index: 999;
      border-radius: 5px;

      img {
        width: 19px;
        margin-right: 5px;
      }
    }
  }

  // 用户列表
  .user-sec {
    display: flex;
    flex-direction: column;
    width: 100%;

    .user-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;

      .left {
        color: #333;

        .name-box {
          display: flex;
          margin-bottom: 8px;

          .name {
            font-size: 14px;
            font-weight: 700;
            margin-right: 8px;
            vertical-align: bottom;
          }

          .type {
            font-size: 11px;
            display: inline-block;
            line-height: 16px;
            height: 16px;
            padding: 0 3px;
            color: #999;
            position: relative;
            vertical-align: middle;
            border: 1px solid rgba(0, 0, 0, .1);
          }
        }

        .z-box {
          font-size: 12px;

          .z-num {
            display: inline-block;
            margin-left: 3px;
          }
        }
      }

      .sel-button {
        display: block;
        background-image: url('../assets/img/tickPage/maru.png');
        width: 21px;
        height: 21px;
        background-size: 100% 100%;
      }

      .seled {
        background-image: url('../assets/img/tickPage/isYou.png');
      }
    }
  }

  .top-border {
    border-top: 1px solid rgba(0, 0, 0, .1);

    .del-button {
      background-image: url('../assets/img/tickPage/del.svg') !important;
    }
  }

  // 遮罩
  .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9;
  }
}

// 面板进出动画
.panel-enter-from,
.panel-leave-to {
  transform: translateY(100vh);
}

.panel-enter-to,
.panel-leave-from {
  transform: translateY(0);
}

.panel-enter-active,
.panel-leave-active {
  transition: all .3s linear
}

// 蒙板进出动画
.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.mask-enter-to,
.mask-leave-from {
  opacity: 1;
}

.mask-enter-active,
.mask-leave-active {
  transition: all .3s linear
}
</style>