function drawMultipleNumbers(board, content, x, y) {
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