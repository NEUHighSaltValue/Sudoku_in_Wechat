// pages/fight/fight.js
Page({
  data: {
    userInfo: {},
    roomid: 0
  },
  toCreate() {
      wx.request({
          url: 'http://47.95.195.115:801/sudoku',
          data: {
              event: 'newPK',
              userid: "ola-84h2gKJdDqccaQEH2XoWmy1Z",
              gameid: "123"
          },
          method: "POST",
          success: res => {
              console.log(res.data)
              var line = res.data
              console.log(line)
              line = line.split("(")[1]
              console.log(line)
              line = line.split(",")[0]
              console.log(line)
              let num = parseInt(line)
              console.log(num)
              this.setData({
                  roomid: num
              })
          },
          complete: ()=>{
              wx.navigateTo({
                  url: '/pages/fight/create/create?roomid=' + this.data.roomid,
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