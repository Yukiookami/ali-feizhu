<template>
  <transition name="panel">
    <div class="add-person-sec" v-if="isShowAddPerson">
      <!-- 乘客类型 -->
      <div class="person-type content-box">
        <span class="title-span">乘客类型</span>
        <div class="type-box">
          <div :class="{'seled': selNum === index}" @click="changeSel(index)"
          class="sel-item" v-for="(item, index) in pType" :key="`p${index}`">
            {{item.name}}
          </div>
        </div>
      </div>

      <!-- 乘客信息 -->
      <div class="person-info">
        <div class="content-box info-box">
          <span class="title-span">姓名</span>
          <input type="text" v-model="pInfo.name" class="content-input" placeholder="与乘客证件一致">
          <i class="tip-icon"></i>
        </div>

        <div class="content-box info-box">
          <span class="title-span">证件类型</span>
          <sel-panel @getSel="changeZ" :selList="zSelList"></sel-panel>
        </div>

        <div class="content-box">
          <span class="title-span">证件号码</span>
          <input type="text" v-model="pInfo.zNum" class="content-input" placeholder="与乘客证件一致">
        </div>

        <div class="content-box">
          <span class="title-span">性别</span>
          <sel-panel @getSel="changeX" :selList="xSelList"></sel-panel>
        </div>

        <div class="content-box">
          <span class="title-span">手机(+86)</span>
          <input type="text" v-model="pInfo.phone" class="content-input" placeholder="请输入手机号">
        </div>
      </div>

      <button @click="getP" class="next-button">下一步</button>
    </div>
  </transition>
  <f-massage :msg="msg" :showMidZ="showMidZ"></f-massage>
</template>

<script>
import { reactive, toRefs } from 'vue'
import selPanel from './selPanel.vue'
import  { testPhone, testId, testName } from '../../assets/js/check'
import fMassage from '../common/f-massage.vue'

export default {
  props: ['isShowAddPerson'],
  emits: ['getPInfo'],
  setup (props, context) {
    const state = reactive({
      // 乘客类型
      pType: [
        {
          name: '成人'
        },
        {
          name: '儿童'
        },
        {
          name: '学生'
        }
      ],
      // 当前选择类型
      selNum: 0,
      // 更改选择类型
      changeSel: index => {
        state.pInfo.type = state.pType[index].name
        state.selNum = index
      },
      // 证件选择
      zSelList: [
        {
          selName: '身份证'
        },
        {
          selName: '护照'
        },
        {
          selName: '港澳居民往来内地通行证'
        },
        {
          selName: '台湾居民往来内地通行证'
        },
        {
          selName: '外国人永久居留身份证'
        },
        {
          selName: '港澳居民居住证'
        },
        {
          selName: '台湾居民居住证'
        }
      ],
      // 性别选择
      xSelList: [
        {
          selName: '男'
        },
        {
          selName: '女'
        }
      ],
      // 乘客信息
      pInfo: {
        type: '成人',
        name: '',
        zType: '身份证',
        zNum: '',
        sex: '男',
        phone: ''
      },
      // 更改乘客证件类型
      changeZ: sel => {
        state.pInfo.zType = sel
      },
      // 更改乘客性别
      changeX: sel => {
        state.pInfo.sex = sel
      },
      // 完成用户信息录入
      getP: () => {
        let checkFlag = false
        let idFlag = true
        let pInfo = state.pInfo
        
        for (let i in pInfo) {
          if (pInfo[i] === '') {
            checkFlag = true
          }
        }

        if (!checkFlag) {
          let res = {}
          if (pInfo.zType === '身份证') {
            res = testId(pInfo.zNum)
          } else {
            res.status = 1
          }

          let resPhone = testPhone(pInfo.phone)
          let resName = testName(pInfo.name, 2, 8)
          
          if (res.status && resPhone.status && resName.status) {
            idFlag = false
          } else {
            if (!res.status) {
              state.showMsg(res.msg)
            } else if (!resPhone.status) {
              state.showMsg(resPhone.msg)
            } else if (!resName.status) {
              state.showMsg(resName.msg)
            }
          }
        } else {
          state.showMsg('请填写完整')
        }

        if (!checkFlag && !idFlag) {
          context.emit('getPInfo', state.pInfo)
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
    selPanel,
    fMassage
  }
}
</script>

<style lang="scss" scoped>
.add-person-sec {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f4f4f4;
  padding-top: 10px;
  z-index: 10;

  .title-span {
    display: block;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    color: #666;
    min-width: 75px;
  }

  .content-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    margin-bottom: 10px;
    padding: 10px;
  }

  .content-input {
    border: none;
    outline: none;
    font-size: 15px;
    flex: 1;
  }

  .info-box {
    margin-bottom: 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  .person-type {
    font-size: 15px;

    .type-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;

      .sel-item {
        background-color: #fff;
        position: relative;
        border-radius: 3px;
        text-align: center;
        line-height: 36px;
        width: 78px;
        height: 36px;
        margin-right: 15px;
        border: 1px solid rgba(0, 0, 0, .1);
      }

      .seled {
        background-color: #fd0;
        border: 1px solid transparent;
      }
    }
  }

  .tip-icon {
    position: absolute;
    background: url('../../assets/img/tickPage/gimon.png') no-repeat;
    background-size: 22px auto;
    background-position: center;
    display: inline-block;
    width: 34px;
    height: 22px;
    right: 0;
    top: 10px;
    border-left: 1px solid #e0e0e0;
  }

  .next-button {
    height: 44px;
    width: calc(100% - 24px);
    border-radius: 3px;
    line-height: 44px;
    border: none;
    background-color: #ffc900;
    color: #3d3d3d;
    font-size: 18px;
    text-align: center;
    margin: 18px 12px;
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