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
    userInformation: true,
    level_item: {
      name: "",
      ratio: 0.0,
      str: ""
    }
  },
  toNewGame() {
      if (app.globalData.userInfo){
          try {
              var data = wx.getStorageSync('cache')
              if (data != '') {
                  wx.showModal({
                      title: '提示',
                      content: '您有未完成的游戏，是否继续游戏',
                      cancelText: '继续游戏',
                      confirmText: '新建游戏',
                      success: function (res) {
                          if (res.confirm) {
                              wx.setStorageSync("lastTime", 0)
                              wx.navigateTo({
                                  url: '/pages/level_select/level_select',
                              })
                          } else if (res.cancel) {
                              wx.navigateTo({
                                  url: '/pages/sudoku/sudoku?cache=' + data,
                              })
                          }
                      }
                  })
              } else {
                  wx.setStorageSync("lastTime", 0)
                  wx.getNetworkType({
                      success: function (res) {
                          wx.navigateTo({
                              url: '/pages/level_select/level_select',
                          })
                      },
                  })
              }
          } catch (e) {
              console.log(e)  //缓存上局游戏的时候的报错
          }
      } else{
          this.setData({
              userInformation: false
          })
          wx.showModal({
              title: '糟糕',
              content: '为了制作专属成就卡片，请您授权个人信息',
              showCancel: false,
              confirmText: "知道了"
          })
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
  onShow: function(){
      var item = level_js.level_ratio()
      this.setData({
          level_item: item
      })
  },
  onLoad: function (options) {
    var item = level_js.level_ratio()
    this.setData({
        level_item: item
    })
    if (options.type == "pk"){
      isPK = true;
    }
    scene = decodeURIComponent(options.scene)
    var that = this
    
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
          wx.getUserInfo({
            success: function () {
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
  showInfo: function(){
      wx.showModal({
          title: '关于我们',
          content: '我们是来自东北大学最高颜值程序组，因为热爱，我们做了这样一个数独小程序，希望能给你带来快乐。任何建议电邮869909541@qq.com，也可添加qq群 818090341',
          cancelText: "自强不息",
          cancelColor: "#000",
          confirmText: "知行合一",
          confirmColor: "#000"
      })
    },
    onShareAppMessage: function () {
        let picNum = Math.floor(Math.random() * 10)+1
        let url = 'https://www.tianzhipengfei.xin/static/share' + picNum.toString() + '.jpg'
        return {
            title: '来啊造作啊',
            path: '/pages/index/index', 
            imageUrl: url,
            success: function (res) {
            },
            
            fail: function (res) {
                wx.showToast({
                    title: '分享失败',
                    icon: 'none',
                    duration: 1000
                })
            }
        }
    },
    bindgetuserinfo: function (e) {
        var that = this;
        console.log(e)
        if (e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            that.setData({
                userInformation: true
            })
        } else {
            console.log(333, '执行到这里，说明拒绝了授权')
            wx.showToast({
                title: "为了您更好的体验,请先同意授权",
                icon: 'none',
                duration: 2000
            });
        }
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