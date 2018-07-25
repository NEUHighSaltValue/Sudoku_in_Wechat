/*
For each cell
cat true means can fill the call, false not
note true means this cell is in note mode
content contains the number filled
color means the number's color: 0 means normal, 1 means ubchangable number, 2 means error, 3 means highlight in same number as user choose， 4 means unchangeable number error, 5 means note
*/
function cellModel() {
    this.cat = true;
    this.note = false;
    if (arguments[0]) {
        this.content = arguments[0];
    } else {
        this.content = '0';
    }
    this.color = 0;
}

class Sudoku {
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
        let tempNum = num
        //Judge can fill the cell or not
        if (this.boardData[x][y].cat == false) {
            this.freshProperty();
            return;
        } else {
            if (this.boardData[x][y].content != "0" && this.boardData[x][y].content == num.toString()) {
                num = 0;
            }
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
                if (this.boardData[x][y].content.indexOf(tempNum.toString()) == -1) {
                    //曲悦测试出的 bug, note 模式下按空的 table 后 board 内显示0
                    if (tempNum == 0) {
                        this.boardData[x][y].content = "0";
                    } else {
                        this.boardData[x][y].content += tempNum.toString();
                    }
                } else {
                    this.boardData[x][y].content = this.boardData[x][y].content.split(tempNum.toString()).join("");
                }
            } else {
                if (this.boardData[x][y].content == num.toString()) {
                    this.boardData[x][y].content = "0";
                } else {
                    this.boardData[x][y].content = num.toString();
                }
            }
            this.freshProperty()
        }
    }

    highlightNum(num) {
        if (num == 0) {
            return
        }
        this.freshProperty();
        for (var i = 0; i < 9; i++) {
            if (this.row[i][num - 1].size > 0) {
                for (var tempNum of this.row[i][num - 1]) {
                    let tempRow = parseInt(tempNum / 10);
                    let tempCol = tempNum % 10;
                    if (this.boardData[tempRow][tempCol].color != 2 &&
                        this.boardData[tempRow][tempCol].color != 4) {
                        this.boardData[tempRow][tempCol].color = 3;
                    }
                }
            }
        }
    }

    freshProperty() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.boardData[i][j].cat == false) {
                    this.boardData[i][j].color = 1;
                } else {
                    if (this.boardData[i][j].note == true) {
                        this.boardData[i][j].color = 5;
                        console.log("note: ",i, j)
                    } else {
                        this.boardData[i][j].color = 0;
                    }
                }
            }
        }
    }
    judgeError(){
        console.log("in error")
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this.row[i][j].size > 1) {
                    for (var num of this.row[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
                if (this.col[i][j].size > 1) {
                    for (var num of this.col[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
                if (this.zone[i][j].size > 1) {
                    for (var num of this.zone[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        if (this.boardData[tempRow][tempCol].cat == true) {
                            this.boardData[tempRow][tempCol].color = 2;
                        } else {
                            this.boardData[tempRow][tempCol].color = 4;
                        }
                    }
                }
            }
        }
    }

    returnNum(i, j) {
        if (this.getData(i, j).content == "0") {
            return -1
        } else if (this.getData(i, j).content.length > 1) {
            return -1
        } else {
            return parseInt(this.getData(i, j).content) - 1
        }
    }

    freshDiagonal() {
        var coord1 = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        var coord2 = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                var num = this.returnNum(i, j)
                if (i == j && num != -1 && coord1[num] == -1) {
                    coord1[num] = i * 10 + j
                } else if (i == j && num != -1 && coord1[num] != -1) {
                    if (this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].cat == true) {
                        this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].color = 2
                    } else {
                        this.boardData[parseInt(coord1[num] / 10)][coord1[num] % 10].color = 4
                    }
                    if (this.boardData[i][j].cat == true) {
                        this.boardData[i][j].color = 2
                    } else {
                        this.boardData[i][j].color = 4
                    }
                    coord1[num] = i * 10 + j;
                }

                if (i + j == 8 && num != -1 && coord2[num] == -1) {
                    coord2[num] = i * 10 + j;
                } else if (i + j == 8 && num != -1 && coord2[num] != -1) {
                    if (this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].cat == true) {
                        this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].color = 2
                    } else {
                        this.boardData[parseInt(coord2[num] / 10)][coord2[num] % 10].color = 4
                    }
                    if (this.boardData[i][j].cat == true) {
                        this.boardData[i][j].color = 2
                    } else {
                        this.boardData[i][j].color = 4
                    }
                    coord2[num] = i * 10 + j;
                }
            }
        }
    }

    setGame(gameData, gameAns) {
        var position = 0;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                position = i * 9 + j;
                if (gameData[position] != '0') {
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
        var userAns = ""
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                userAns += this.boardData[i][j].content;
            }
        }
        return userAns == this.ans;
    }

    freeze() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.boardData[i][j].cat = false;
            }
        }
    }
}

