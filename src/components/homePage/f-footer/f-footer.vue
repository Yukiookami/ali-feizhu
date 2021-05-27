<template>
  <footer class="f-footer-sec">
    <template v-for="(item, index) in footerList" :key="`footerList${index}`">
      <f-footer-button v-if="item.type === pageTag" 
      :icon="item.icon" :title="item.title" :router="item.router"></f-footer-button>
    </template>
  </footer>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import fFooterButton from './f-footer-button'
import { computed, getCurrentInstance } from '@vue/runtime-core'
export default {
  setup () {
    const state = reactive({
      /**
       * 获取当前页面路由
       * 
       * @returns {String}
       */
      pageTag: computed(() => {
        const { ctx }= getCurrentInstance()
        const pageName = ctx.$router.currentRoute.value.path.substr(1)

        if (pageName !== 'trainTicket' && pageName !== 'busTicket') {
          return 'trainTicket'
        }

        return pageName
      }),
      // 页脚元素
      footerList: [
        {
          title: '登录12306',
          icon: require('../../../assets/img/footerImg/12306.png'),
          type: 'trainTicket',
          router: 'https://login.m.taobao.com/login.htm?tpl_redirect_url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Ftrip%2Fh5-train-12306%2Fpages%2Fnormal-login%2Findex.html%3Forigin%3DtrafficSearchHome%26ttid%3D201300%2540travel_h5_3.1.0%26spm%3D181.7406756.10840104.10%26scm%3D%26_preProjVer%3D1.25.0%26_projVer%3D0.31.9'
        },
        {
          title: '联系飞猪',
          icon: require('../../../assets/img/footerImg/feizhu.png'),
          type: 'trainTicket',
          router: 'https://login.m.taobao.com/login.htm?tpl_redirect_url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Ftrip%2Fh5-train-12306%2Fpages%2Fnormal-login%2Findex.html%3Forigin%3DtrafficSearchHome%26ttid%3D201300%2540travel_h5_3.1.0%26spm%3D181.7406756.10840104.10%26scm%3D%26_preProjVer%3D1.25.0%26_projVer%3D0.31.9'
        },
        {
          title: '订单・退订・改签',
          icon: require('../../../assets/img/footerImg/order.png'),
          type: 'trainTicket',
          router: 'https://login.m.taobao.com/login.htm?tpl_redirect_url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Ftrip%2Fh5-train-12306%2Fpages%2Fnormal-login%2Findex.html%3Forigin%3DtrafficSearchHome%26ttid%3D201300%2540travel_h5_3.1.0%26spm%3D181.7406756.10840104.10%26scm%3D%26_preProjVer%3D1.25.0%26_projVer%3D0.31.9'
        },
        {
          title: '我的订单',
          icon: require('../../../assets/img/footerImg/myorder.png'),
          type: 'busTicket',
          router: 'https://login.m.taobao.com/login.htm?tpl_redirect_url=https%3A%2F%2Fmarket.m.taobao.com%2Fapp%2Ftrip%2Fh5-train-12306%2Fpages%2Fnormal-login%2Findex.html%3Forigin%3DtrafficSearchHome%26ttid%3D201300%2540travel_h5_3.1.0%26spm%3D181.7406756.10840104.10%26scm%3D%26_preProjVer%3D1.25.0%26_projVer%3D0.31.9'
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  },
  components: {
    fFooterButton
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/variable.scss';

.f-footer-sec {
  position: fixed;
  display: flex;
  justify-content: space-around;
  align-items: center;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-color: $wite-color;
  width: 100vw;
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
}
</style>