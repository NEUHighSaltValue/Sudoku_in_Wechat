// pages/shareCard/shareCard.js

let phoneWidth = wx.getSystemInfoSync().screenWidth;
let phoneHeight = wx.getSystemInfoSync().screenHeight;

let ratio = 750 / phoneWidth;
let canvasWidth= phoneWidth * 0.667;
let canvasHeight = phoneHeight* 0.52;
var sc;// scene
var ACCESS_TOKEN;
var QrPath;

var avaImage;//avatar
var isPk = false;
var isgetQr=false;
var userName = "G!NTOKI";
var avatarPath = "\images\avatar.png";
var gameLevel = "骨灰级";
var usedTime = "00:55";
var rank = 1;
var imagePath ='/images/level0.png';

var shareImg;

//获得ACCESS_TOKEN、二维码后在画布上进行绘制
function paint() {
  const ctx = wx.createCanvasContext('cardCanvas'); 
  ctx.setFillStyle('#FFFFFF')
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  ctx.setFontSize(28)
  ctx.setFillStyle('#EE0000')
  ctx.fillText('Bravo!', (150) / ratio, phoneHeight * 0.07 )

  ctx.setFontSize(18)
  ctx.setFillStyle('#000000')
  console.log(12)
  ctx.fillText('用时 ' + usedTime, (100) / ratio, (phoneHeight * 0.12))
  console.log(13)
  ctx.fillText('解决 ' + gameLevel+' 数独', (120) / ratio, phoneHeight * 0.16)

  console.log(14)
  if (!isPk) {
    ctx.fillText('P K 中Rank ' + rank, (120) / ratio, (phoneHeight * 0.22))
  }
  console.log(1)
  ctx.stroke();
  console.log(2)

  var r = 60;
  console.log(3)
  console.log("imagePath: ", imagePath)
  console.log(4)
  ctx.drawImage(imagePath, 113 / ratio, phoneHeight * 0.25, 275 / ratio, 275 / ratio)
  console.log(isgetQr + "draw callback");
  if(isgetQr){
    ctx.save();
    ctx.beginPath();
    ctx.arc((238 + 13) / ratio, phoneHeight * 0.25 + 137.5 / ratio, r / ratio, 0, 2 * Math.PI);
    ctx.clip();//次方法下面的部分为待剪切区域，上面的部分为剪切区域

    ctx.beginPath();
    console.log("draw avator"+avatarPath)
    ctx.drawImage(avatarPath, (250 - r) / ratio, phoneHeight * 0.25 + 137.5 / ratio -r/ratio, 2 * r / ratio, 2 * r / ratio);

    ctx.restore();
  }
 

  ctx.stroke();
  //ctx.draw();
  ctx.draw(false,function(){
    setTimeout(function(){
       wx.canvasToTempFilePath({
         fileType:'jpg',
         canvasId: 'cardCanvas',
        success:function(res){
          console.log(res);
          shareImg = res.tempFilePath;
        },
        fail:function(res){
          console.log(res);
          console.log("保存画布失败")
        }
      }, this)
    },200)
  })
}
//从后端服务器获取二维码
function getQrCode(){
  wx.request({
    url: 'https://www.tianzhipengfei.xin/sudoku',
    data: {
      event: 'getQR',
      scene: sc,
      width: 430
    },
    method: "POST",
    success: res => {
      console.log("Qrcode")
      console.log(res.data)
      QrPath = res.data

      wx.getImageInfo({
        src: QrPath,
        success: function (sres) {
          console.log("get Img info sccc!" + sres.path)
          imagePath = sres.path;
          isgetQr = true;
          wx.getImageInfo({
            src: avatarPath,
            success:function(sres){
              avatarPath = sres.path;
            },
            complete:function(cres){
              console.log("getAvartaImgInfo complete: "+cres)
              paint();
            }
          })
        },
        complete:function(fres){
          paint();
        }
      })
      
      console.log("getImgSc complete")
      //paint();
    },
    complete:res=>{
      paint();
    }
  })
}

Page({
  save: function (e) {
    var that = this;
    console.log(shareImg);
    setTimeout(function(){
      wx.saveImageToPhotosAlbum({
        filePath: shareImg,
        success(res) {
          wx.showModal({
            title: '保存成功',
            content: '图片成功保存到相册了，去发圈~',
            showCancel: false,
            confirmText: '好哒',
            confirmColor: '#000000',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定');
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }
            }
          })
        },
        fail(res) {
          console.log("保存卡片失败")
          console.log(res);
          wx.showToast({
            title: '网络异常',
            icon: 'loading'
          })
        }
      })
    },200)

  },
  close:function (e){
    wx.redirectTo({
      url: '/pages/level_select/level_select',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    sc = decodeURIComponent(options.scene)
    getQrCode();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})

