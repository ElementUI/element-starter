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
    default:
      return 'error';
  }
})