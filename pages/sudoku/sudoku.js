<<<<<<< HEAD
// pages/sudoku.js

//1.题目的红色和用户的红色要分别   2.note重复消去数字  3.不应该把所有数据都获得  4.点击cat为true的时候把num去除了 5.选择数字时特殊处理selected，然后selectnum不回复-1

// importScripts('../../sudokuModel.js');
import sudokuFile from '../../sudokuModel'


//


/*
For each cell
cat true means can fill the cell, false not
note true means this cell is in note mode
content contains the number filled
color means the number's color: 0 means normal, 1 means ubchangable number, 2 means error, 3 means highlight in same number as user choose
*/
=======
>>>>>>> adfcb6ffe175d84002d453be5e712daf3a8a6072
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
<<<<<<< HEAD
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
=======
    constructor() {
        this.ans = "";
        this.boardData =
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

    getData(x, y) {
        return this.boardData[x][y];
    }

    setData(x, y, num, note) {
        //Judge can fill the cell or not
        if (this.boardData[x][y].cat == false) {
            return;
        } else {
            //update record table
            if (this.boardData[x][y].note == false && this.boardData[x][y] != "0") {
                if (this.boardData[x][y].content != "0") {
                    this.row[x][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                    this.col[y][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                    this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][parseInt(this.boardData[x][y].content) - 1].delete(x * 10 + y);
                }
            }
            if (note == false && num != 0) {
                this.row[x][num - 1].add(x * 10 + y);
                this.col[y][num - 1].add(x * 10 + y);
                this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][num - 1].add(x * 10 + y);
            }
            //change data in cell
            this.boardData[x][y].note = note;
            if (this.boardData[x][y].content == "0") {
                this.boardData[x][y].content = num.toString();
            } else if (note == true) {
                this.boardData[x][y].content += num.toString();
            } else {
                this.boardData[x][y].content = num.toString();
            }
            this.freshProperty()
        }
    }

    freshProperty() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.boardData[i][j].cat == false){
                    this.boardData[i][j].color = 1;
                } else {
                    this.boardData[i][j].color = 0;
                }
            }
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.row[i][j].size > 1) {
                    for (var num of this.row[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        this.boardData[tempRow][tempCol].color = 2;
                    }
                }
                if (this.col[i][j].size > 1) {
                    for (var num of this.col[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        this.boardData[tempRow][tempCol].color = 2;
                    }
                }
                if (this.zone[i][j].size > 1) {
                    for (var num of this.zone[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        this.boardData[tempRow][tempCol].color = 2;
                    }
                }
            }
        }
    }

    setGame(gameData,gameAns) {
        var position = 0;
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                position = i*9+j;
                if(gameData[position] != '0'){
                    this.boardData[i][j].cat = false;
                    this.boardData[i][j].note = false;
                    this.boardData[i][j].content = gameData[position];
                    this.boardData[i][j].color = 1;
                    this.row[i][parseInt(gameData[position]) - 1].add(i * 10 + j);
                    this.col[j][parseInt(gameData[position]) - 1].add(i * 10 + j); 
                    this.zone[parseInt(parseInt(i / 3) * 3 + parseInt(j / 3))][parseInt(gameData[position]) - 1].add(i * 10 + j);
                }
            }
        }
        this.ans = gameAns;
    }

    show() {
        for (var i = 0; i < 9; i++) {
            var temp = ""
            for (var j = 0; j < 9; j++) {
                temp = temp + this.boardData[i][j].content + " ";
            }
            console.log(temp);
        }
    }

    reset() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.boardData[i][j].cat = true;
                this.boardData[i][j].note = false;
                this.boardData[i][j].content = "0";
                this.boardData[i][j].color = 0;
                this.row[i][j].clear();
                this.col[i][j].clear();
                this.zone[i][j].clear();
            }
        }
    }

    judgeCorrect() {
        var userAns=""
        for(var i=0; i<9; i++){
            for(var j=0; j<9; j++){
                userAns+=this.boardData[i][j];
            }
        }
        return userAns == this.ans;
    }
>>>>>>> parent of a3e6891... fix generate problem

