<!--
 * @Author: zxy
 * @Date: 2021-06-18 18:46:20
 * @LastEditTime: 2021-06-18 20:13:22
 * @FilePath: /feizhu/src/components/aliPayPage/inputPassword.vue
-->
<template>
  <div class="input-bpx">
    <input @keyup.enter="pay()" @focus="changeOutLine" @blur="changeOutLine" 
    class="tel-password" v-model="password" type="tel" maxlength="6">

    <div class="real-show" :class="{'outline-show': outLineFlag}">
      <span class="password-span" v-for="(item, index) in 6" 
      :key="`pass${index}`" :class="{'show': index <= showLength}"></span>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import router from '../../router'

export default {
  props: ['money'],
  setup (props) {
    const state = reactive({
      password: '',
      showLength: computed(() => state.password.length - 1),
      outLineFlag: false,
      changeOutLine: () => {
        state.outLineFlag = !state.outLineFlag 
      },
      pay: () => {
        router.push({
          path: `/aliPaySuccess`,
          query: {
            money: props.money
          }
        })
      }
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.input-bpx {
  position: relative;
  // overflow: hidden;
  border-radius: 10px;

  .tel-password {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 44px;
    overflow: hidden;
    padding: 0!important;
    border-radius: 10px;
    background-clip: padding-box;
    font-size: 24px;
    line-height: 32px;
    outline: none;
    border: none;
  }

  .real-show {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 10px;
    height: 44px;
    width: 100%;
    pointer-events: none;

    .password-span {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ddd;
      background-color: #fff;
      height: 44px;
      flex: 1;
    } 

    .show {
      &::after {
        content: '';
        display: block;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #000;
      }
    }

    & :first-child {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border-left: none;
    }

    & :last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border-right: none;
    }
  }

  .outline-show {
    border: 1px solid #3978f6;
    box-shadow: 0 0 2px #3978f6;
  }
}
</style>