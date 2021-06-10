// axios
import axios from 'axios'
import router from '../../router'

// const { ctx } = getCurrentInstance()
// console.log(getCurrentInstance())

/**
 * 跳转路由
 * 
 * @param {String} name
 */
const gotoPage = name => {
  router.push({
    path: name
  })
} 

// 数据埋点
const buriedPoint = req => {
  axios.post('/mock/buriedPoint', req)
}

export {
  gotoPage,
  buriedPoint
}