<<<<<<< HEAD
    freeze(){
        for(var i=0;i<9;i++){
            for(var j=0;j<9;j++){
                this.boardData[i][j].cat=false;
            }
        }
=======
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
>>>>>>> adfcb6ffe175d84002d453be5e712daf3a8a6072
    }
  }
  board.draw()
}

<<<<<<< HEAD

//

let phoneWidth = wx.getSystemInfoSync().screenWidth;
let ratio = 750 / phoneWidth;
let boardWidthInPrx = 675;
let boardWidthInPx = boardWidthInPrx * phoneWidth / 750;
let tableWidthInPrx = 527;
let tableHeighInPrx = 213.5;
let tableWidthInPx = tableWidthInPrx * phoneWidth / 750;
let tableHeighInPx = tableHeighInPrx * phoneWidth / 750;
let lineWidth1 = 4.5;
let lineWidth2 = 1.5;
let cellWidth = (boardWidthInPrx - lineWidth1 * 4 - lineWidth2 * 6) / 9;
let tableWidth = (tableWidthInPrx - lineWidth1 * 6) / 5;
let currentNote = false;
let colorTable = ["black","grey","red","yellow"]
let fileData = require('../../utils/util.js') 
let sData = fileData.sudokuData().list

var selectX = -1;
var selectY = -1;
var selectNum = -1;
var sudoku = new Sudoku();
var num = 0;    //num for timer
var strH = '';
var strM = '';
var strS = '';
var timer = ''; 
var level = 3;
var remainNum = 81;

