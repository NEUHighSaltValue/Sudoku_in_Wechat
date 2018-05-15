// pages/waiting/waiting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoList: [
      {
        key: 0,
        isReady: false,
        userInfo: {} 
      },
    ],
    myInfo: {
      key: 1,
      info: {
        isMaster: false,
        url: "",
        openid: "",
        roomId: 1,
        isReady: false
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var value = wx.getStorageSync('openid')
      if(value) {
        this.setData({
          userInfoList: [
            { key: 1, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 2, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 3, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 4, isReady: true, userInfo: getApp().globalData.userInfo },
            { key: 5, isReady: true, userInfo: getApp().globalData.userInfo },
            { key: 6, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 7, isReady: false, userInfo: getApp().globalData.userInfo }
          ],
          myInfo: {
            isMaster: true,
            url: getApp().globalData.userInfo.avatarUrl,
          }
        })
      }
    } catch(e) {
      // Do something when catch error
    }
    wx.connectSocket({
      url: 'wss://www.tianzhipengfei.xin/pk',
    })
    wx.onSocketOpen(function (res) {
      wx.sendSocketMessage({
        data: JSON.stringify(that.data.myInfo)
      })
    })
    console.log(JSON.stringify(that.data.myInfo))
  },

  readChange() {
    this.setData
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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