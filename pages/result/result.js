// pages/result/result.js
Page({
  data: {
      resultList: []
  },
  onLoad(){
      wx.request({
          url: 'http://47.95.195.115:801/sudoku',
          data: {
              event: 'searchGameResult',
              userid: "ola-84h2gKJdDqccaQEH2XoWmy1Q",
              searchnum: 5
          },
          method: "POST",
          success: res => {
              console.log(res)
          }
      })
  }
})