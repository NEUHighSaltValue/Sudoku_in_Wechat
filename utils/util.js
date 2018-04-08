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

function sudokuData(){
    var arr = { 
        list: [
            {
                id: '1',
                level: '1',
                data: '210030005000006004000842000032408700908000402005709860000295000500100000800070021'
            },
            {
                id: '2',
                level: '1',
                data: '000030005000006004000842000032408700908000402005709860000295000500100000800070021'
            }
        ]
    }
    return arr
}

module.exports = {
  formatTime: formatTime,
  sudokuData: sudokuData,
  searchSData: searchSData
}
