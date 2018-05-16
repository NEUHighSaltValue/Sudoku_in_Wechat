// pages/waiting/waiting.js
let levelTable=["入门级","初级","中级","高级","骨灰级"]
let typeTable=["普通数独","对角线数独"]
var gameid, level, roomid;
var value
Page({

  /**
   * 页面的初始数据
   */
data: {
    sudokuName: "",
    levelName: "",
    roomId:"",
    isMaster: false,
    masterInfo: {
      url: "",
      isStart: 0
    },
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
    console.log('op', options)
    level = options.level;
    roomid = options.roomid
    gameid=options.gameid;
    var that = this
    try {
      value = wx.getStorageSync('openid')
      if(value) {
        //console.log('value')
        let tempSudokuName = typeTable[parseInt( level / 5)];
        let tempTypeName = levelTable[level % 5];
        console.log(tempSudokuName, tempTypeName)
        that.setData({  
            roomId: roomid,
            sudokuName: typeTable[parseInt(level / 5)],
            levelName: levelTable[level%5],
            myInfo: {
              key: 1,
              info: {
                isMaster: parseInt(options.isMaster),
                url: getApp().globalData.userInfo.avatarUrl,
                openid: value,
                roomId: roomid,
                isReady: 0
              }
            }
        })
        console.log('myInfo', this.data.myInfo.info)
      }
    } catch(e) {
      console.log(e)
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
    //console.log(JSON.stringify(that.data.myInfo))
  },

  OnShow() {
    wx.onSocketOpen(function(res) {
      console.log('grasp')
      wx.onSocketMessage(function(res){
        console.log(res.data)
      })
    })
  },

  startPK() {
    wx.redirectTo({
      url: '/pages/pk_sudoku/pk_sudoku?gameid=' + gameid,
    })
  },

  readyChange() {
    console.log('ready')
    var that = this
    try {
      if (value) {
        this.setData({
          myInfo: {
            key: 1,
            info: {
              isMaster: this.data.isMaster,
              url: getApp().globalData.userInfo.avatarUrl,
              openid: value,
              roomId: this.data.roomId,
              isReady: !this.data.myInfo.info.isReady
            }
          }
        })
        console.log(this.data.myInfo)
      }
    } catch (e) {
      // Do something when catch error
    }
    //console.log(JSON.stringify(this.data.myInfo))
    wx.sendSocketMessage({
      data: JSON.stringify(this.data.myInfo)
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

  onUnload: function() {
    console.log('un')
    this.setData({
      myInfo: {
        key: 5,
        info: {
          roomId: this.data.roomId,
          openid: value
        }
      }
    })
    wx.sendSocketMessage({
      data: this.data.myInfo,
    })
    wx.closeSocket({
      
    })
  },

  onHide: function() {
    console.log('hi')
  },

  readMessage() {
    var infos
    var infolist = []
    var that = this
    //console.log('read')
    wx.onSocketMessage(function(res){
      infos = JSON.parse(res.data).info
      console.log('infos', JSON.parse(res.data))
      if(infos){
        console.log(infos)
        if (infos.Master) {
          that.setData({
            masterInfo: infos.Master
          })
        }
        for (var i = 0; i < infos.members.length; i++) {
          infolist[i] = infos.members[i]
          infolist[i].key = i + 1
        }
        that.setData({
          userInfoList: infolist
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
      //console.log(res)
      if(this.data.sudokuName) {
        //console.log(res)
        return {
            title: '敢来和我一起挑战'+this.data.levelName+this.data.sudokuName+"吗",
            path: '/pages/waiting/waiting?level=' + level + '&roomid=' + roomid + '&gameid=' + gameid
            + '&isMaster=' + 0,
            success: function (res) {
                console.log('success')
            },
            fail: function (res) {
                console.log('fail')
            }
        }
      }
  },
  inviteFriends: function(){
    this.onShareAppMessage()
  }
})