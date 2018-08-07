//index.js
//获取应用实例
var scene
const app = getApp()
var storage
let level_js = require('../../pages/index/level.js')
var isPK 
let level
let roomid
let gameid

Page({
  data: {
    buttonClicked: true,
    imgurl: '',
    nickname: "",
    userInformation: true,
    level_item: {
      name: "",
      ratio: 0.0,
      str: ""
    }
  },
  onReady() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              let nickName = res.rawData.split('\"nickName\":\"')[1].split('\"')[0]
              let imgurl = res.rawData.split('\"avatarUrl\":\"')[1].split('\"')[0]
              //console.log(imgurl)
              this.setData({
                imgurl: imgurl,
                nickName: nickName
              })
            }
          })
        }
        else{
            wx.setData({
                userInformation: false
            })
        }
      }
    })
  },
  toNewGame() {
    try {
      var data = wx.getStorageSync('cache')
      if(data != '' && data != NaN) {
        console.log(data)
        wx.showModal({
          title: '提示',
          content: '你有未完成的游戏，是否继续游戏',
          cancelText: '继续游戏',
          confirmText: '新建游戏',
          success: function(res) {
            if(res.confirm) {
              wx.getNetworkType({
                success: function (res) {
                  var NetworkType = res.networkType
                  if (NetworkType == "none") {
                    wx.showModal({
                      title: '提示',
                      content: '网络异常，战绩无法正常记录\n是否确定开始游戏',
                      success: function (res) {
                        if (res.confirm) {
                          wx.navigateTo({
                            url: '/pages/level_select/level_select',
                          })
                        }
                      }
                    })
                  } else {
                    wx.navigateTo({
                      url: '/pages/level_select/level_select',
                    })
                  }
                },
              })
            } else if(res.cancel) {
              wx.navigateTo({
                url: '/pages/sudoku/sudoku?cache=' + data,
              })
            }
          }
        })
      } else {
        wx.getNetworkType({
          success: function (res) {
            var NetworkType = res.networkType
            if (NetworkType == "none") {
              wx.showModal({
                title: '提示',
                content: '网络异常，战绩无法正常记录\n是否确定开始游戏',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '/pages/level_select/level_select',
                    })
                  }
                }
              })
            } else {
              wx.navigateTo({
                url: '/pages/level_select/level_select',
              })
            }
          },
        })
      }
    } catch(e) {

    }
  },
  toResult() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
    wx.navigateTo({
      url: '/pages/result/result?cache=',
    })
  },
  toFight() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this)
    wx.getNetworkType({
      success: function (res) {
        var NetworkType = res.networkType
        if (NetworkType == "none") {
          wx.showModal({
            title: '提示',
            content: '网络异常，无法进行对战',
            showCancel: false
          })
        }
        else {
          wx.getUserInfo({
            success: function(res) {
              wx.navigateTo({
                  url: '/pages/level_select/level_select?mode=pk',
              })
            },
            fail: function(res) {
              wx.showModal({
                title: '提示',
                content: '小程序需要用户授权身份信息才能进行对战功能',
                showCancel: false
              })
            }
          })
        }
      }
    })
  },
  toHelp() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  toSetting() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  toIndex() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
    let that = this;
    wx.getUserInfo({
        success: res => {
            // 可以将 res 发送给后台解码出 unionId
            let nickName = res.rawData.split('\"nickName\":\"')[1].split('\"')[0]
            let imgurl = res.rawData.split('\"avatarUrl\":\"')[1].split('\"')[0]
            console.log(imgurl)
            this.setData({
                imgurl: imgurl,
                nickName: nickName,
                userInformation: true
            })
            var tempAvatarURL = imgurl.replace("wx.qlogo.cn", "tianzhipengfei.xin/wechat_image")
            wx.setStorage({
                key: 'avatar',
                data: tempAvatarURL
            })
            wx.setStorageSync('avatar', tempAvatarURL)
            if(isPK) {
              wx.showModal({
                title: '提示',
                content: '授权成功，是否进入pk房',
                success: function(res) {
                  if(res.confirm) {
                    wx.redirectTo({
                      url: '/pages/waiting/waiting?type=pk&level=' + level + '&roomid=' + roomid + '&gameid=' + gameid + '&isMaster=0',
                    })
                  }
                }
              })
            }
        }        
    })
  },
  onLoad: function (options) {
    console.log(options)
    if (options.type == "pk"){
      isPK = true;
    }
    scene = decodeURIComponent(options.scene)
    var that = this
    var item = level_js.level_ratio()
    
    if(isPK){
      isPK = false
      level=options.level;
      roomid=options.roomid;
      gameid=options.gameid
      wx.request({
        url: 'https://www.tianzhipengfei.xin/sudoku', 
        data: {
          event: 'searchPK',
          searchRoom: roomid
        },
        method: "POST",
        success: function (res) {
          //console.log(res.data)
          
          wx.getUserInfo({
            success: function () {
              console.log(res)
              if(res.data == "True"){
                wx.navigateTo({
                  url: '/pages/waiting/waiting?type=pk&level=' + level + '&roomid=' + roomid + '&gameid=' + gameid + '&isMaster=0'
                })
              }
              else{
                isPK = false               
                wx.showModal({
                  title: '糟糕',
                  content: '游戏已经开始，不能再加入啦！到主页再来一局吧~',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                    } else if (res.cancel) {
                      wx.redirectTo({
                        url: '/pages/index/index',
                      })
                    }
                  }
                })
              }
            },
            fail: function () {
              wx.showModal({
                title: '提示',
                content: '小程序需要用户授权身份信息才能进行对战功能',
                showCancel: false
              })
            }
          })
        }
      })
      
    }
  },
  onShow: function () {
    var item = level_js.level_ratio()
    var that = this
    wx.getUserInfo({
        success: res => {
            that.setData({
                userInformation: true,
                level_item: item
            })
        },
        fail: res => {
            that.setData({
                userInformation: false,
                level_item: item
            })
        }
    })
  },
  showInfo: function(){
      wx.showModal({
          title: '关于我们',
          content: '我们是来自东北大学最高颜值程序组，因为热爱，我们做了这样一个数独小程序，希望能给你带来快乐。任何建议电邮869909541@qq.com',
          cancelText: "自强不息",
          cancelColor: "black",
          confirmText: "知行合一",
          confirmColor: "black"
      })
  }
})

var buttonClicked = function (that) {
  that.setData({
    buttonClicked: false
  })
  setTimeout(function () {
    that.setData({
      buttonClicked: true
    })
  }, 1000);
}