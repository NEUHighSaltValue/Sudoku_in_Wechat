// send_data.js
function send_data(percent, time) {
    var myInfo = {}
    try {
        var value = wx.getStorageSync('openid')
        if (value) {
            myInfo = {
                key: 3,
                info: {
                    url: getApp().globalData.userInfo.avatarUrl,
                    openid: value,
                    roomId: 1,
                    rank: 0,
                    percent: 1-percent,
                    comTime: time
                }
            }
        }
    } catch (e) {
        // Do something when catch error
    }
    wx.connectSocket({
        url: 'wss://www.tianzhipengfei.xin/pk',
        header: {
            'content-type': 'application/json'
        },
        method: "GET"
    });
    if (connectSocket==false){
        socketMsgQueue.push(JSON.stringify(myInfo))
    }
    wx.onSocketOpen(function(){
        if (!connectSocket){
            connectSocket = true
            for (var i = 0; i < socketMsgQueue.length; i++) {
                wx.sendSocketMessage({
                    data: socketMsgQueue[i] 
                })
            }
            socketMsgQueue = []
        } else{
            wx.sendSocketMessage({
                data: JSON.stringify(myInfo)
            })
        }
    })
}

function grasp_data() {
    var data = []
    wx.onSocketOpen(function (res) {
        wx.onSocketMessage(function (res) {
            res = JSON.parse(res.data)
            console.log(res)
            data = res.info
        })
    })
    var pkUserInfo = []
    for (var i = 0; i < data.length; i++) {
        pkUserInfo[i] = {
            "avatar": data[i].url,
            "percentage": data[i].percent > 1 ? "完" : data[i].percent,
            "finished": data[i].percent > 1 ? 1 : undefined
        }
    }
    return pkUserInfo
}

module.exports.send_data = send_data
module.exports.grasp_data = grasp_data