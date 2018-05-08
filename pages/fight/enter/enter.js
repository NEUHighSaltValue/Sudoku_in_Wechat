// pages/fight/create/create.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        userInfo2: {},
        room_number: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.setData({
            userInfo: getApp().globalData.userInfo,
            userInfo2: getApp().globalData.userInfo2
        })
    },
    numInput: function (e) {
        this.setData({
            room_number: e.detail.value
        })
    },
    loginBtnClick() {
        var that = this;
        console.log(this.data.userInfo2.openid)
        console.log(this.data.room_number)
        wx.request({
            url: 'http://47.95.195.115:801/sudoku',
            data: {
                event: 'attendPK',
                userid: this.data.userInfo2.openid,
                roomid: this.data.room_number
            },
            method: "POST",
            success: res => {
                console.log(res)
                if(res.data=="POST error"){
                    wx.showModal({
                        title: '提示',
                        content: '输入错误或已进入过 pk 房，是否重新输入',
                        success: function (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                console.log(111)
                                that.setData({
                                    room_number: ''
                                })
                                console.log(that.data.room_number)
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: '/pages/index/index',
                                })
                            }
                        }
                    })
                } else{
                    wx.redirectTo({
                        url: '/pages/fight/create/create?roomid=' + this.data.room_number,
                    })
                }
            }
        })
    }
})