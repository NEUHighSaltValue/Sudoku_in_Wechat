// pages/waiting/waiting.js
let levelTable=["入门级","初级","中级","高级","骨灰级"]
let typeTable=["普通数独","对角线数独"]
var gameid, level, roomid;
var value
var showTime = 0;
var hideTime = 0;
var isMaster=0
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
    console.log("load")
    console.log('op', options)
    level = options.level;
    roomid = options.roomid
    gameid=options.gameid;
    isMaster = options.isMaster

    wx.setStorage({
      key: 'roomid',
      data: roomid,
    })
    var that = this
    try {
      value = wx.getStorageSync('openid')
      console.log(value)
      if(value) {
        //console.log('value')
        let tempSudokuName = typeTable[parseInt( level / 5)];
        let tempTypeName = levelTable[level % 5];
        //console.log(tempSudokuName, tempTypeName)
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
        //console.log('myInfo', this.data.myInfo.info)
      }
    } catch(e) {
      //console.log(e)
    }
    wx.connectSocket({
      url: 'wss://www.tianzhipengfei.xin/pk',
    })

    //console.log(JSON.stringify(that.data.myInfo))
    
  },

  onShow:function() {

    this.setData({
      userInfoList: {}
    })
    console.log('show')
    var that = this
    console.log("Show Time: ",showTime)
    showTime=showTime+1;
    let myInfo = {
      key: 1,
      info: {
        isMaster: parseInt(isMaster),
        url: getApp().globalData.userInfo.avatarUrl,
        openid: value,
        roomId: roomid,
        isReady: 0
      }
    }
    wx.onSocketOpen(function (res) {
      console.log('send')
      wx.sendSocketMessage({
        data: JSON.stringify(myInfo)
      })
      that.readMessage()
      console.log('change')
    })
    console.log("add queue in show")
  },

  startPK() {
    //console.log(this.data.userInfoList)
    for(var i = 0; i < this.data.userInfoList.length; i++) {
      if(parseInt(this.data.userInfoList[i].isReady) == 0)
        return
    }
    this.setData({
      myInfo: {
        key: 1,
        info: {
          isMaster: 1,
          url: this.data.myInfo.info.url,
          openid: this.data.myInfo.info.openid,
          roomId: this.data.myInfo.info.roomId,
          isReady: 1
        }
      }
    })
    wx.sendSocketMessage({
      data: JSON.stringify(this.data.myInfo),
    })
    console.log(this.data.myInfo)
    wx.redirectTo({
      url: '/pages/pk_sudoku/pk_sudoku?gameid=' + gameid,
    })
  },

  readyChange() {
    //console.log('ready')
    var that = this
    try {
      if (value) {
        console.log('change2')
        this.setData({
          myInfo: {
            key: 1,
            info: {
              isMaster: this.data.isMaster,
              url: getApp().globalData.userInfo.avatarUrl,
              openid: value,
              roomId: this.data.roomId,
              isReady: parseInt(this.data.myInfo.info.isReady)==0 ? 1 : 0
            }
          }
        })
        //console.log(this.data.myInfo)
      }
    } catch (e) {
      // Do something when catch error
    }
    //console.log(JSON.stringify(this.data.myInfo))
    wx.sendSocketMessage({
      data: JSON.stringify(this.data.myInfo)
    })
    wx.onSocketError(function(res) {
      //console.log('error')
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // onReady: function () {
  //   let that = this;
  //   wx.onSocketOpen(function (res) {
  //     console.log('send')
  //     wx.sendSocketMessage({
  //       data: JSON.stringify(that.data.myInfo)
  //     })
  //     that.readMessage()
  //     console.log('change')
  //   })
  //   console.log("add queue in ready")
  // },

  // onUnload: function() {
  //   //console.log('un')
  //   wx.onSocketMessage(function(res){
  //     console.log(res)
  //   })
  //   wx.closeSocket({
      
  //   })
  // },

  onHide: function() {
    // console.log('hide')
    // console.log('Hide time: ',hideTime)
    // hideTime = hideTime + 1
    
    // console.log(value, "leave queue")
    //   var myInfo = {
    //     key: 5,
    //     info: {
    //       roomId: this.data.roomId,
    //       openid: value
    //     }
    //   }
    //     wx.sendSocketMessage({
    //       data: JSON.stringify(myInfo),
    //     })
    //     console.log("leave queue in hide")
      
      // if (this.data.flag) {
      //   this.setData({
      //     flag: false
      //   })
      // }
},

  readMessage() {
    var infos
    var infolist = []
    var that = this
    //console.log('read')
    wx.onSocketMessage(function(res){
      console.log('change3')
      infos = JSON.parse(res.data).info
      console.log('infos', JSON.parse(res.data))
      if(infos){
        console.log('infos', infos)
        if (infos.Master) {
          that.setData({
            masterInfo: infos.Master
          })
        }
        if(parseInt(infos.Master.isStart) == 1) {
          wx.redirectTo({
            url: '/pages/pk_sudoku/pk_sudoku?gameid=' + gameid,
          })
        }
        for (var i = 0; i < infos.members.length; i++) {
          infolist[i] = infos.members[i]
          infolist[i].key = i + 1
        }
        that.setData({
          userInfoList: infolist
        })
        infolist = []
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
            path: '/pages/index/index?type=pk&level=' + level + '&roomid=' + roomid + '&gameid=' + gameid
+ '&isMaster=' + 0,
            success: function (res) {
                //console.log('success')
            },
            fail: function (res) {
                //console.log('fail')
            }
        }
      }
  },
  inviteFriends: function(){
    this.onShareAppMessage()
  }
})