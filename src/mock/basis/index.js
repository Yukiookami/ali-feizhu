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
        title: '乌镇',
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

// 返回港口数组
const getPort = function () {
  return [
    {
      navTitle: '广西',
      portList: [
        {
          protLineDep: '北海市',
          portLineTar: '海口市',
          group: "B"
        },
        {
          protLineDep: '北海市',
          portLineTar: '涠岛市',
          group: "B"
        },
        {
          protLineDep: '涠岛市',
          portLineTar: '北海市',
          group: "W"
        }
      ]
    },
    {
      navTitle: '粤港澳',
      portList: [
        {
          protLineDep: '深圳市',
          portLineTar: '深圳湾上游',
          group: "S"
        },
        {
          protLineDep: '深圳市',
          portLineTar: '珠海市',
          group: "S"
        },
        {
          protLineDep: '深圳市',
          portLineTar: '中山市',
          group: "S"
        },
        {
          protLineDep: '中山市',
          portLineTar: '深圳市',
          group: "Z"
        },
        {
          protLineDep: '珠海市',
          portLineTar: '深圳市',
          group: "Z"
        },
        {
          protLineDep: '珠海市',
          portLineTar: '海上看珠海',
          group: "Z"
        }
      ]
    }
  ]
}

const getTick = req => {
  let body = JSON.parse(req.body)

  if (!body.travelMode) {
    // 火车
    return [
      {
        id: '1',
        depTime: '06:39',
        depCity: '北京',
        tarTime: '07:48',
        tarCity: '唐山北',
        bango: 'D21',
        allTime: '1时9分',
        money: '44.5',
        first: '有票',
        sen: '有票',
        tachi: '有票'
      },
      {
        id: '2',
        depTime: '06:39',
        depCity: '北京',
        tarTime: '07:48',
        tarCity: '唐山北',
        bango: 'D21',
        allTime: '1时9分',
        money: '44.5',
        first: '有票',
        sen: '有票',
        tachi: '有票'
      },
      {
        id: '3',
        depTime: '06:39',
        depCity: '北京',
        tarTime: '07:48',
        tarCity: '唐山北',
        bango: 'D21',
        allTime: '1时9分',
        money: '44.5',
        first: '有票',
        sen: '有票',
        tachi: '有票'
      },
      {
        id: '4',
        depTime: '06:39',
        depCity: '北京',
        tarTime: '07:48',
        tarCity: '唐山北',
        bango: 'D21',
        allTime: '1时9分',
        money: '44.5',
        first: '有票',
        sen: '有票',
        tachi: '有票'
      }
    ]

  } else if (body.travelMode === 1) {
    // 汽车
    return [
      {
        id: '1',
        depTime: '09:30',
        depCity: '杭州西湖景区',
        tarTime: '21:00',
        tarCity: '乌镇',
        bango: '五座或七座车',
        tickKazo: '20',
        money: '99',
        tag: [
          {
            title: '滚动发车'
          },
          {
            title: '过路车'
          }
        ]
      },
      {
        id: '2',
        depTime: '09:30',
        depCity: '杭州西湖景区',
        tarTime: '21:00',
        tarCity: '乌镇',
        bango: '五座或七座车',
        tickKazo: '20',
        money: '99',
        tag: [
          {
            title: '滚动发车'
          },
          {
            title: '过路车'
          }
        ]
      },
      {
        id: '3',
        depTime: '09:30',
        depCity: '杭州西湖景区',
        tarTime: '21:00',
        tarCity: '乌镇',
        bango: '五座或七座车',
        tickKazo: '20',
        money: '99',
        tag: [
          {
            title: '滚动发车'
          },
          {
            title: '过路车'
          }
        ]
      },
      {
        id: '4',
        depTime: '09:30',
        depCity: '杭州西湖景区',
        tarTime: '21:00',
        tarCity: '乌镇',
        bango: '五座或七座车',
        tickKazo: '20',
        money: '99',
        tag: [
          {
            title: '滚动发车'
          },
          {
            title: '过路车'
          }
        ]
      }
    ]

  } else {
    // 轮船
    return {}
  }
}

const getTickInfo = req => {
  let body = JSON.parse(req.body)
  let id = body.id
  let nowT = body.nowT

  if (id && !nowT) {
    return [
      {
        name: '硬座',
        has: '有票',
        money: '40.5'
      },
      {
        name: '无座',
        has: '有票',
        money: '40.5'
      }
    ]
  } else if (nowT === 1) {
    return [
      {
        title: '乌镇',
        cover: require('../../assets/img/tickPage/cover.jpeg'),
        money: '99',
        tickTitle: '单程票',
        content: '流水线路半小时一班、滚动发车，乘客购票后可以自选班次时间乘车，如时间确定后行程有变可免费改签一次，此'
      }
    ]
  }
}

// 接收埋点
const buriedPoint = req => {
  return req
} 

Mock.mock('/mock/news', produceNewsData)
Mock.mock('/mock/cityList', getCityList)
Mock.mock('/mock/portList', getPort)
Mock.mock('/mock/getTick', getTick)
Mock.mock('/mock/getTickInfo', getTickInfo)
Mock.mock('/mock/buriedPoint', buriedPoint)