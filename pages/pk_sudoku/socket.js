// // send_data.js



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