//全局设置变量
var currentNote = false;
var sameNumHighlight = false;
var errorShow = false;
var timeShow = true;
var gameID = 0;

let phoneWidth = wx.getSystemInfoSync().screenWidth;
let ratio = 750 / phoneWidth;
let boardWidthInPrx = 675;
let boardWidthInPx = boardWidthInPrx * phoneWidth / 750;
let tableWidthInPrx = 527;
let tableHeighInPrx = 213.5;
let tableWidthInPx = tableWidthInPrx * phoneWidth / 750;
let tableHeighInPx = tableHeighInPrx * phoneWidth / 750;
let lineWidth1 = 2;
let lineWidth2 = 1.5;
let cellWidth = (boardWidthInPrx - lineWidth1 * 4 - lineWidth2 * 6) / 9;
let tableWidth = (tableWidthInPrx - lineWidth1 * 6) / 5;
//Zixuan board 里各种情况下的颜色
let colorTable = ["gray", "black", "#CC6699", "#CC9900", "#CC0000", "#333399"]
let sudokuGameData1 = require('../../utils/data1.js')
let sudokuGameData2 = require('../../utils/data2.js')
let sudokuGameData3 = require('../../utils/data3.js')
let sudokuGameData4 = require('../../utils/data4.js')
let sudokuGameData5 = require('../../utils/data5.js')
let sudokuGameData6 = require('../../utils/data6.js')
let sudokuGameData7 = require('../../utils/data7.js')
let sudokuGameData8 = require('../../utils/data8.js')
let sudokuGameData9 = require('../../utils/data9.js')
let sudokuGameData10 = require('../../utils/data10.js')
let mutiDraw = require('../../pages/sudoku/draw.js')

let phoneHeight = wx.getSystemInfoSync().screenHeight;
let canvasWidth = phoneWidth * 0.667;
let canvasHeight = phoneHeight * 0.52;
var sc;// scene
var ACCESS_TOKEN;
var QrPath;
var avaImage;//avatar
var isPk = false;
var isgetQr = false;
var avatarPath;
var gameLevel;
var usedTime;
var rank = 1;
var imagePath;
var shareImg;

var selectX = -1;
var selectY = -1;
var selectNum = -1;
var sudoku = new Sudoku();
var num = 0;
var strH = '';
var strM = '';
var strS = '';
var timer = '';
var level = 0;
var remainNum = 81;
var NowTime;

