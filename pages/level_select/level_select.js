// pages/level_select/level_select.js
var pk = false;
Page({

  /**
   * 页面的初始数据
   */
    data: {
        buttonClicked: true,
        levelSelectList: [
            {
                text: "入门级",
                image1: "/images/level0.png",
                image2: "/images/level5.png",
                id1:"0",
                id2:"5"
            },
            {
                text: "初级",
                image1: "/images/level1.png",
                image2: "/images/level6.png",
                id1: "1",
                id2: "6"
            },
            {
                text: "中级",
                image1: "/images/level2.png",
                image2: "/images/level7.png",
                id1: "2",
                id2: "7"
            },
            {
                text: "高级",
                image1: "/images/level3.png",
                image2: "/images/level8.png",
                id1: "3",
                id2: "8"
            },
            {
                text: "骨灰级",
                image1: "/images/level4.png",
                image2: "/images/level9.png",
                id1: "4",
                id2: "9"
            }          
      ]
  },
  onLoad(options){
    if (options['mode']=="pk"){
        pk = true
    } else{
        pk = false
    }
  },
  selectLevel(e) {
      let level = e.currentTarget.dataset.id
      console.log(level)
      if (!this.data.buttonClicked) { return }
      buttonClicked(this);
      if(!pk){
        wx.redirectTo({
            url: '/pages/sudoku/sudoku?level=' + e.currentTarget.dataset.id,
    })
      } else{
          var gameID = Math.floor(Math.random() * 1000) + level * 1000 + 1;
          if (gameID > 9868) {
              gameID = gameID - 869;
          }
          console.log("level in ls page is: ", level, ", and gameId in ls is: ", gameID)
          wx.getStorage({
              key: 'openid',
              success: function(res) {
                  let openid = res.data + "s"
                  wx.request({
                      url: 'https://www.tianzhipengfei.xin/sudoku',
                      data: {
                          event: 'newPK',
                          gameid: gameID,
                          userid: openid
                      },
                      method: "POST",
                      success: res => {
                          let roomid = res.data.split('(')[1].split(',')[0]
                          wx.redirectTo({
                              url: '/pages/waiting/waiting?level=' + level + '&roomid='+roomid + '&gameid='+gameID
                              + '&isMaster='+1,
                          })
                      },
                      fail: res => {
                          wx.showToast({
                              title: '创建多人对战失败',
                              icon: 'none',
                              duration: 2000
                          })
                      }
                  })
                  
              },
          })
          
      }
  },
})

var buttonClicked = function (that) {
    
    that.setData({
        buttonClicked: false
    })
    setTimeout(function () {
        that.setData({
            buttonClicked: true
        })
    }, 1000);
}