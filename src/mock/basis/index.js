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

// 返回城市数组
const getCityList = function () {
  return [
    {
      city: '北京',
      group: 'B'
    },
    {
      city: '成都',
      group: 'C'
    },
    {
      city: '重庆',
      group: 'C'
    },
    {
      city: '长沙',
      group: 'C'
    },
    {
      city: '长春',
      group: 'C'
    },
    {
      city: '大连',
      group: 'D'
    },
    {
      city: '福州',
      group: 'F'
    },
    {
      city: '广州',
      group: 'G'
    },
    {
      city: '哈尔滨',
      group: 'H'
    },
    {
      city: '合肥',
      group: 'H'
    },
    {
      city: '海口',
      group: 'H'
    },
    {
      city: '广州',
      group: 'H'
    },
    {
      city: '上海',
      group: 'S'
    },
    {
      city: '沈阳',
      group: 'S'
    },
    {
      city: '深圳',
      group: 'S'
    },
    {
      city: '苏州',
      group: 'S'
    }
  ]
}

Mock.mock('/mock/news', produceNewsData)
Mock.mock('/mock/cityList', getCityList)