Page({
    data: {
        generateOk: false,
        timeText: '00:00',
        timeShowOrNOt: true,
        completed: false,
        note: false
    },

    onLoad(option) {
        sc = option.scence;
        level = parseInt(option.level);
        sameNumHighlight = getApp().globalData.highlightOrNot;
        errorShow = getApp().globalData.errorOrNot;
        timeShow = getApp().globalData.timeOrNot;
        this.setData({
            timeShowOrNOt: timeShow
        });
        this.newGame();
    },

    newGame() {
        this.setData({
            generateOk: false
        })
        sudoku.reset();
        sudoku.reset();
        this.timeStop();
        timer = '0';
        strH = '0';
        strM = '0';
        strS = '0';
        num = 0;
        this.setData({
            timeText: '00:00'
        })

        var newGameObject, newGameData, newGameAns;
        gameID = Math.floor(Math.random() * 1000) + level * 1000+1;
        if(gameID>9868){
            gameID=gameID-869;
        }
        wx.request({
          url: 'https://www.tianzhipengfei.xin/sudoku',
            data: {
                event: 'getGameData',
                gameid: gameID
            },
            method: "POST",
            success: res => {
              newGameObject = res.data;
              newGameData = newGameObject.data;
              newGameAns = newGameObject.ans;
              if(newGameAns == undefined) {
                this.gameID = Math.floor(Math.random() * 200) + level * 1000;
                switch (level) {
                  case 0:
                    newGameObject = sudokuGameData1.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    //console.log(gameID)
                    break;
                  case 1:
                    newGameObject = sudokuGameData2.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 2:
                    newGameObject = sudokuGameData3.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 3:
                    newGameObject = sudokuGameData4.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 4:
                    newGameObject = sudokuGameData5.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 5:
                    newGameObject = sudokuGameData6.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 6:
                    newGameObject = sudokuGameData7.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 7:
                    newGameObject = sudokuGameData8.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 8:
                    newGameObject = sudokuGameData9.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                  case 9:
                    newGameObject = sudokuGameData10.searchSData(this.gameID);
                    newGameData = newGameObject.data;
                    newGameAns = newGameObject.ans;
                    break;
                }
              }
            },
            fail: () =>{
                this.gameID = Math.floor(Math.random() * 200) + level * 1000;
                switch (level) {
                    case 0:
                        newGameObject = sudokuGameData1.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 1:
                        newGameObject = sudokuGameData2.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 2:
                        newGameObject = sudokuGameData3.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 3:
                        newGameObject = sudokuGameData4.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 4:
                        newGameObject = sudokuGameData5.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 5:
                        newGameObject = sudokuGameData6.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 6:
                        newGameObject = sudokuGameData7.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 7:
                        newGameObject = sudokuGameData8.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 8:
                        newGameObject = sudokuGameData9.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                    case 9:
                        newGameObject = sudokuGameData10.searchSData(this.gameID);
                        newGameData = newGameObject.data;
                        newGameAns = newGameObject.ans;
                        break;
                }
            },
            complete:() => {
                sudoku.setGame(newGameData, newGameAns);
                setTimeout(() => {
                    this.setData({
                        generateOk: true
                    })
                    this.drawBoard();
                    this.drawTable();
                    this.timeStart();
                    this.freshUI();
                }, 1200);
            }

        })
    },

    drawTable(num) {
        //Table
        var startPointX = lineWidth1 / 2 / ratio;
        var startPointY = lineWidth1 / 2 / ratio;
        var tempWidth = (tableWidthInPrx - lineWidth1 * 1.5) / ratio;
        var tempHeight = (tableHeighInPrx - lineWidth1 * 1.5) / ratio;
        let table = wx.createCanvasContext('table');
        //Zixuan，table table 格子线的颜色
        table.setStrokeStyle("gray");
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
        table.setFontSize(tableWidth * 0.7 / ratio);
        table.setTextAlign = 'center';
        //Zixuan table 里非选择数字的颜色
        table.setFillStyle("#4169E1")
        let adjustmentForTable = [1.4, 2.35, 3.35, 4.3, 0.3, 1.3, 2.3, 3.32, 4.4]
        for (var i = 1; i < 10; i++) {
            if (i == num) {
                //Zixuan，table 选中数字的颜色
                table.setFillStyle("#64A36F");
            }
            table.fillText(i.toString(), tableWidth / ratio * adjustmentForTable[i - 1] + lineWidth1 / ratio * i % 5, tableWidth * (3.2 + parseInt(i / 5) * 3.95) / 4 / ratio);
            //Zixuan table 里非选择数字的颜色
            table.setFillStyle("#4169E1");
        }
        table.draw();

        //!Table
    },

    drawBoard() {
        //Board
        let board = wx.createCanvasContext('board');
        //Zixuan board 里格子的线的颜色
        board.setStrokeStyle("#000000");
        board.setLineWidth(lineWidth1 * 2 / ratio);
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
    },

    cellSelect(event) {
        selectY = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
        selectX = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));

        if (selectNum != -1) {
            console.log(selectX, selectY, selectNum, currentNote)
            sudoku.setData(selectX, selectY, selectNum, currentNote);
            if (errorShow) {
                sudoku.judgeError()
                if (level >= 5){
                    sudoku.freshDiagonal()
                }
            }
            this.freshUI();
        }
        selectNum = -1;
        this.drawTable();
    },

    tableSelect(event) {
        selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5));
        this.drawTable(selectNum);
        if (sameNumHighlight) {
            sudoku.highlightNum(selectNum);
        } 
        if (errorShow){
            sudoku.judgeError();
        }
        this.freshUI();
    },

    toLevelSelect() {
        wx.redirectTo({
            url: '/pages/level_select/level_select',
        })
    },

    timeStart() {
        timer = setInterval(this.countTime, 1000);
    },

    countTime() {
        strH = zeroFill('' + parseInt(num / 3600 % 24), 2);
        strM = zeroFill('' + parseInt(num / 60 % 24), 2);
        strS = zeroFill('' + parseInt(num % 60), 2);
        if ((parseInt(num / 3600 % 24)) > 0) {
            this.setData({
                timeText: strH + ':' + strM + ':' + strS
            })
        } else {
            this.setData({
                timeText: strM + ':' + strS
            })
        }
        num++;
    },

    timeStop() {
        clearInterval(timer)
    },

    changeNote() {
        currentNote = !currentNote;
        this.setData({
            note: currentNote
        })
    },

    freshUI() {
        let board = wx.createCanvasContext('boardData');
        board.setFontSize(cellWidth * 0.9 / ratio);
        var i, j, axis, baseLine;
        remainNum = 81;
        for (j = 0; j < 9; j++) {
            axis = (j + 0.2) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
            for (i = 0; i < 9; i++) {
                // console.log(i, j, sudoku.getData(i, j).color)
                if (parseInt(sudoku.getData(i, j).content) != 0) {
                    if (sudoku.getData(i, j).note == false) {
                        remainNum--;
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2;
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.fillText(String(sudoku.getData(i, j).content), axis / ratio, baseLine / ratio);
                    } else {
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.setFontSize(cellWidth * 0.9 / Math.sqrt(sudoku.getData(i, j).content.length) / ratio)
                        mutiDraw.drawMultipleNumbers(board, sudoku.getData(i, j).content, axis / ratio, baseLine / ratio)
                        board.setFontSize(cellWidth * 0.9 / ratio)
                    }
                } else if ((i == j || i + j == 8) && level > 4) {
                    board.arc(((j + 0.5) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + j * lineWidth2) / ratio, ((i + 0.5) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2) / ratio, cellWidth / Math.sqrt(5) / ratio, 0, 2 * Math.PI)
                    board.stroke()
                    board.beginPath()
                }
            }
        }
        board.draw();
        if (remainNum < 81) {
            if (sudoku.judgeCorrect() || true) {
                this.timeStop();
                sudoku.freeze(); 
                sc = decodeURIComponent(sc)
                getQrCodeAndAvatar();
                usedTime = this.data.timeText;
                gameLevel = mutiDraw.levelTranslation(level)
                let that = this;
                //Shuyuan
                var storage = ""
                var exprNow = 0
                wx.getUserInfo({
                  success: function(res) {
                    wx.getStorage({
                      key: 'expr',
                      success: function (res) {
                        if (res.data) {
                          exprNow = parseInt(res.data) + mutiDraw.getExperience(level)
                        } else {
                          console.log("no expr")
                        }
                      },
                      fail: function (res) {
                        exprNow = mutiDraw.getExperience(level)
                      },
                      complete: function () {
                        wx.setStorage({
                          key: 'expr',
                          data: exprNow
                        })
                        //console.log(exprNow)
                      }
                    })
                  }
                })
                
                wx.getStorage({
                  key: 'key',
                  success: function(res) {
                    if (res.data) {
                      storage = res.data + '?'
                    } else{
                      console.log("no key")
                    }
                  },
                  fail: function(res) {
                    storage = ""
                  },
                  complete: function(){
                    wx.setStorage({
                      key: 'key',
                      data: storage + mutiDraw.levelImgPath(level) + '|' + mutiDraw.levelTranslation(level) + '|' + 
                      that.data.timeText + '|' + mutiDraw.getNowFormatDate() + '|' +'0'
                    })
                  }
                })
                wx.request({
                  url: 'https://www.tianzhipengfei.xin/sudoku',
                    data: {
                        event: 'finishGame',
                        gameid: gameID,
                        userid: wx.getStorageInfoSync('openid'),
                        finishTime: num
                    },
                    method: "POST",
                    success: res => {
                    }
                })

                wx.showToast();
                this.setData({
                    completed: true
                })
            }
        }
    },

    canvasIdErrorCallback(e) {
        console.error(e.detail.errMsg);
    },

    save: function (e) {
        var that = this;
        console.log(shareImg);
        setTimeout(function () {
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
                                wx.navigateBack({
                                    delta: 5
                                })
                            }
                        }
                    })
                },
                fail(res) {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'loading'
                    })
                }
            })
        }, 200)

    },
    close: function (e) {
        wx.navigateBack({
            delta: 5
        })
    }
})


