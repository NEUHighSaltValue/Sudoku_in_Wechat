// pages/level_select/level_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  selectLevel(e){
      wx.redirectTo({
          url: '/pages/sudoku/sudoku?level=' + e.currentTarget.dataset.id,
      })
  }
})