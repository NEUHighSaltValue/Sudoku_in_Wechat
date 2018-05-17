<<<<<<< HEAD
// // send_data.js

=======
// send_data.js
function send_data() {
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
          comTime: 10000000
        }
      }
    }
  }catch (e) {
    // Do something when catch error
  }
  wx.connectSocket({
    url: 'wss://www.tianzhipengfei.xin/pk',
  })
  wx.onSocketOpen(function(res) {
    console.log('send')
    wx.sendSocketMessage({
      data: JSON.stringify(myInfo)
    })
  })
  console.log(JSON.stringify(myInfo))
}

function grasp_data() {
  var data = []
  wx.onSocketOpen(function(res) {
    wx.onSocketMessage(function(res){
      console.log('res.data')
      data = JSON.parse(res.data).info
    })
  })
  var pkUserInfo = []
  for(var i = 0; i < data.length; i++) {
    pkUserInfo[i] = {
      "avatar": data[i].url,
      "percentage": data[i].percent > 1 ? "完" : data[i].percent,
      "finished": data[i].percent > 1 ? 1 : undefined
    }
  }
  return pkUserInfo
}
>>>>>>> parent of 12d4370... 为了雨桐不生气，我们 push 一回代码


// function grasp_data() {
//     var data = []
//     wx.onSocketMessage(function (res) {
//       res = JSON.parse(res.data)
//       console.log(res)
//       data = res.info
//     })
//     var pkUserInfo = []
//     for (var i = 0; i < data.length; i++) {
//         pkUserInfo[i] = {
//             "avatar": data[i].url,
//             "percentage": data[i].percent > 1 ? "完" : data[i].percent,
//             "finished": data[i].percent > 1 ? 1 : undefined
//         }
//     }
//     return pkUserInfo
// }

// module.exports.send_data = send_data
// module.exports.grasp_data = grasp_data