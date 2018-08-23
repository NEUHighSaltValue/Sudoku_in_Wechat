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
                    if (this.boardData[x][y].content == "") {
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
    judgeError() {
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

module.exports.Sudoku = Sudoku