function zeroFill(str, n) {
    if (str.length < n) {
        str = '0' + str
    }
    return str
}


//获得ACCESS_TOKEN、二维码后在画布上进行绘制
function paint() {
  console.log("begin paint")
  const ctx = wx.createCanvasContext('cardCanvas');
  //画背景图
  //ctx.drawImage(图片路径。左上角x,左上角y,图片宽，图片高)
  ctx.drawImage("/images/background_circle.jpg", 0,0, canvasWidth, canvasHeight)
  
  //写文字
  ctx.setFontSize(28)
  ctx.setFillStyle('#CC3300')
  //ctx.fillText(字符串，x,y)
  ctx.fillText('完成!', (182) / ratio, phoneHeight * 0.368)

  ctx.setFontSize(16)
  ctx.setFillStyle('#000000')
  ctx.fillText('用时:' + usedTime, (164) / ratio, (phoneHeight * 0.41))

  ctx.fillText('解决:' + gameLevel, (106) / ratio, phoneHeight * 0.445)
  
  //非PK版shareCard
  // if (!isPk) {
  //   ctx.fillText('PK 中Rank ' + rank, (120) / ratio, (phoneHeight * 0.22))
  // }
  ctx.stroke();
  
  var QrCodeRadius = 200/2;//小程序码半径，275是小程序码边长
  var avatarRadius = 45;//头像半径
  var QrCodeYRatio = 0.12;//小程序码左上角Y位置占整个canvas的比例

  ctx.save();
  ctx.beginPath();
  //ctx.arc(圆心x，圆心y，半径，初始弧度，要画弧度)
  ctx.arc((250 - QrCodeRadius) / ratio + QrCodeRadius/ratio, phoneHeight * QrCodeYRatio + QrCodeRadius/ratio,            QrCodeRadius / ratio, 0, 2 * Math.PI);
  ctx.clip();//次方法下面的部分为待剪切区域，上面的部分为剪切区域

  ctx.beginPath();
  ctx.drawImage(imagePath, (250 - QrCodeRadius) / ratio, phoneHeight * QrCodeYRatio, QrCodeRadius * 2 / ratio, QrCodeRadius * 2 / ratio)
  ctx.restore();

  if (isgetQr) {
    ctx.save(); 
    ctx.setStrokeStyle('#FFFFFF')
    ctx.beginPath(); 
    //头像
    //ctx.arc((238 + 13) / ratio, phoneHeight * 0.25 + 137.5 / ratio, r / ratio, 0, 2 * Math.PI);
    ctx.arc((238 + 13) / ratio, phoneHeight * QrCodeYRatio + QrCodeRadius / ratio, avatarRadius / ratio, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();//次方法下面的部分为待剪切区域，上面的部分为剪切区域
    ctx.beginPath();
    //头像
    ctx.drawImage(avatarPath, (250 - avatarRadius) / ratio, phoneHeight * QrCodeYRatio + QrCodeRadius / ratio - avatarRadius / ratio, 2 * avatarRadius / ratio, 2 * avatarRadius / ratio);
    ctx.restore();
  }
  ctx.stroke();
  ctx.draw(false, function () {
    setTimeout(function () {
      wx.canvasToTempFilePath({
        fileType: 'jpg',
        canvasId: 'cardCanvas',
        success: function (res) {
          shareImg = res.tempFilePath;
        }
      }, this)
    }, 200)
  })
}
//从后端服务器获取二维码和头像
function getQrCodeAndAvatar() {
  wx.getStorage({
    key: 'avatar',
    success: function (res) {
      console.log(res.data)
      avatarPath = res.data;
    },
    fail: function () {
      avatarPath = "https://www.tianzhipengfei.xin/wechat_image/mmopen/vi_32/s6Lod0Ycic00Fxkt2an1DibesvMuderXrnESMXDmYY4z1jcAaFCoAZG1HzKvaHcBUFdv4UmZq0aA587FNeDvdOUQ/132";
    },
    complete: function () {
      wx.request({
        url: 'https://www.tianzhipengfei.xin/sudoku',
        data: {
          event: 'getQR',
          scene: sc,
          width: 430
        },
        method: "POST",
        success: res => {
          QrPath = res.data
          //console.log(QrPath)
          //console.log(avatarPath)
          wx.getImageInfo({
            src: QrPath,
            success: function (sres) {
              imagePath = sres.path;
              isgetQr = true;
              wx.getImageInfo({
                src: avatarPath,
                success: function (sres) {
                  avatarPath = sres.path;
                },
                complete: function (cres) {
                  paint();
                }
              })
            },
            complete: function (fres) {
              //paint();
            }
          })

          //paint();
        },
        fail: res => {
          paint();
        },
        complete: res => {
          //paint();
        }
      })
    }
  }); 
}