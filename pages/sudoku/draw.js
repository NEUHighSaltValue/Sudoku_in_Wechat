var SudokuList = [
  [
    [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ], 
    [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
    [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
    [ 2, 1, 4, 3, 6, 5, 8, 9, 7 ],
    [ 3, 6, 5, 8, 9, 7, 2, 1, 4 ],
    [ 8, 9, 7, 2, 1, 4, 3, 6, 5 ],
    [ 5, 3, 1, 6, 4, 2, 9, 7, 8 ],
    [ 6, 4, 2, 9, 7, 8, 5, 3, 1 ],
    [ 9, 7, 8, 5, 3, 1, 6, 4, 2 ]
  ],
  [
    [ 3, 9, 4, 5, 1, 7, 6, 2, 8 ],
    [ 5, 1, 7, 6, 2, 8, 3, 9, 4 ],
    [ 6, 2, 8, 3, 9, 4, 5, 1, 7 ],
    [ 9, 3, 5, 4, 7, 1, 2, 8, 6 ],
    [ 4, 7, 1, 2, 8, 6, 9, 3, 5 ],
    [ 2, 8, 6, 9, 3, 5, 4, 7, 1 ],
    [ 1, 4, 3, 7, 5, 9, 8, 6, 2 ],
    [ 7, 5, 9, 8, 6, 2, 1, 4, 3 ],
    [ 8, 6, 2, 1, 4, 3, 7, 5, 9 ]
  ],
  [
    [ 7, 6, 1, 9, 8, 4, 2, 3, 5 ], 
    [ 9, 8, 4, 2, 3, 5, 7, 6, 1 ],
    [ 2, 3, 5, 7, 6, 1, 9, 8, 4 ],
    [ 6, 7, 9, 1, 4, 8, 3, 5, 2 ],
    [ 1, 4, 8, 3, 5, 2, 6, 7, 9 ],
    [ 3, 5, 2, 6, 7, 9, 1, 4, 8 ],
    [ 8, 1, 7, 4, 9, 6, 5, 2, 3 ],
    [ 4, 9, 6, 5, 2, 3, 8, 1, 7 ],
    [ 5, 2, 3, 8, 1, 7, 4, 9, 6 ] 
  ],
  [
    [ 7, 1, 5, 4, 3, 6, 2, 9, 8 ],
    [ 4, 3, 6, 2, 9, 8, 7, 1, 5 ],
    [ 2, 9, 8, 7, 1, 5, 4, 3, 6 ],
    [ 1, 7, 4, 5, 6, 3, 9, 8, 2 ],
    [ 5, 6, 3, 9, 8, 2, 1, 7, 4 ],
    [ 9, 8, 2, 1, 7, 4, 5, 6, 3 ],
    [ 3, 5, 7, 6, 4, 1, 8, 2, 9 ],
    [ 6, 4, 1, 8, 2, 9, 3, 5, 7 ],
    [ 8, 2, 9, 3, 5, 7, 6, 4, 1 ] 
  ]
]

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
} 

function randomsort(a, b) {
  return Math.random() > .5 ? -1 : 1
}

function swapNumber(sudoku) {
  var randomList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  randomList.sort(randomsort)
  for (i = 0; i < 9; i++) {
    for (j = 0; j < 9; j++) {
      for (k = 0; k < 9; k++)
        if (sudoku[i][j] == randList[k]) {
          sudoku[i][j] = randList[(k+1) % 9]
          break; 
        }
    }
  }
  return sudoku
}

function swapRow(sudoku) {
    var random = Math.random()
    var randomRowNum = 0
}

function newSudoku() {

}


function drawMultipleNumbers(board, content, x, y) {
  //board.fillText(content, x, y)
  switch(content.length) {
    case 1:
      board.fillText(content, x, y)
      break
    case 2:
      board.fillText(content, x-4, y-3)
      break
    case 3:
      board.fillText(content[0], x-5, y-11)
      board.fillText(content[1], x+13, y-11)
      board.fillText(content[2], x+4, y+1)
      break
    case 4:
      board.fillText(content[0], x - 1, y - 12.5)
      board.fillText(content[1], x + 10, y - 12.5)
      board.fillText(content[2], x - 1, y + 1)
      board.fillText(content[3], x + 10, y + 1)
      break
    case 5:
      board.fillText(content[0], x - 4, y - 14)
      board.fillText(content[1], x + 14, y - 14)
      board.fillText(content[2], x + 5, y + -6)
      board.fillText(content[3], x - 4, y + 2)
      board.fillText(content[4], x + 14, y + 2)
      break
    case 6:
      board.fillText(content[0], x , y - 16)
      board.fillText(content[1], x + 10, y - 16)
      board.fillText(content[2], x - 5.5, y - 6)
      board.fillText(content[3], x + 15.5, y - 6)
      board.fillText(content[4], x, y + 3.5)
      board.fillText(content[5], x + 10, y + 3.5)
      break
    case 7:
      board.fillText(content[0], x, y - 16)
      board.fillText(content[1], x + 10, y - 16)
      board.fillText(content[2], x - 5.5, y - 6)
      board.fillText(content[3], x + 5, y - 6)
      board.fillText(content[4], x + 15.5, y - 6)
      board.fillText(content[5], x, y + 3)
      board.fillText(content[6], x + 10, y + 3)
      break
    case 8:
      board.fillText(content[0], x - 5, y - 16.5)
      board.fillText(content[1], x + 5.75, y - 16.5)
      board.fillText(content[2], x + 16.5, y - 16.5)
      board.fillText(content[3], x - 5, y - 6.5)
      board.fillText(content[4], x + 16.5, y - 6.5)
      board.fillText(content[5], x - 5, y + 3)
      board.fillText(content[6], x + 5.75, y + 3)
      board.fillText(content[7], x + 16.5, y + 3)
      break
    case 9:
      board.fillText(content[0], x - 5, y - 16.5)
      board.fillText(content[1], x + 5.75, y - 16.5)
      board.fillText(content[2], x + 16.5, y - 16.5)
      board.fillText(content[3], x - 5, y - 6.5)
      board.fillText(content[4], x + 5.75, y - 6.5)
      board.fillText(content[5], x + 16.5, y - 6.5)
      board.fillText(content[6], x - 5, y + 3)
      board.fillText(content[7], x + 5.75, y + 3)
      board.fillText(content[8], x + 16.5, y + 3)
      break
  }
}

module.exports.drawMultipleNumbers = drawMultipleNumbers