Page({
    data: {
        generateOk: true,
        timeText: '00:00',
    },

    //事件处理函数
    bindViewTap: function () {},

    onLoad: function () {
        this.newGame();
    },

    getUserInfo: function (e) {},

    clickMe: function () {},

    newGame: function () {
        sudoku.reset();
        this.timeStop();
        timer = '0';
        strH = '0';
        strM = '0';
        strS = '0';
        num = 0;
        this.setData({
            timeText : '00:00'
        })
        var gameID = Math.floor(Math.random() * 1000) + level * 1000;
        var newGameData = sData[gameID].data;
        var newGameAns =  sData[gameID].ans;
        while (!newGameData){
            gameID = 0;
            newGameData = sData[gameID].data;
            newGameAns = sData[gameId].ans;
        }
<<<<<<< HEAD
        sudoku.setGame(newGameData, newGameAns);
        this.setData({
            generateOk: true
        })
=======
        this.generatOk = true;
        console.log(this.generatOk)
        sudoku.setGame(newGameData,newGameAns);
>>>>>>> parent of a3e6891... fix generate problem
        this.freshUI();
        this.timeStart();
    },

    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg);
    },

    onReady: function (e) {
        //Board
        //For UI designer, you can change line color here!
        let board = wx.createCanvasContext('board');
        board.setStrokeStyle("#000000");
        board.setLineWidth(lineWidth1 / ratio);
        var startPointX = lineWidth1 / 2 / ratio;
        var startPointY = lineWidth1 / 2 / ratio;
        var tempWidth = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
        var tempHeight = (boardWidthInPrx - lineWidth1 * 1.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        //border

        startPointX = (cellWidth * 3 + lineWidth1 * 1.5 + lineWidth2 * 2) / ratio;
        tempWidth = (cellWidth * 3 + lineWidth2 * 2 + lineWidth1) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        board.stroke();
        //devide board into 9 parts

        board.setLineWidth(lineWidth2 / ratio);
        startPointX = (cellWidth + lineWidth1 + lineWidth2 / 2) / ratio;
        startPointY = lineWidth2 / 2;
        tempWidth = (cellWidth + lineWidth2) / ratio;
        tempHeight = (boardWidthInPrx - lineWidth2 * 3.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        startPointX = (cellWidth * 4 + lineWidth1 * 2 + lineWidth2 * 2.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        startPointX = (cellWidth * 7 + lineWidth1 * 3 + lineWidth2 * 4.5) / ratio;
        board.rect(startPointX, startPointY, tempWidth, tempHeight);
        board.rect(startPointY, startPointX, tempHeight, tempWidth);
        //devide part into 9 cells
        board.stroke();
        board.draw();

        //!Board

        //Table

        let table = wx.createCanvasContext('table');
        startPointX = lineWidth1 / 2 / ratio;
        startPointY = lineWidth1 / 2 / ratio;
        tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio;
        tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;

        table.setStrokeStyle("#000000");
        table.setLineWidth(lineWidth1 / ratio);
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        table.rect(startPointX, startPointY, tempWidth, tempHeight / 2);
        startPointX = (tableWidth + lineWidth1 * 1.5) / ratio;
        tempWidth = (tableWidth + lineWidth1) / ratio;
        tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        startPointX = (tableWidth * 3 + lineWidth1 * 3.5) / ratio;
        table.rect(startPointX, startPointY, tempWidth, tempHeight);
        table.stroke();
        table.setFontSize(tableWidth / 2 / ratio);
        table.setTextAlign = 'center';
        // for(var num=1; num<5; num++){
        //   table.fillText(num.toString(), (tableWidth * (0.5 + num) + lineWidth1 * (1+num)) / ratio, tableWidth * 3 / 4 / ratio)
        // }
        table.fillText('1', tableWidth / ratio * 1.45 + lineWidth1 / ratio, tableWidth * 3 / 4 / ratio);
        table.fillText('2', tableWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, tableWidth * 3 / 4 / ratio);
        table.fillText('3', tableWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, tableWidth * 3 / 4 / ratio);
        table.fillText('4', tableWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, tableWidth * 3 / 4 / ratio);
        table.fillText('5', tableWidth / ratio * 0.4 + lineWidth1 / ratio, tableWidth * 7 / 4 / ratio);
        table.fillText('6', tableWidth / ratio * 1.4 + lineWidth1 / ratio, tableWidth * 7 / 4 / ratio);
        table.fillText('7', tableWidth / ratio * 2.4 + lineWidth1 * 2 / ratio, tableWidth * 7 / 4 / ratio);
        table.fillText('8', tableWidth / ratio * 3.45 + lineWidth1 * 3 / ratio, tableWidth * 7 / 4 / ratio);
        table.fillText('9', tableWidth / ratio * 4.44 + lineWidth1 * 4 / ratio, tableWidth * 7 / 4 / ratio);
        table.draw();
        
        //!Table
    },

    cellSelect: function (event){
        selectY = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
        selectX = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));
        console.log(selectX + " " + selectY);
        if (selectNum != -1) {
            sudoku.setData(selectX,selectY,selectNum,currentNote);
            this.freshUI();
        }
        selectNum = -1;
    },

    tableSelect: function (event) {
      selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5));
    },


    timeStart:function () {
        timer = setInterval(this.countTime, 1000);
    },

    countTime:function () {
        strH = zeroFill('' + parseInt(num / 3600 % 24), 2);
        strM = zeroFill('' + parseInt(num / 60 % 24), 2);
        strS = zeroFill('' + parseInt(num % 60), 2);
        if ((parseInt(num / 3600 % 24)) > 0) {
            this.setData({ 
                timeText : strH + ':' + strM + ':' + strS
            })
        } else {
            this.setData({
                timeText : strM + ':' + strS
            })
        }
        num++;
    },

    timeStop: function(){
        clearInterval(timer)
    },

    changeNote: function(){
        currentNote = !currentNote;
    },

    freshUI: function() {
        let board = wx.createCanvasContext('boardData');
        board.setFontSize(cellWidth / 2 / ratio);
        var i, j, axis, baseLine;
        remainNum = 81;
        for(j = 0; j < 9; j++) {
            axis = (j + 0.45) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
            for (i = 0; i < 9; i++) {
                if (parseInt(sudoku.getData(i, j).content) != 0) {
                    if (sudoku.getData(i, j).note==false){
                        remainNum--;
                        baseLine = (i + 0.75) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + (i - parseInt(i / 3)) * lineWidth2;
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.fillText(String(sudoku.getData(i, j).content), axis / ratio, baseLine / ratio);
                    } else{
                        //Yutong
                    }
                    
                }
            }
        }
        board.draw();
        if (remainNum == 0) {
            if (sudoku.judgeCorrect()) {
                this.timeStop();
                sudoku.freeze();
                //Shuyuan
                this.timeText += "success"
            }
        }
=======
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
>>>>>>> adfcb6ffe175d84002d453be5e712daf3a8a6072
    }
  },

  tableSelect: function (event) {
    selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5))
    console.log("num: " + selectNum)
  },
})

