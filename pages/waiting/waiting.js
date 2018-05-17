// pages/waiting/waiting.js
let levelTable = ["入门级", "初级", "中级", "高级", "骨灰级"]
let typeTable = ["普通数独", "对角线数独"]
var gameid, level, roomid;
var value, avatarUrl;
var showTime = 0;
var hideTime = 0;
var isMaster = 0;

Page({
    data: {
        sudokuName: "",
        levelName: "",
        roomId: "",
        startable: false,
        userInfoList: [
            {
                key: 0,
                url: "",
                isReady: 0
            },
        ],
        myInfo: {
            key: 1,
            info: {
                isMaster: 0,
                url: "",
                openid: "",
                roomId: 1,
                isReady: 0
            }
        }
    },
    onLoad: function(options){
      //console.log('op', options)
        level = options.level;
        roomid = options.roomid
        gameid = options.gameid;
        isMaster = parseInt(options.isMaster)
        console.log("is Master in load", isMaster)
        let that = this
        try {
            value = wx.getStorageSync('openid')
            avatarUrl = wx.getStorageSync('avatar')
            if (value) {
                if (isMaster==1){
                    this.setData({
                        isMasterForUi: false
                    })
                } else{
                    this.setData({
                        isMasterForUi: true
                    })
                }
                that.setData({
                    isReadyForUi: false,
                    roomId: roomid,
                    sudokuName: typeTable[parseInt(level / 5)],
                    levelName: levelTable[level % 5],
                    myInfo: {
                        key: 1,
                        info: {
                            isMaster: isMaster,
                            url: avatarUrl,
                            openid: value,
                            roomId: roomid,
                            isReady: 0
                        }
                    }
                })
                console.log('change myInfo in load: ', that.data.myInfo.info)
            }
        } catch (e) {
            console.log(e)
        }
        wx.connectSocket({
            url: 'wss://www.tianzhipengfei.xin/pk',
            header: {
                'content-type': 'application/json'
            },
            method: "GET"
        })
    },
    // !onLoad
    onShow: function(){
        console.log('show')
        var that = this
        let myInfo = {
            key: 1,
            info: {
                isMaster: isMaster,
                url: avatarUrl,
                openid: value,
                roomId: roomid,
                isReady: 0
            }
        }
        console.log("send in show")
        wx.onSocketOpen(function () {
            console.log("send in load")
            wx.sendSocketMessage({
                data: JSON.stringify(that.data.myInfo)
            })
        })
        let temp=false
        this.readMessage()
        console.log("add queue in show")
    },
    // !onShow
    onUnload: function(){
        console.log("in unload")
        let that = this
        let myInfo = {
            key: 5,
            info: {
                roomId: roomid,
                openid: value
            }
        }
        console.log(JSON.stringify(myInfo))
        wx.sendSocketMessage({
            data: JSON.stringify(myInfo),
            success: function(){
                console.log("leave suc")
                let temp = true
            },
            fail: function(){
                console.log("leave fail")
            },
            complete: function(){
                console.log("leave comp")
                wx.onSocketMessage(function (res) {
                    let data = JSON.parse(res.data)
                    if (data.msg == "delete mem") {
                        wx.closeSocket({
                        })
                        wx.onSocketClose(function (res) {
                            console.log('WebSocket 已关闭！')
                        })
                    }
                })
            }
        })
    },
    // !onUnload
    readMessage(quitFlag) {
        console.log('read message')
        var infos
        var infolist = []
        let that = this
        wx.onSocketMessage(function (res) {
            res = JSON.parse(res.data)
            infos = res.info
            let key = res.key
            if (key == 2) {
                if (infos.Master) {
                    infolist[0] = infos.Master
                }
                if (parseInt(infos.Master.isStart) == 1) {
                    wx.redirectTo({
                        url: '/pages/pk_sudoku/pk_sudoku?gameid=' + gameid
                        + '&roomid=' + roomid,
                    })
                }
                if (infos.members.length>0){
                    let temp = true;
                    for (var i = 0; i < infos.members.length; i++) {
                        
                        infolist[i + 1] = infos.members[i]
                        if(!temp){
                            continue;
                        } else{
                            if(infos.members[i].isReady==0){
                                temp=false;
                            }
                        }
                    }
                    that.setData({
                        startable: temp
                    })
                } else{
                    that.setData({
                        startable: false
                    })
                }
                that.setData({
                    userInfoList: infolist
                })
                console.log("in the end of read message, infolist is", infolist)
                infolist = []
            }
        })
        console.log("finish read message")
    },
    // !readMesage
    readyChange() {
        // if (isMaster && !this.data.startable){
        //     return
        // }
        let that = this
        try {
            if (value) {
                this.setData({
                    myInfo: {
                        key: 1,
                        info: {
                            isMaster: isMaster,
                            url: avatarUrl,
                            openid: value,
                            roomId: roomid,
                            isReady: parseInt(this.data.myInfo.info.isReady) == 0 ? 1 : 0
                        }
                    }
                })
            }
        } catch (e) {
            console.log(e)
        }
        wx.sendSocketMessage({
            data: JSON.stringify(this.data.myInfo)
        })
        that.readMessage()
        wx.onSocketError(function (res) {
        })
    },
    // !readyChange
    onShareAppMessage: function () {
        //console.log(res)
        if (this.data.sudokuName) {
            //console.log(res)
            return {
                title: '敢来和我一起挑战' + this.data.levelName + this.data.sudokuName + "吗",
                path: '/pages/index/index?type=pk&level=' + level + '&roomid=' + roomid + '&gameid=' + gameid
                + '&isMaster=0',
                success: function (res) {
                    //console.log('success')
                },
                fail: function (res) {
                    //console.log('fail')
                }
            }
        }
    },
    // !shareApp
    inviteFriends: function () {
        this.onShareAppMessage()
    }
})