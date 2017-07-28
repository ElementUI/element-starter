import Vue from 'vue';

/**
 * @description: 给文字内容增加长度限制
 * @param {string} value - content
 * @param {string} num - content’s size
 */
Vue.filter('lineMax', (value, num) => {
  return value.slice(0, num) + '...'
})

/**
 * @description: get momth or day.
 * @param {string} date - event's date
 * @param {string} arg1 - momth or day.
 */
Vue.filter('getTime', (date, arg1) => {
  let i = 1;
  if (arg1 === "month") {
    i = 1;
  } else if (arg1 === "day") {
    i = 2;
  }
  return date.split(" ")[i]
})

Vue.filter('getCn', (data) => {
  switch (data) {
    case 'share':
      return '分享';
      break;
    case 'ask':
      return '问答';
      break;
    case 'job':
      return '招聘';
      break;
    case 'dev':
      return '客户端测试';
      break;
    default:
      return 'error';
  }
})

/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
Vue.filter('formatDate', (str) => {
  if (!str) 
    return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})