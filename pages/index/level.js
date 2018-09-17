// level.js
let level_dict = {
    "普通数独-入门": 3,
    "普通数独-初级": 6,
    "普通数独-中级": 10,
    "普通数独-高级": 15,
    "普通数独-骨灰": 20,
    "对角数独-入门": 6,
    "对角数独-初级": 10,
    "对角数独-中级": 15,
    "对角数独-高级": 20,
    "对角数独-骨灰": 25
};

function getLevel() {
    try {
        var expr = wx.getStorageSync('expr')
        if (expr) {
            if (expr < 20) {
                return 1;
            } else if (expr < 150) {
                return 2;
            } else if (expr < 450) {
                return 3
            } else if (expr < 1080) {
                return 4
            } else if (expr < 2880) {
                return 5
            } else {
                return 6
            }
        }
    } catch (e) {
        console.log("Get expr storage issue: ", e) 
    }
}

function level_name(level) {
    switch (level) {
        case 1:
            return '青铜';
        case 2:
            return '白银';
        case 3:
            return '黄金';
        case 4:
            return '白金';
        case 5:
            return '钻石';
        case 6:
            return '最强王者';
    }
}

function level_exprience(level) {
    switch (level) {
        case 1:
            return 20; // 青铜到白银
        case 2:
            return 150; // 白银到黄金
        case 3:
            return 450; // 黄金到白金
        case 4:
            return 1080; // 白金到钻石
        case 5:
            return 2880; // 钻石到最强王者
    }
}

function level_ratio() {
    try{
        var value = wx.getStorageSync('key')
        if (value) {
            let storage = splitData(value)
            wx.setStorageSync('expr', storage)
        }
    }
    catch (e){
        console.log("Get 战绩 storage issue: ", e)
    }
    var level = getLevel()
    try {
        let expr = wx.getStorageSync("expr")
        if (expr) {
            var exprItem = {
                name: "",
                ratio: 0.0,
                str: ""
            }
            exprItem.name = level_name(level)
            exprItem.ratio = parseInt(expr) / level_exprience(level)
            exprItem.str = parseInt(expr) + "/" + level_exprience(level)
            if (exprItem.ratio == 1.0) {
                exprItem.name = level_name(level + 1)
                exprItem.ratio = parseInt(expr) / level_exprience(level + 1)
                exprItem.str = parseInt(expr) + "/" + level_exprience(level + 1)
            }
            if (parseInt(expr) >= 2880) {
                exprItem.name = "最强王者"
                exprItem.ratio = 1.0
                exprItem.str = "2880/2880"
            }
            return exprItem
        } else {
            let exprNewItem = {
                name: "青铜",
                ratio: 0.0,
                str: "0/20"
            }
            wx.setStorageSync("expr", 0)
            return exprNewItem
        }
    } catch (e) {
        console.log("Get expr storage issue: ", e) 
    }
}

function splitData(data) {
    var lines = new Array()
    var words = new Array()
    var result = new Array()
    var count = 0
    var expr = 0
    lines = data.split("?")
    for (var i = 0; i < lines.length; i++) {
        words[i] = new Array()
        words[i] = lines[lines.length - i - 1].split("|")
    }
    for (var i = 0; i < words.length; i++) {
        expr += level_dict[words[i][1]]
    }
    return expr
}

module.exports.level_ratio = level_ratio