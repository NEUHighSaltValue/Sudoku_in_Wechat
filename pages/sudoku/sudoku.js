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
                if (this.boardData[x][y].content.indexOf(tempNum.toString()) == -1){
                    //曲悦测试出的 bug, note 模式下按空的 table 后 board 内显示0
                    if (tempNum == 0) {
                        this.boardData[x][y].content = "0";
                    } else {
                        this.boardData[x][y].content += tempNum.toString();
                    }
                } else {
                    this.boardData[x][y].content = this.boardData[x][y].content.split(tempNum.toString()).join("");
                    if (this.boardData[x][y].content == ""){
                        this.boardData[x][y].content = "0";
                    }
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
                // console.log(i, j ,this.getData(i,j))
                if (this.boardData[i][j].cat == false) {
                    this.boardData[i][j].color = 1;
                } else {
                    if (this.boardData[i][j].note == true) {
                        this.boardData[i][j].color = 5;
                        //console.log("note: ",i, j)
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
                this.boardData[i][j].car = false;
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
var filltype = false;
var fillOrNot = false;

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
var preNum = 0;
var sudoku = new Sudoku();
var num = 0;
var strH = '';
var strM = '';
var strS = '';
var timer = '';
var level = 0;
var remainNum = 81;
var NowTime;
// '-'开头为正常模式，'+'开头为note模式
var cacheData = '';
var restoreData = '';
var newGameObject, newGameData, newGameAns;
var guide = true

Page({
    data: {
        generateOk: false,
        timeText: '00:00',
        timeShowOrNot: true,
        completed: false,
        note: false,
        noteButton: false,
        noteFill: true,
        noteFull: true,
        hightlg: true,
        hightnum: true,
        guide: -1
    },

    toNextGuide(){
        let temp = this.data.guide + 1
        if(temp == 5){
            this.changeNote()
        } else if (temp == 6) {
            sudoku.setData(1, 3, '237', true)
            this.freshUI()
            console.log(123)
        } else if (temp == 7) {

            this.changeNote()
        } else if (temp == 8) {
            this.selectNum = 2
            this.drawTable
            sudoku.highlightNum(1)
            this.freshUI()
            console.log(123)
        } else if (temp == 10) {
            wx.setStorageSync('guide','0')
            this.newGame(false)
            sudoku.setGame(newGameData, newGameAns);
        }
        console.log(this.data.guide)
        this.setData({
            guide: temp
        })
        console.log(this.data.guide)

    },

    onLoad(option) {
        let timeStop = false
        cacheData = option.cache
        if(cacheData != undefined) {
          gameID = parseInt(cacheData.substring(0, 4))
          currentNote = false
        }
        else {
          cacheData = ''
          sc = option.scence;
          level = parseInt(option.level);
          gameID = Math.floor(Math.random() * 1000) + level * 1000 + 1;
        }
        sameNumHighlight = getApp().globalData.highlightOrNot;
        errorShow = getApp().globalData.errorOrNot;
        timeShow = getApp().globalData.timeOrNot;
        filltype = getApp().globalData.typeOrNot;
        let that = this
        try{
          var value = wx.getStorageSync('guide')
          console.log("in Load the storage is :", value)
          if(value == '') {
            that.setData({
                guide: 0
            })
            timeStop = true
          }
        } catch(e) {
            console.log(e)
        }
        
        this.setData({
            timeShowOrNot: timeShow,
            noteButton: !guide,
            noteFill: true,
            noteFull: true,
            hightlg: true,
            hightnum: true
        });
        this.newGame(timeStop);
        if(cacheData != undefined) {
          var nowNote = currentNote
          for (var i = 4; i < cacheData.length; i += 4) {
            currentNote = (cacheData[i] == '-' ? false : true)
            sudoku.setData(parseInt(cacheData[i + 1]), parseInt(cacheData[i + 2]),
              parseInt(cacheData[i + 3]), currentNote)
              sudoku.freshProperty()
               
            console.log(parseInt(cacheData[i + 1]), parseInt(cacheData[i + 2]),
              parseInt(cacheData[i + 3]), currentNote)
          }
          this.freshUI()
          currentNote = nowNote
          if(timeStop)  {
              this.timeStop()
              console.log("time Stop")
          }
        } 
    },

    newGame(timeStop) {
        sudoku.reset();
        this.timeStop();
        timer = '0';
        strH = '0';
        strM = '0';
        strS = '0';
        num = 0;
        selectX = -1;
        selectY = -1;
        selectNum = -1;
        this.setData({
            timeText: '00:00'
        })
        if(gameID>9868){
            gameID=gameID-869;
        }
        try {
          var value = wx.getStorageSync('guide')
          if(value == '')
            gameID = 1
        } catch(e) {
            console.log(e)
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
                if(cacheData == '')
                  cacheData = gameID.toString()
                while(cacheData.length < 4)
                  cacheData = '0' + cacheData
                sudoku.setGame(newGameData, newGameAns);
                setTimeout(() => {
                    this.setData({
                        generateOk: true
                    })
                    this.drawBoard();
                    this.drawTable();
                    if(!timeStop)
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
        let adjustmentForTable = [0.3, 1.4, 2.35, 3.35, 4.3, 0.3, 1.3, 2.3, 3.32, 4.4]
        for (var i = 0; i < 10; i++) {
            if (i == num) {
                //Zixuan，table 选中数字的颜色
                table.setFillStyle("#64A36F");
            }
            if(i == 0 ){
                table.fillText("X", tableWidth / ratio * adjustmentForTable[i ] + lineWidth1 / ratio * i % 5, tableWidth * (3.2 + parseInt(i / 5) * 3.95) / 4 / ratio);
            }else{
            table.fillText(i.toString(), tableWidth / ratio * adjustmentForTable[i ] + lineWidth1 / ratio * i % 5, tableWidth * (3.2 + parseInt(i / 5) * 3.95) / 4 / ratio);
            }
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

    clickThenfill() {
      if(!filltype && selectNum == -1)
        return true
    },

    fillTenclick() {

    },

    cellSelect(event) {
        if(this.clickThenfill())
          return
        selectY = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
        selectX = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));
        if (filltype) {
          this.freshUI()
          //console.log(cacheData)
          return
        }
        if (selectNum != -1) {
            //console.log(selectX, selectY, selectNum, currentNote)
            sudoku.setData(selectX, selectY, selectNum, currentNote);
            //console.log(selectX, selectY, selectNum, currentNote)
            if (errorShow) {
                sudoku.judgeError()
                if (level >= 5){
                    sudoku.freshDiagonal()
                }
            }
            var note = (currentNote == true ? '+' : '-')
            cacheData += note + selectX.toString() + selectY.toString() + selectNum.toString()
            restoreData = ''
            //console.log(cacheData)
            this.freshUI();
        }
        //console.log(selectX, selectY, sudoku.getData(selectX, selectY))
        //selectNum = -1;
        //this.drawTable();
    },

    tableSelect(event) {
        // 选择数字
        selectNum = parseInt(event.changedTouches[0].y / (tableHeighInPx / 2)) * 5 + parseInt(event.changedTouches[0].x / (tableWidthInPx / 5));
        if (!filltype)
          this.drawTable(selectNum);
        // 高亮提醒
        if (sameNumHighlight) {
            sudoku.highlightNum(selectNum);
        } 
        if (errorShow) {
            sudoku.judgeError()
            if (level >= 5) {
                sudoku.freshDiagonal()
            }
        }
        if (filltype && selectX != -1 && selectY != -1) {
          var note = (currentNote == true ? '+' : '-')
          cacheData += note + selectX.toString() + selectY.toString() + selectNum.toString()
          restoreData = ''
          sudoku.setData(selectX, selectY, selectNum, currentNote);
            if (sameNumHighlight) {
                console.log("higihlight")
                sudoku.highlightNum(selectNum);
            } 
            if (errorShow) {
                sudoku.judgeError()
                if (level >= 5) {
                    sudoku.freshDiagonal()
                }
            }
          fillOrNot = true
        }
        this.freshUI();
    },

    undo() {
      if(cacheData.length <= 4)
        return
      //var undoData = cacheData.substring(cacheData.length-4, cacheData.length)
      sudoku.reset()
      sudoku.setGame(newGameData, newGameAns)
      cacheData = cacheData.substring(0, cacheData.length-4)
      /*
      restoreData += undoData
      cacheData = cacheData.substring(0, cacheData.length-4)
      console.log(undoData)
      var nowNote = (undoData[0] == '-' ? false : true)
      sudoku.setData(parseInt(undoData[1]), parseInt(undoData[2]),
        parseInt(undoData[3]), currentNote)
      */
      for(var i = 4; i < cacheData.length; i += 4) {
        currentNote = (cacheData[i] == '-' ? false : true)
        sudoku.setData(parseInt(cacheData[i + 1]), parseInt(cacheData[i + 2]),
          parseInt(cacheData[i + 3]), currentNote)
      }
      this.freshUI()
    },

    redo() {
      if(restoreData.length < 4)
        return
      var redoData = restoreData.substring(restoreData.length - 4, restoreData.length)
      cacheData += redoData
      restoreData = restoreData.substring(0, restoreData.length-4)
      var nowNote = (redoData[0] == '-' ? false : true)
      sudoku.setData(parseInt(redoData[1]), parseInt(redoData[2]),
        parseInt(redoData[3]), currentNote)
      /*
      for (var i = 0; i < restoreData.length; i += 4) {
        currentNote = (restoreData[i] == '-' ? false : true)
        sudoku.setData(parseInt(restoreData[i + 1]), parseInt(restoreData[i + 2]),
          parseInt(restoreData[i + 3]), currentNote)
      }
      */
      this.freshUI()
      currentNote = nowNote
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
        if (filltype) {
            this.fillColor(board, selectX, selectY)
        }
        for (j = 0; j < 9; j++) {
            axis = (j + 0.2) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
            for (i = 0; i < 9; i++) {
                // console.log(i, j, sudoku.getData(i, j).color)
                if (parseInt(sudoku.getData(i, j).content) != 0) {
                    if (sudoku.getData(i, j).note == false) {
                        remainNum--;
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2;
                        //console.log(axis/ratio, baseLine/ratio)
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        board.fillText(String(sudoku.getData(i, j).content), axis / ratio, baseLine / ratio);
                    } else {
                        baseLine = (i + 0.85) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + i * lineWidth2
                        board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                        var len = sudoku.getData(i, j).content.length
                        if(len > 1) {
                          board.setFontSize(cellWidth * 0.9 / Math.sqrt(len) / ratio)
                        } else if(len == 1) {
                          board.setFontSize(cellWidth * 0.9 / 1.21 / ratio)
                        }
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
        if (remainNum == 0) {
            if (sudoku.judgeCorrect()) {
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
                      that.data.timeText + '|' + mutiDraw.getNowFormatDate()+ '|0'
                    })
                  }
                })
                wx.request({
                  url: 'https://www.tianzhipengfei.xin/sudoku',
                    data: {
                        event: 'finishGame',
                        gameid: gameID,
                        userid: getApp().globalData.userInfo2.openid,
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
                try {
                  wx.setStorageSync('cache', '')
                  console.log('finish')
                } catch (e) {

                }
            }
        } else {
          try {
            wx.setStorageSync('cache', cacheData)
            console.log(cacheData)
          } catch(e) {
            
          }
        }
    },

    fillColor(board, x, y) {
      if(x == -1){
        return
      }
      if(sudoku.getData(x,y).cat == false){
        return
      }
        var pointX = (cellWidth * selectY + (1 + parseInt(selectY / 3)) * lineWidth1 + (selectY - parseInt(selectY / 3) * lineWidth2)) 
        if (selectY == 8)
            pointX = pointX + 2
        if (selectY == 7)
            pointX = pointX + 2.5
        if (selectY == 6)
            pointX = pointX + 3
        pointX = pointX / ratio
        let pointY = (cellWidth * selectX + (1 + parseInt(selectX / 3)) * lineWidth1 + (selectX - parseInt(selectX / 3)  ) * lineWidth2) / ratio;
        // console.log(selectX, selectY)
        // console.log(pointX, pointY)
        board.fillStyle = '#8EE0FB'
      //board.fillText('0', (boardWidthInPrx - lineWidth1 * 1.5) / ratio, (boardWidthInPrx - lineWidth1 * 1.5) / ratio)
      board.fillRect(pointX, pointY, cellWidth/ratio, cellWidth/ratio)
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
    },
    // noteGuide: function(e) {
    //   this.setData({
    //     noteButton: true,
    //     noteFill: false
    //   })
    // },
    // noteFGuide: function(e) {
    //   //console.log('abc')
    //   this.setData({
    //     noteFill: true,
    //     noteFull: false
    //   })
    // },
    // noteFuGuide: function(e) {
    //   this.setData({
    //     noteFull: true,
    //   })
    //   sudoku.setData(1, 3, '237', true)
    //   this.freshUI()
    //   setTimeout(() => {
    //     this.setData({ hightlg: false })}, 1200)
    //   /*
    //   wx.setStorage({
    //     key: 'guide',
    //     data: 'value'
    //   })
    //   */
    // },
    // hightGuide: function(e) {
    //   this.setData({
    //     hightlg: true,
    //     hightnum: false
    //   })
    // },
    // hightFill: function(e) {
    //   this.setData({
    //     hightnum: true
    //   })
    //   selectNum = 1
    //   this.drawTable(selectNum)
    //   sudoku.highlightNum(selectNum)
    //   this.freshUI()
    //   wx.setStorage({
    //     key: 'guide',
    //     data: 'value',
    //   })
    //   setTimeout(() => {
    //     wx.showModal({
    //       title: '提示',
    //       content: '更多模式可前往设置页面调整',
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.redirectTo({
    //             url: '/pages/select_level/select_level'
    //           })
    //         }
    //       }
    //     })
    //   }, 1200)

    // }
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

  ctx.fillText('完成:' + gameLevel, (106) / ratio, phoneHeight * 0.445)
//   ctx.fillText('PK 中Rank ' + rank, (120) / ratio, (phoneHeight * 0.22))

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