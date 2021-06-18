/*
 * @Author: zxy
 * @Date: 2021-06-09 08:18:39
 * @LastEditTime: 2021-06-18 16:36:25
 * @FilePath: /feizhu/src/assets/js/check.js
 */

// 校验身份证号码
const testId = (id) => {
  // 1 "验证通过!", 0 //校验不通过
  let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
  //号码规则校验
  if (!format.test(id)) {
    return {
      'status': 0,
      'msg': '请检查证件号码'
    }
  }
  //区位码校验
  //出生年月日校验   前正则限制起始年份为1900
  let year = id.substr(6, 4), //身份证年
    month = id.substr(10, 2), //身份证月
    date = id.substr(12, 2), //身份证日
    time = Date.parse(month + '-' + date + '-' + year), //身份证日期时间戳date
    now_time = Date.parse(new Date()), //当前时间戳
    dates = (new Date(year, month, 0)).getDate() //身份证当月天数
  if (time > now_time || date > dates) {
    return {
      'status': 0,
      'msg': '出生日期不合规'
    }
  }
  //校验码判断
  let c = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2) //系数
  let b = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2') //校验码对照表
  let id_array = id.split("")
  let sum = 0
  for (let k = 0; k < 17; k++) {
    sum += parseInt(id_array[k]) * parseInt(c[k])
  }
  if (id_array[17].toUpperCase() != b[sum % 11].toUpperCase()) {
    return {
      'status': 0,
      'msg': '请检查证件号码'
    }
  }
  return {
    'status': 1,
    'msg': ''
  }
}

/**
 * @description: 验证手机号
 * @param {*} phone
 * @return {*}
 */
const testPhone = phone => {
  if(!(/^1[3456789]\d{9}$/.test(phone))){ 
    return {
      'status': 0,
      'msg': '请输入正确手机号'
    }   
  } else{
    return {
      'status': 1,
      'msg': ''
    }  
  }
}

/**
 * @description: 判断名字是否为汉字并且在2-8位之间
 * @param {string} name
 * @param {number} min
 * @param {number} max
 * @return {object}
 */
const testName = (name, min, max) => {
  if (name.length >= min && name.length <= max) {
    if (/^[\u4e00-\u9fa5]+$/.test(name)) {
      return {
        'status': 1,
        'msg': ''
      }  
    } else {
      return {
        'status': 0,
        'msg': '名称必须全为中文'
      }  
    }
  } else {
    return {
      'status': 0,
      'msg': '名字长度应在2-8位'
    }  
  }
}

export {
  testId,
  testPhone,
  testName
}