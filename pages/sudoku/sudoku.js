// pages/sudoku.js

let phoneWidth = wx.getSystemInfoSync().screenWidth
let boardWidthInPrx = 675
let boardWidthInPx = boardWidthInPrx * phoneWidth / 750
let tableWidthInPrx = 527
let tableHeighInPrx = 213.5
let tableWidthInPx = tableWidthInPrx * phoneWidth / 750
let tableHeighInPx = tableHeighInPrx * phoneWidth / 750
var selectX = -1
var selectY = -1
var selectNum = -1

Page({
  data: {
    generateOk: true,
    chessboardDatas: [
      [11, 12, 13, 14, 15, 16, 17, 18, 19],
      [21, 22, 23, 24, 25, 26, 27, 28, 29],
      [31, 32, 33, 34, 35, 36, 37, 38, 39],
      [41, 42, 43, 44, 45, 46, 47, 48, 49],
      [51, 52, 53, 54, 55, 56, 57, 58, 59],
      [61, 62, 63, 64, 65, 66, 67, 68, 69],
      [71, 72, 73, 74, 75, 76, 77, 78, 79],
      [81, 82, 83, 84, 85, 86, 87, 88, 89],
      [91, 92, 93, 94, 95, 96, 97, 98, 99],
    ]
  },

  //事件处理函数
  bindViewTap: function () {},

  onLoad: function () {},

  getUserInfo: function (e) {},

  clickMe: function () {},

  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },

  onReady: function (e) {
    let board = wx.createCanvasContext('board')
    let ratio = 750 / phoneWidth

    //Board

    let lineWidth1 = 4.5
    let lineWidth2 = 1.5
    let cellWidth = (boardWidthInPrx - lineWidth1 * 4 - lineWidth2 * 6) / 9
    //For UI designer, you can change line color here!
    board.setStrokeStyle("#000000")
    board.setLineWidth(lineWidth1 / ratio)
    var startPointX = lineWidth1 / 2 / ratio
    var startPointY = lineWidth1 / 2 / ratio
    var tempWidth = (boardWidthInPrx - lineWidth1 * 1.5) / ratio
    var tempHeight = (boardWidthInPrx - lineWidth1 * 1.5) / ratio
    board.rect(startPointX, startPointY, tempWidth, tempHeight)
    //border

    startPointX = (cellWidth * 3 + lineWidth1 * 1.5 + lineWidth2 * 2) / ratio
    tempWidth = (cellWidth * 3 + lineWidth2 * 2 + lineWidth1) / ratio
    board.rect(startPointX, startPointY, tempWidth, tempHeight)
    board.rect(startPointY, startPointX, tempHeight, tempWidth)
    board.stroke()
    //devide board into 9 parts

    board.setLineWidth(lineWidth2 / ratio)
    startPointX = (cellWidth + lineWidth1 + lineWidth2 / 2) / ratio
    startPointY = lineWidth2 / 2
    tempWidth = (cellWidth + lineWidth2) / ratio
    tempHeight = (boardWidthInPrx - lineWidth2 * 3.5) / ratio
    board.rect(startPointX, startPointY, tempWidth, tempHeight)
    board.rect(startPointY, startPointX, tempHeight, tempWidth)
    startPointX = (cellWidth * 4 + lineWidth1 * 2 + lineWidth2 * 2.5) / ratio
    board.rect(startPointX, startPointY, tempWidth, tempHeight)
    board.rect(startPointY, startPointX, tempHeight, tempWidth)
    startPointX = (cellWidth * 7 + lineWidth1 * 3 + lineWidth2 * 4.5) / ratio
    board.rect(startPointX, startPointY, tempWidth, tempHeight)
    board.rect(startPointY, startPointX, tempHeight, tempWidth)
    //devide part into 9 cells
    board.stroke()
    board.draw()

    //!Board

    //Table

    startPointX = lineWidth1 / 2 / ratio
    startPointY = lineWidth1 / 2 / ratio
    cellWidth = (tableWidthInPrx - lineWidth1 * 6) / 5
    tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio
    tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio

    let table = wx.createCanvasContext('table')
    table.setStrokeStyle("#000000")
    table.setLineWidth(lineWidth1 / ratio)
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    table.rect(startPointX, startPointY, tempWidth, tempHeight/2)
    startPointX = (cellWidth + lineWidth1 * 1.5) / ratio
    tempWidth = (cellWidth + lineWidth1) /ratio
    tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    startPointX = (cellWidth * 3 + lineWidth1 * 3.5) / ratio
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    console.log(startPointX)
    table.stroke()
    table.setFontSize(cellWidth / 2 /ratio)
    table.font = 'Courier'
    console.log(table.font)
    table.setTextAlign = 'center'
    // for(var num=1; num<5; num++){
    //   table.fillText(num.toString(), (cellWidth * (0.5 + num) + lineWidth1 * (1+num)) / ratio, cellWidth * 3 / 4 / ratio)
    // }
    table.fillText('1', cellWidth / ratio * 1.45 + lineWidth1 / ratio, cellWidth * 3 / 4 / ratio)
    table.fillText('2', cellWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, cellWidth * 3 / 4 / ratio)
    table.fillText('3', cellWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, cellWidth * 3 / 4 / ratio)
    table.fillText('4', cellWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, cellWidth * 3 / 4 / ratio)
    table.fillText('5', cellWidth / ratio * 0.4 + lineWidth1 / ratio, cellWidth * 7 / 4 / ratio)
    table.fillText('6', cellWidth / ratio * 1.4 + lineWidth1 / ratio, cellWidth * 7 / 4 / ratio)
    table.fillText('7', cellWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, cellWidth * 7 / 4 / ratio)
    table.fillText('8', cellWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, cellWidth * 7 / 4 / ratio)
    table.fillText('9', cellWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, cellWidth * 7 / 4 / ratio)  
    table.draw()
    //!Table
  },

  cellSelect: function (event){
    selectX = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9))
    selectY = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9))
    var xpart = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9))
    var ypart = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9))
    // console.log("X: " + event.changedTouches[0].x)
    // console.log("Y: " + event.changedTouches[0].y) 
    console.log("X part: " + xpart)
    console.log("Y part: " + ypart)
  },


  tableSelect: function (event) {
    selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5))
    // console.log("X: " + event.changedTouches[0].x)
    // console.log("Y: " + event.changedTouches[0].y) 
    console.log("num: " + selectNum)
  },

})