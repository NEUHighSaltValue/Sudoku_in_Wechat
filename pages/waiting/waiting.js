// pages/waiting/waiting.js
var levelName="",sudokuName="";
let levelTable=["入门级","初级","中级","高级","骨灰级"]
var gameid;
Page({

  /**
   * 页面的初始数据
   */
    data: {
        sudokuName: "",
        levelName: "",
        roomId:"",
        isReady: false,
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
  readyChange: function(){
    let temp = !this.data.isReady
    this.setData({
      isReady: temp
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let level = options.level;
    let roomid = options.roomid
    gameid=options.gameid;
    var tempSudokuName=""
    if(level<5){
        sudokuName = "数独"; 
        tempSudokuName = "普通数独";
    } else {
        sudokuName = "对角线数独";
        tempSudokuName = "对角线数独";
    }
    levelName = levelTable[level%5]
    var that = this
    try {
      var value = wx.getStorageSync('openid')
      if(value) {
        this.setData({
            roomId: roomid,
            sudokuName: tempSudokuName,
            levelName: levelName,
          userInfoList: [
            { key: 1, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 2, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 3, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 4, isReady: true, userInfo: getApp().globalData.userInfo },
            { key: 5, isReady: true, userInfo: getApp().globalData.userInfo },
            { key: 6, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 7, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 8, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 9, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 10, isReady: false, userInfo: getApp().globalData.userInfo },
            { key: 11, isReady: false, userInfo: getApp().globalData.userInfo }
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
  onShareAppMessage: function (res) {
      return {
          title: '敢来和我一起挑战'+levelName+sudokuName+"吗",
          path: '/page/user?id=123',
          success: function (res) {
              // 转发成功
          },
          fail: function (res) {
              // 转发失败
          }
      }
  },
  inviteFriends: function(){
      this.onShareAppMessage({"from":"button"})
  }
})