const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var sData = sudokuData()

function searchSData(id) { 
  var result 
  for (let i = 0; i < sData.list.length; i++) { 
    var s = sData.list[i] 
    if (s.id == id) { 
      result = s;
      break;
    } 
  } 
  return result || {} 
}  


module.exports = {
  formatTime: formatTime,
  sudokuData: sudokuData,
  searchSData: searchSData
}
