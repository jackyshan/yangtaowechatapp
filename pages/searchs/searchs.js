//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '阳淘',
    userInfo: {},
    rcmdArr: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  bindKeyInput: function(e) {
    var value = e.detail.value
    console.log(value)

    var that = this

    wx.request({
      url: 'https://api2.lightstao.com/v2.2/app/searchkey',
      data: {
        key: value,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res){
        // success
        console.log(Array.from(res.data.data))
        that.setData({
          rcmdArr:Array.from(res.data.data)
        })
      },
      fail: function(res) {
        // fail
        console.log('失败了')
        console.log(res.errMsg)
      },
      complete: function() {
        // complete
        console.log('结束了')
      }
    })
    
  },
  goToPList: function(e) {
    console.log(e.currentTarget.id)
    wx.navigateTo ({
      url: '../productList/productList?searchName='+e.currentTarget.id
    })
  }
})
