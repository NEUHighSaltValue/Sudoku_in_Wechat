// pages/result/result.js
Page({
  data: {
      resultList: [
        {
          item_imgPath: "",
          item_type: "",
          item_time: "",
          item_data: ""
        }
      ]
  },
  onLoad() {
    console.log("enter")
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
  lines = data.split("?")
  for (var i = 0; i < lines.length; i++) {
    words[i] = new Array()
    words[i] = lines[i].split("|")
  }
  for (var i = 0; i < words.length; i++) {
    var item = {
      item_imgPath: "",
      item_type: "",
      item_time: "",
      item_data: ""
    }
    item.item_imgPath = words[i][0]
    item.item_type = words[i][1]
    item.item_time = words[i][2]
    item.item_data = words[i][3]
    result.push(item)
  }
  return result
}