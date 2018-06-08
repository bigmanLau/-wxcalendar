let calendar = require('../../utils/calendar.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollAnimation: true,
    banner:[],
   swiperCurrent:1,
   lastCurrent:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.initDayArray()
    
  },
 initDayArray(){
   wx.showLoading({
     title: '加载中',
   })
   setTimeout(() =>{
     let dat = new Date()
     var nian = dat.getFullYear();//当前年份 
     var yue = dat.getMonth(); //当前月 
     var tian = dat.getDate(); //当前天  
     this.data.banner.push(calendar.createCalendar(nian, yue, 1))
     this.data.banner.push(calendar.createCalendar(nian, yue+1, 1))
     this.data.banner.push(calendar.createCalendar(nian, yue + 2, 1))
     
     this.setData({
       banner: this.data.banner,
       startYear: nian,
       startMonth: yue+1  ,
     })
     wx.hideLoading()
     
   }, 0)
   
   
 },
 goNextMonth(){
   this.dealScroll(this.data.swiperCurrent+1)
 },
 goLastMonth(){
   this.dealScroll(this.data.swiperCurrent - 1)
 },
 
  swiperChange(e){
  
    let current = e.detail.current
    this.dealScroll(current)
    
    
  },
  //日历滚动
  dealScroll(current){
  let changeIndex = current;//改变后的索引
  //首先判断左滑还是右滑动

  if (this.data.swiperCurrent - current > 0) {
    //左滑动
      changeIndex = 1;
      this.dealLeftScroll(changeIndex)
      return
   

  } else if (this.data.swiperCurrent - current < 0) {
    //右滑动 
      changeIndex = 1;
      this.dealRightScroll(changeIndex)
      return   
   
  }
},

  dealLeftScroll(changeIndex){
    this.data.banner.splice(1, 1)
    let temp = []
    temp.push(calendar.createCalendar(this.data.startYear, this.data.startMonth+2, 1))
   
    temp = temp.concat(this.data.banner)
    this.setData({
      banner: temp,
      swiperCurrent: changeIndex,
      startMonth: (--this.data.startMonth > 0 ? this.data.startMonth:12)
    })
    if (this.data.startMonth % 12 == 0) {
      this.setData({
        startYear: this.data.startYear-1,
      })
    }
  },
  dealRightScroll(changeIndex) {
    this.data.banner.splice(0, 1)
    let temp = []
    temp.push(calendar.createCalendar(this.data.startYear, this.data.startMonth+2, 1))

    temp = this.data.banner.concat(temp)
    this.setData({
      banner: temp,
      swiperCurrent: changeIndex,
      startMonth: (++this.data.startMonth <=12? this.data.startMonth : 1)
    })
    if (this.data.startMonth%12==1){
      this.setData({
        startYear: this.data.startYear + 1,
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})