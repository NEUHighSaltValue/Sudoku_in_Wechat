// pages/setting/setting.js
Page({
    data: {
        highlightChange: false,
        errorChange: false,
        timeChange: false
    },
    onLoad() {
        this.setData({
            highlightChange: getApp().globalData.highlightOrNot,
            errorChange: getApp().globalData.errorOrNot,
            timeChange: getApp().globalData.timeOrNot
        })
    },
    onUnload() {
        console.log("unload")
        getApp().globalData.highlightOrNot = this.data.highlightChange;
        getApp().globalData.errorOrNot = this.data.errorChange;
        getApp().globalData.timeOrNot = this.data.timeChange;
    },
    highlightChangeFunc(){
        this.data.highlightChange = !this.data.highlightChange;
    },
    errorChangeFunc(){
        this.data.errorChange = !this.data.errorChange;
    },
    timeChangeFunc(){
        this.data.timeChange = !this.data.timeChange;
    }
})