// pages/setting/setting.js
Page({
    data: {
        highlightChange: false,
        errorChange: false,
        timeChange: false,
        typeChange: false
    },
    onLoad() {
      //console.log(getApp().globalData.highlightOrNot, getApp().globalData.errorOrNot,
      //  getApp().globalData.timeOrNot, getApp().globalData.typeOrNot)
        this.setData({
            highlightChange: getApp().globalData.highlightOrNot,
            errorChange: getApp().globalData.errorOrNot,
            timeChange: getApp().globalData.timeOrNot,
            typeChange: getApp().globalData.typeOrNot
        })
    },
    onUnload() {
        wx.setStorage({
          key: 'setting',
          data: this.data.highlightChange + '|' + this.data.errorChange + '|'
              + this.data.timeChange + '|' + this.data.typeChange,
        })
        getApp().globalData.highlightOrNot = this.data.highlightChange;
        getApp().globalData.errorOrNot = this.data.errorChange;
        getApp().globalData.timeOrNot = this.data.timeChange;
        getApp().globalData.typeOrNot = this.data.typeChange
    },
    highlightChangeFunc(){
        this.data.highlightChange = !this.data.highlightChange;
    },
    errorChangeFunc(){
        this.data.errorChange = !this.data.errorChange;
    },
    timeChangeFunc(){
        this.data.timeChange = !this.data.timeChange;
    },
    typeChangeFunc(){
      this.data.typeChange = !this.data.typeChange;
    }
})