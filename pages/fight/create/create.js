// pages/fight/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    room_number: -1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        userInfo: getApp().globalData.userInfo,
        room_number: options.roomid
    })
  }
})