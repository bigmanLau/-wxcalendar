function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatTime2(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()



  return [year, month, day].map(formatNumber).join('/')
}
function noData(){
   wx.showToast({
     title: '没有数据了',
   })
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isObject = p => {
  return Object.prototype.toString.call(p) === '[object Object]'
}
const isString = p => {
  return Object.prototype.toString.call(p) === '[object String]'
}
const isArray = p => {
  return Object.prototype.toString.call(p) === '[object Array]'
}

module.exports = {
  formatTime: formatTime,
  formatTime2: formatTime2,
  isObject: isObject,
  isString: isString,
  isArray: isArray,
  noData:noData

}
