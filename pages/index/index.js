  //index.js
//获取应用实例
const app = getApp()
Page({
  data: {
      buttonClicked: true
  },
  toNewGame() {
      if (!this.data.buttonClicked) { return }
      buttonClicked(this);
      wx.navigateTo({
          url: '/pages/level_select/level_select',
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
    }, 500);
}