Page({
  data:{
    // text:"这是一个页面"
    hidden: false,
    //搜索名称
    searchName: null,
    //pageindex
    pageIdx: 1,
    //产品列表
    productArr:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)

    var that = this

    var searchName = options.searchName
    console.log(searchName)
    
    that.setData({
        searchName:searchName
    })

    var params = {}
    params["page_index"] = 1
    params["page_size"] = 10
    params["keyword"] = searchName
    
    console.log(JSON.stringify(params))

    wx.request({
      url: 'https://api2.lightstao.com/v2.5/product/search',
      method: 'GET',
      data: {
        search_param: JSON.stringify(params),
        y: ''
      },
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log(res.data)

        that.setData({
            hidden: true
        })

        console.log(Array.from(res.data.data.products))
        that.setData({
          productArr:Array.from(res.data.data.products)
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    var that = this
    wx.setNavigationBarTitle({
        title:that.data.searchName
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  //上拉更多
  lower:function(){
    var that = this;
    console.log("shanglale")
    var params = {}
    params["page_index"] = ++that.data.pageIdx
    params["page_size"] = 10
    params["keyword"] = that.data.searchName

    console.log(JSON.stringify(params))

    wx.request({
    url: 'http://192.168.0.10:8090/v2.5/product/search',
    method: 'GET',
    data: {
        search_param: JSON.stringify(params),
        y: ''
    },
    header: {
        'Content-Type': 'application/json'
    },
    success: function(res) {
        console.log(res.data)

        that.setData({
            hidden: true
        })

        console.log(Array.from(res.data.data.products))
        that.setData({
        productArr:that.data.productArr.concat(Array.from(res.data.data.products))
        })
    }
    })
  },

  goToProductDetail:function(){
    console.log('跳转详情')
    // wx.redirectTo({
    //   url: '../index/index'
    // })
    return
    wx.navigateTo({
      url: '../index/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

})