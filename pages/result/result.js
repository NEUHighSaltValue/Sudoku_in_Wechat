// pages/result/result.js
Page({
  data: {
      resultList: [
        {
          key: 0,
          item_imgPath: "",
          item_type: "",
          item_time: "",
          item_date: "",
          item_teim_isPK: 0
        }
      ]
  },
  onLoad() {
    var storage = [];
    try {
      var value = wx.getStorageSync('key')
      if (value) {
        storage = splitData(value)
      }
    } catch (e) {
      console.log('get storage error')
    }
    this.setData({
      resultList: storage
    })
    console.log(this.data.resultList)
    },
    onShareAppMessage: function () {
        let picNum = Math.floor(Math.random() * 10) + 1
        let url = 'https://www.tianzhipengfei.xin/static/share' + picNum.toString() + '.jpg'
        console.log(url)
        return {
            title: '来啊造作啊',
            path: '/pages/index/index',
            imageUrl: url,
            success: function (res) {
                //console.log('success')
            },

            fail: function (res) {
                wx.showToast({
                    title: '分享失败',
                    icon: 'none',
                    duration: 1000
                })
            }
        }
    }
})

function splitData(data) {
  var lines = new Array()
  var words = new Array()
  var result = new Array()
  var count = 0
  lines = data.split("?")
  for (var i = 0; i < lines.length; i++) {
    words[i] = new Array()
      words[i] = lines[lines.length-i-1].split("|")
  }
  for (var i = 0; i < words.length; i++) {
    var item = {
      key: count++,
      item_imgPath: words[i][0],
      item_type: words[i][1],
      item_time: words[i][2],
      item_date: words[i][3],
        item_isPK: parseInt(words[i][4])
    }
    result.push(item)
  }
  return result
}