//index.js
//获取应用实例
var scene
const app = getApp()
var storage
let level_js = require('../../pages/index/level.js')

Page({
  data: {
    buttonClicked: true,
    imgurl: '',
    nickname: "",
    userInformation: false,
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
      }
    })
  },
  toNewGame() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
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
  },
  toResult() {
    if (!this.data.buttonClicked) { return }
    buttonClicked(this);
    wx.navigateTo({
      url: '/pages/result/result',
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
        }        
    })
  },
  onLoad: function (options) {
    scene = decodeURIComponent(options.scene)
    var that = this
    var item = level_js.level_ratio()
    wx.getUserInfo({
      success: res=> {
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
  onShow: function() {
    var item = level_js.level_ratio()
    var that = this
    wx.getUserInfo({
      complete: res => {
        that.setData({
          level_item: item
        })
      }
    })
    //console.log(this.data.level_item)
    //console.log('item', item)
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