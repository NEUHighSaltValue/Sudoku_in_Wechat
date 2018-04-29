  //index.js
//获取应用实例
const app = getApp()
Page({
  data: {
  },
  toNewGame(){
      wx.navigateTo({
          url: '/pages/level_select/level_select',
      })
  },
  toHelp() {
      wx.navigateTo({
          url: '/pages/about/about',
      })
  }
})
