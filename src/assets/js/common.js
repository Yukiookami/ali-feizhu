import router from '../../router'

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

export {
  gotoPage
}