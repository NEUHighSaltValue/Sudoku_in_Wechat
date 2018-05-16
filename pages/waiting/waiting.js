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
    userInfoList: [
      {
        key: 0,
        url: "",
        isReady: 0
      },
    ],
    myInfo: {
      key: 1,
      info: {
        isMaster: 0,
        url: "",
        openid: "",
        roomId: 1,
        isReady: 0
      }
    }
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
          myInfo: {
            key: 1,
            info: {
              isMaster: 1,
              url: getApp().globalData.userInfo.avatarUrl,
              openid: value,
              roomId: 1,
              isReady: 0
            }
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
      console.log('send')
      wx.sendSocketMessage({
        data: JSON.stringify(that.data.myInfo)
      })
      that.readMessage()
    })
    console.log(JSON.stringify(that.data.myInfo))
  },

  OnShow() {
    wx.onSocketOpen(function(res) {
      console.log('grasp')
      wx.onSocketMessage(function(res){
        console.log(res.data)
      })
    })
  },

  readyChange() {
    console.log('ready')
    var that = this
    try {
      var value = wx.getStorageSync('openid')
      if (value) {
        this.setData({
          myInfo: {
            key: 1,
            info: {
              isMaster: true,
              url: getApp().globalData.userInfo.avatarUrl,
              openid: value,
              roomId: 1,
              isReady: !that.data.isReady
            }
          }
        })
        console.log(this.data.myInfo)
      }
    } catch (e) {
      // Do something when catch error
    }
    //console.log(JSON.stringify(this.data.myInfo))
    
    wx.onSocketOpen(function (res) {
      console.log('send')
      wx.sendSocketMessage({
        data: JSON.stringify(this.data.myInfo)
      })
      wx.onSocketMessage(function(res){
        console.log('grasp')
        console.log(res.data)
      })
    })
    wx.onSocketError(function(res) {
      console.log('error')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  readMessage() {
    var infos
    var infolist = []
    var that = this
    wx.onSocketMessage(function(res){
      infos = JSON.parse(res.data).info
      if(infos){
        console.log(infos)
        if (infos.Master) {
          infolist[0] = {
            key: 1,
            url: infos.Master.url,
            isReady: infos.Master.isStart
          }
        }
        for (var i = 0; i < infos.members.length; i++) {
          infolist[i + 1] = infos.members[i]
          infolist[i + 1].key = i + 1
        }
        that.setData({
          userInfoList: infolist
        })
      }
    })
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