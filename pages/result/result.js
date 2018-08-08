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