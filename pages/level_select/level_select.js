// pages/level_select/level_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        levelSelectList: [
            {
                text: "入门级",
                image1: "/images/rumenji.png",
                image2: "/images/drumenji.png",
                id1:"0",
                id2:"5"
            },
            {
                text: "初级",
                image1: "/images/chuji.png",
                image2: "/images/dchuji.png",
                id1: "1",
                id2: "6"
            },
            {
                text: "中级",
                image1: "/images/zhongji.png",
                image2: "/images/dzhongji.png",
                id1: "2",
                id2: "7"
            },
            {
                text: "高级",
                image1: "/images/gaoji.png",
                image2: "/images/dgaoji.png",
                id1: "3",
                id2: "8"
            },
            {
                text: "骨灰级",
                image1: "/images/guhuiji.png",
                image2: "/images/dguhuiji.png",
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