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

var sData = sudokuData()

function sudokuData() {
    var arr = {
        list: [
        ]
    }
    return arr;
}

module.exports = {
    searchSData: searchSData
}