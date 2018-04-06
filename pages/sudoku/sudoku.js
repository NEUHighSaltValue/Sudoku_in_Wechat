// pages/sudoku.js

//清明节任务： 1.timing and pausing  2.standard data format and data inputing  3.the function of note  4.

// importScripts('../../sudokuModel.js');
import sudokuFile from '../../sudokuModel'


//


/*
For each cell
cat true means can fill the call, false not
note true means this cell is in note mode
content contains the number filled
color means the number's color: 0 means normal, 1 means ubchangable number, 2 means error, 3 means highlight in same number as user choose
*/
function cellModel() {
    this.cat = true;
    this.note = false;
    if (arguments[0]) {
        this.content = arguments[0];
    } else {
        this.content = "0";
    }
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

    getData(x, y) {
        return this.chessBoardData[x][y];
    }

    setData(x, y, num, note) {
        //Judge can fill the cell or not
        if (this.chessBoardData[x][y].cat == false) {
            return;
        } else {
            //update record table
            if (this.chessBoardData[x][y].note == false && this.chessBoardData[x][y] != "0") {
                if (this.chessBoardData[x][y].content != "0") {
                    this.row[x][parseInt(this.chessBoardData[x][y].content) - 1].delete(x * 10 + y);
                    this.col[y][parseInt(this.chessBoardData[x][y].content) - 1].delete(x * 10 + y);
                    this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][parseInt(this.chessBoardData[x][y].content) - 1].delete(x * 10 + y);
                }
            }
            if (note == false && num != 0) {
                this.row[x][num - 1].add(x * 10 + y);
                this.col[y][num - 1].add(x * 10 + y);
                this.zone[parseInt(parseInt(x / 3) * 3 + parseInt(y / 3))][num - 1].add(x * 10 + y);
            }
            //change data in cell
            this.chessBoardData[x][y].note = note;
            if (this.chessBoardData[x][y].content == "0") {
                this.chessBoardData[x][y].content = num.toString();
            } else if (note == true) {
                this.chessBoardData[x][y].content += num.toString();
            } else {
                this.chessBoardData[x][y].content = num.toString();
            }
            this.freshProperty()
        }
    }

    freshProperty() {

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.chessBoardData[i][j].color=0;
            }
        }
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                if (this.row[i][j].size > 1) {
                    for (var num of this.row[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        console.log(tempRow + " " + tempCol);
                        this.chessBoardData[tempRow][tempCol].color = 2;
                    }
                }
                if (this.col[i][j].size > 1) {
                    for (var num of this.col[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        this.chessBoardData[tempRow][tempCol].color = 2;
                    }
                }
                if (this.zone[i][j].size > 1) {
                    for (var num of this.zone[i][j]) {
                        let tempRow = parseInt(num / 10);
                        let tempCol = num % 10;
                        this.chessBoardData[tempRow][tempCol].color = 2;
                    }
                }
            }
        }
    }

    setGame(x, y, num) {
        this.chessBoardData[x][y].content = num.toString();
        this.chessBoardData[x][y].cat = false;
        this.chessBoardData[x][y].color = 1;
    }

    show() {
        for (var i = 0; i < 9; i++) {
            var temp = ""
            for (var j = 0; j < 9; j++) {
                temp = temp + this.chessBoardData[i][j].content + " ";
            }
            console.log(temp);
        }
    }

    reset() {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                this.chessBoardData[i][j].cat = true;
                this.chessBoardData[i][j].note = false;
                this.chessBoardData[i][j].content = "0";
                this.chessBoardData[i][j].color = 0;
                this.row[i][j].clear();
                this.col[i][j].clear();
                this.zone[i][j].clear();
            }
        }
    }
}


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

var selectX = -1;
var selectY = -1;
var selectNum = -1;
var sudoku = new Sudoku();
var timeFlag=false;
var num = 0  
var strH = ''
var strM = ''
var strS = ''
var timer = '' 


Page({
    data: {
        generateOk: true,
        timeText: '00:00'
    },

    //事件处理函数
    bindViewTap: function () {},

    onLoad: function () {},

    getUserInfo: function (e) {},

    clickMe: function () {},

    newGame: function () {
        sudoku.reset();
        freshUI();
    },

    canvasIdErrorCallback: function (e) {
        console.error(e.detail.errMsg);
    },

    onReady: function (e) {
        //Board
        timeFlag = false;
        // freshUI()
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
        table.font = 'Courier';
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
        if(!timeFlag){
            timeFlag = true;
            this.timeStart();
        }
        selectX = parseInt(event.changedTouches[0].x / (boardWidthInPx / 9));
        selectY = parseInt(event.changedTouches[0].y / (boardWidthInPx / 9));
        if (selectNum != -1) {
            sudoku.setData(selectX,selectY,selectNum,currentNote);
        freshUI();
        }
    },

    tableSelect: function (event) {
      if (!timeFlag) {
          timeFlag = true;
          this.timeStart();
      }
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
            console.log(strM + ":" + strS);
            this.setData({
                timeText : strM + ':' + strS
            })
        }
        num++;
    },

    timeStop: function(){
        clearInterval(timer)
    }
})


function zeroFill (str, n) {
    if (str.length < n) {
        str = '0' + str
    }
    return str
}  

function freshUI(){
    let board = wx.createCanvasContext('boardData');
    board.setFontSize(cellWidth / 2 / ratio);
    var i, j, axis, baseLine;
    for (i = 0; i < 9; i++) {
        axis = (i + 0.45) * cellWidth + (1 + parseInt(i / 3)) * lineWidth1 + (i - parseInt(i / 3)) * lineWidth2;
        for (j = 0; j < 9; j++) {
            if (parseInt(sudoku.getData(i, j).content) != 0) {
                baseLine = (j + 0.75) * cellWidth + (1 + parseInt(j / 3)) * lineWidth1 + (j - parseInt(j / 3)) * lineWidth2;
                board.setFillStyle(colorTable[sudoku.getData(i, j).color]);
                console.log(i + " " + j + " " + colorTable[sudoku.getData(i, j).color]);
                board.fillText(sudoku.getData(i, j).content, axis / ratio, baseLine / ratio);
            }
        }
    }
    board.draw();
}

