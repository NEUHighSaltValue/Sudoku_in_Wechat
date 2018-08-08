function drawMultipleNumbers(board, content, x, y) {
  switch(content.length) {
    case 1:
      board.fillText(content, x+3, y-3)
      break
    case 2:
      board.fillText(content, x-3.5, y-3)
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

function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}

function levelTranslation(level) {
  switch(level+1) {
    case 1: 
      return '普通数独-入门';
    case 2:
      return '普通数独-初级';
    case 3:
      return '普通数独-中级';
    case 4:
      return '普通数独-高级';
    case 5:
      return '普通数独-骨灰';
    case 6:
      return '对角数独-入门';
    case 7:
      return '对角数独-初级';
    case 8:
      return '对角数独-中级';
    case 9:
      return '对角数独-高级';
    case 10:
      return '对角数独-骨灰';
  }
}

function levelImgPath(level) {
  switch (level+1) {
    case 1:
      return '/images/level' + level + '.png';
    case 2:
      return '/images/level' + level + '.png';
    case 3:
      return '/images/level' + level + '.png';
    case 4:
      return '/images/level' + level + '.png';
    case 5:
      return '/images/level' + level + '.png';
    case 6:
      return '/images/level' + level + '.png';
    case 7:
      return '/images/level' + level + '.png';
    case 8:
      return '/images/level' + level + '.png';
    case 9:
      return '/images/level' + level + '.png';
    case 10:
      return '/images/level' + level + '.png';
  }
}

function getExperience(level) {
  switch(level) {
    case 0:
      return 3;
    case 1:
      return 6;
    case 2:
      return 10;
    case 3:
      return 15;
    case 4:
      return 20;
    case 5:
      return 6;
    case 6: 
      return 10;
    case 7:
      return 15;
    case 8:
      return 20;
    case 9:
      return 25;
  }
}

module.exports.drawMultipleNumbers = drawMultipleNumbers
module.exports.getNowFormatDate = getNowFormatDate
module.exports.levelTranslation = levelTranslation
module.exports.levelImgPath = levelImgPath
module.exports.getExperience = getExperience