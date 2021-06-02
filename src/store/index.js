import { createStore } from 'vuex'

export default createStore({
  state: {
    // 搜索条件
    condition: [],
    // 出发地（城市）
    depCity: '',
    // 到达地（城市）
    targetCity: '',
    // 出发地（景点）
    depArrt: '',
    // 到达地（景点）
    targetArrt: '',
    // 出发地（港口）
    depPort: '',
    // 到达地（港口）
    targetPort: '',
    // 出发时间
    time: ''
  },
  mutations: {
    // 添加条件
    addCond (state, cond) {
      state.condition.push(cond)
    },
    // 删除条件
    delCond (state, cond) {
      let condArr = state.condition
      condArr.splice(condArr.findIndex(cond), 1)  
    },
    // 设置出发地(城市)
    setDepCity (state, dep) {
      state.depCity = dep
    },
    // 设置到达地(城市)
    setTargetCity (state, target) {
      state.targetCity = target
    },
    // 设置出发地(景点)
    setDepArrt (state, dep) {
      state.depArrt = dep
    },
    // 设置到达地(景点)
    setTargetArrt (state, target) {
      state.targetArrt = target
    },
    // 设置出发地(港口)
    setDepPort (state, dep) {
      state.depPort = dep
    },
    // 设置到达地(港口)
    setTargetPort (state, target) {
      state.targetPort = target
    },
    // 设置出发时间
    setTime (state, time) {
      state.time = time
    }
  },
  actions: {
  },
  modules: {
  }
})
