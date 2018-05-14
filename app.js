//app.js
App({
  onLaunch: function () {
    wx.authorize({
      scope: 'scope.userInfo',
    })
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              wx.login({
                success: function (res) {
                  if (res.code) {
                    //发起网络请求
                    wx.request({
                      url: 'https://www.tianzhipengfei.xin/sudoku',
                      data: {
                        event: 'getID',
                        code: res.code
                      },
                      method: "POST",
                      success: res => {
                        that.globalData.userInfo2 = res.data
                        var brand = null, sys = null, version = null;
                        wx.getSystemInfo({
                          success: function (res) {
                            brand = res.brand + res.model;
                            sys = res.system;
                            version = res.version;
                          }
                        })
                        wx.request({
                          url: 'https://www.tianzhipengfei.xin/sudoku',
                          data: {
                            event: 'login',
                            openid: that.globalData.userInfo2.openid,
                            avatar: that.globalData.userInfo.avatarUrl,
                            mobile: brand,
                            system: sys,
                            version: version
                          },
                          method: "POST",
                          success: res => {
                            wx.setStorage({
                              key: 'openid',
                              data: that.globalData.userInfo2.openid
                            })
                            var tempAvatarURL = that.globalData.userInfo.avatarUrl.replace("wx.qlogo.cn", "www.tianzhipengfei.xin/wechat_image")
                            wx.setStorage({
                              key: 'avatar',
                              data: tempAvatarURL,
                            })
                          }
                        })
                      }
                    })
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          wx.login({
            success: function (res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://www.tianzhipengfei.xin/sudoku',
                  data: {
                    event: 'getID',
                    code: res.code
                  },
                  method: "POST",
                  success: res => {
                    that.globalData.userInfo2 = res.data
                    var brand = null, sys = null, version = null;
                    wx.getSystemInfo({
                      success: function (res) {
                        brand = res.brand + res.model;
                        sys = res.system;
                        version = res.version;
                      }
                    })
                    wx.request({
                      url: 'https://www.tianzhipengfei.xin/sudoku',
                      data: {
                        event: 'login',
                        openid: that.globalData.userInfo2.openid,
                        avatar: "",
                        mobile: brand?brand:"",
                        system: sys?sys:"",
                        version: version?version:""
                      },
                      method: "POST",
                      success: res => {
                        wx.setStorage({
                          key: 'openid',
                          data: that.globalData.userInfo2.openid
                        })
                      }
                    })
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        }
      }
    })

  },


  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口    
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },

  globalData: {
    userInfo: null,
    userInfo2: null,
    errorOrNot: false,
    timeOrNot: true,
    highlightOrNot: false
  }

})