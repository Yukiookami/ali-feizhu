// mock.js

// 引入mockjs
const Mock = require('mockjs')

// 返回景点数组
const produceNewsData = function () {
  return [
    {
        title: '西栅景区',
        content: '欣赏楼台戏剧,河sssssssss',
        cover: require('../../assets/img/rec-img/cover-1.jpeg')
    },
    {
        title: '乌镇西栅景区',
        content: '当地十分有名的sssssss',
        cover: require('../../assets/img/rec-img/cover-2.jpeg')
    },
    {
        title: '上海南站',
        content: '',
        cover: require('../../assets/img/rec-img/cover-3.jpeg')
    },
    {
        title: '东栅景区',
        content: '寺庙',
        cover: require('../../assets/img/rec-img/cover-4.jpeg')
    }
  ]
}
// 请求该url，就可以返回newsList
Mock.mock('/mock/news', produceNewsData) // 后面讲这个api的使用细节