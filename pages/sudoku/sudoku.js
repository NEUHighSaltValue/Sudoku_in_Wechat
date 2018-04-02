// pages/sudoku.js

let phoneWidth = wx.getSystemInfoSync().screenWidth
let ratio = 750 / phoneWidth
let boardWidthInPrx = 675
let boardWidthInPx = boardWidthInPrx * phoneWidth / 750
let tableWidthInPrx = 527
let tableHeighInPrx = 213.5
let tableWidthInPx = tableWidthInPrx * phoneWidth / 750
let tableHeighInPx = tableHeighInPrx * phoneWidth / 750
let lineWidth1 = 4.5
let lineWidth2 = 1.5
let cellWidth = (boardWidthInPrx - lineWidth1 * 4 - lineWidth2 * 6) / 9
let tableWidth = (tableWidthInPrx - lineWidth1 * 6) / 5

var selectX = -1
var selectY = -1
var selectNum = -1
var chessBoardData = 
[[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0],
]


function freshUI() {
  let board = wx.createCanvasContext('boardData')
  board.setStrokeStyle("#000000")
  board.setFontSize(cellWidth / 2 / ratio)
  var i, j, axis, baseLine
  for (i = 0; i < 9; i++) {
    axis = (i + 0.45) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + (i - parseInt(i / 3)) * lineWidth2
    for (j = 0; j < 9; j++) {
      if(chessBoardData[i][j] != 0){
      baseLine = (j + 0.75) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2
      board.fillText(chessBoardData[i][j].toString(), axis / ratio, baseLine / ratio)
      }
    }
  }
  board.draw()
}

Page({
  data: {
    generateOk: true
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
    //Board

    freshUI()

    //For UI designer, you can change line color here!
    let board = wx.createCanvasContext('board')
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

    let table = wx.createCanvasContext('table')
    startPointX = lineWidth1 / 2 / ratio
    startPointY = lineWidth1 / 2 / ratio
    tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio
    tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio

    table.setStrokeStyle("#000000")
    table.setLineWidth(lineWidth1 / ratio)
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    table.rect(startPointX, startPointY, tempWidth, tempHeight / 2)
    startPointX = (tableWidth + lineWidth1 * 1.5) / ratio
    tempWidth = (tableWidth + lineWidth1) / ratio
    tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    startPointX = (tableWidth * 3 + lineWidth1 * 3.5) / ratio
    table.rect(startPointX, startPointY, tempWidth, tempHeight)
    // console.log(startPointX)
    table.stroke()
    table.setFontSize(tableWidth / 2 / ratio)
    table.font = 'Courier'
    // console.log(table.font)
    table.setTextAlign = 'center'
    // for(var num=1; num<5; num++){
    //   table.fillText(num.toString(), (tableWidth * (0.5 + num) + lineWidth1 * (1+num)) / ratio, tableWidth * 3 / 4 / ratio)
    // }
    table.fillText('1', tableWidth / ratio * 1.45 + lineWidth1 / ratio, tableWidth * 3 / 4 / ratio)
    table.fillText('2', tableWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, tableWidth * 3 / 4 / ratio)
    table.fillText('3', tableWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, tableWidth * 3 / 4 / ratio)
    table.fillText('4', tableWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, tableWidth * 3 / 4 / ratio)
    table.fillText('5', tableWidth / ratio * 0.4 + lineWidth1 / ratio, tableWidth * 7 / 4 / ratio)
    table.fillText('6', tableWidth / ratio * 1.4 + lineWidth1 / ratio, tableWidth * 7 / 4 / ratio)
    table.fillText('7', tableWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, tableWidth * 7 / 4 / ratio)
    table.fillText('8', tableWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, tableWidth * 7 / 4 / ratio)
    table.fillText('9', tableWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, tableWidth * 7 / 4 / ratio)
    table.draw()
    
    //!Table
  },

  f1: function (event) {
    let board = wx.createCanvasContext('board')
    board.setStrokeStyle("#000000")
    board.setLineWidth(12)
    board.rect(20,20,100,100)
    board.stroke()
    board.draw()
  },

  f2: function (event) {
    let board = wx.createCanvasContext('board')
    board.setStrokeStyle("#000000")
    board.setLineWidth(12)
    board.rect(40, 40, 120, 120)
    board.stroke()
    board.draw()

  },

  cellSelect: function (event){
    selectX = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9))
    selectY = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9))
    console.log("X part: " + selectX)
    console.log("Y part: " + selectY)
    if (selectNum != -1) {
      chessBoardData[selectX][selectY] = selectNum
      console.log(selectX.toString() + " " + selectY.toString() + " " + selectNum.toString())
      freshUI()
    }
  },

  tableSelect: function (event) {
    selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5))
    console.log("num: " + selectNum)
  },


})

class Sudoku{
  constructor(){
    var chessBoadData = 
    [ [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
  }
  getData(){

  }
}