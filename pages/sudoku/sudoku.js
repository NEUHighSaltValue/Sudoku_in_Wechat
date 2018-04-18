function cellModel() {
  this.cat = true;
  this.note = false;
  this.content = "0"
  this.color = 0;
}
function cellModel(content) {
  this.cat = true;
  this.note = false;
  this.content = content;
  this.color = 0;
}
class Sudoku {
  constructor() {
    this.chessBoardData =
      [
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
        [new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(), new cellModel(),],
      ];
    this.row =
      [
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
      ];
    this.col =
      [
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
      ];
    this.zone =
      [
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
        [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(),],
      ];
  }

  setData(x, y, content) {
    this.chessBoardData[x][y].content = content
  }

  addData(x, y, content) {
    if(this.chessBoardData[x][y].content == undefined)
      this.chessBoardData[x][y].content = content
    else if(this.chessBoardData[x][y].note)
      this.chessBoardData[x][y].content += content
    this.chessBoardData[x][y].note = false
  }

  getData(x, y) {
    return this.chessBoardData[x][y]
  }
}

let sudoku = new Sudoku()
let draw = require('../../pages/sudoku/draw.js')
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
//let sudoku = new Sudoku()

var redo = false
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
  board.setFontSize(cellWidth / ratio)
  var i, j, axis, baseLine
  for (i = 0; i < 9; i++) {
    axis = (i + 0.2) * cellWidth + (1 + parseInt(i / 3))*lineWidth1 + i * lineWidth2
    for (j = 0; j < 9; j++) {
      if(chessBoardData[i][j] != 0 && !redo){
      baseLine = (j + 0.85) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + j * lineWidth2
      board.fillText(chessBoardData[i][j].toString(), axis / ratio, baseLine / ratio)
      sudoku.setData(i, j, chessBoardData[i][j].toString())
      } else if(chessBoardData[i][j] != 0 && redo) {
        console.log("enter: " + chessBoardData[i][j] + sudoku.chessBoardData[i][j].note)
        baseLine = (j + 0.85) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + j * lineWidth2
        sudoku.addData(i, j, chessBoardData[i][j].toString())
        board.setFontSize(cellWidth / Math.sqrt(sudoku.chessBoardData[i][j].content.length) / ratio)
        draw.drawMultipleNumbers(board, sudoku.chessBoardData[i][j].content, axis/ratio, baseLine/ratio)
        board.setFontSize(cellWidth / ratio)
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
    table.stroke()
    table.setFontSize(tableWidth / 2 / ratio)
    table.font = 'Courier'
    table.setTextAlign = 'center'
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
    redo = !redo
    console.log(redo)
  },

  cellSelect: function (event){
    selectX = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9))
    selectY = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9))
    console.log("X part: " + selectX)
    console.log("Y part: " + selectY)
    if (selectNum != -1) {
      chessBoardData[selectX][selectY] = selectNum
      sudoku.chessBoardData[selectX][selectY].note = redo
      console.log(selectX.toString() + " " + selectY.toString() + " " + selectNum.toString())
      freshUI()
    }
  },

  tableSelect: function (event) {
    selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5))
    console.log("num: " + selectNum)
  },
})

