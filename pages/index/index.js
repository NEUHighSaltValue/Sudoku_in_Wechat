  //index.js
//获取应用实例
var scene
const app = getApp()
Page({
  data: {
      buttonClicked: true,
      imgurl: ''
  },
  onShow(){

      wx.getSetting({
          success: res => {
              if (res.authSetting['scope.userInfo']) {
                  console.log("index")
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                      success: res => {
                          console.log("1", res)
                          // 可以将 res 发送给后台解码出 unionId
                      },
                      complete: res => {
                          console.log("2", res.rawData)
                          let nickName = res.rawData.split('\"nickName\":\"')[1].split('\"')[0]
                          let imgurl = res.rawData.split('\"avatarUrl\":\"')[1].split('\"')[0]
                          console.log(imgurl)

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
        success: function(res) {
          var NetworkType = res.networkType
          if(NetworkType == "none") {
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
          }
        },
      })
  },
  toFight() {
      if(!this.data.buttonClicked) { return }
      buttonClicked(this)
      wx.getNetworkType({
        success: function(res) {
          var NetworkType = res.networkType
          if(NetworkType == "none") {
            wx.showModal({
              title: '提示',
              content: '网络异常，无法进行对战',
            })
          }
          else {
            wx.navigateTo({
              url: '/pages/fight/fight',
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
  toSetting(){
      if (!this.data.buttonClicked) { return }
      buttonClicked(this);
      wx.navigateTo({
          url: '/pages/setting/setting',
      })
  },
  onLoad: function (options) {
      scene = decodeURIComponent(options.scene)
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

