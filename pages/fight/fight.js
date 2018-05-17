// pages/fight/fight.js
Page({
  data: {
    userInfo: {},
    roomid: 0
  },
  toCreate() {
      wx.request({
        url: 'https://www.tianzhipengfei.xin/sudoku',
          data: {
              event: 'newPK',
              userid: "ola-84h2gKJdDqccaQEH2XoWmy1Z",
              gameid: "123"
          },
          method: "POST",
          success: res => {
              //console.log(res.data)
              var line = res.data
              //console.log(line)
              line = line.split("(")[1]
              //console.log(line)
              line = line.split(",")[0]
              //console.log(line)
              let num = parseInt(line)
              //console.log(num)
              this.setData({
                  roomid: num
              })
          },
          complete: () => {
              wx.getSetting({
                success: (res) => {
                 if(res.authSetting['scope.userInfo']) {
                  wx.navigateTo({
                    url: '/pages/fight/create/create?roomid=' + this.data.roomid,
                  })
                 }
                 else {
                   wx.authorize({
                     scope: 'scope.userInfo',
                     success() {
                       wx.showModal({
                         title: '微信授权',
                         content: '小程序需要获取用户信息',
                         cancelText: '拒绝',
                         confirmText: '允许',
                         success: function(res) {
                           if(res.confirm) {
                             wx.openSetting({
                               success: (res) => {
                                 res.authSetting = {
                                  "scope.userInfo": true,
                                  "scope.userLocation": true
                                 }
                               }
                             })
                           }
                         }
                       })
                     }
                   })
                 }
                }
              })
          }
      })   
  },
  toEnter() {
    wx.navigateTo({
      url: '/pages/fight/enter/enter',
    })
  }
})