// level.js
function getLevel() {
  try {
    var expri = wx.getStorageSync('expr')
    if (expri) {
      console.log(expri)
    }
  } catch (e) {
    // Do something when catch error
  }
  if(expri < 20) {
    return 1;
  } else if(expri < 150) {
    return 2;
  } else if(expri < 450) {
    return 3
  } else if(expri < 1080) {
    return 4
  } else if(expri < 2880) {
    return 5
  } else {
    return 6
  }
}

function level_name(level) {
  switch(level) {
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
  switch(level) {
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
  var level = getLevel()
  var item = {
    ratio: 0.0,
    str: ""
  }
  wx.getStorage({
    key: 'expr',
    success: function(res) {
      item.ratio = parseInt(res.data) / level_exprience(level)
      item.str = parseInt(res.data) + "/" + level_exprience(level)
      if(item.ratio == 1.0) {
        console.log('be',item)
        item.ratio = parseInt(res.data) / level_exprience(level+1)
        item.str = parseInt(res.data) + "/" + level_exprience(level+1)
        console.log(item)
      }
      if(parseInt(res.data) >= 2880) {
        item.ratio = 1.0
        item.str = "2880/2880"
      }
    },
    fail: function() {
      item.ratio = 0.0
      item.str = "0/20"
    }
  })
  //console.log('item', item)
  return item
}
module.exports.level_ratio = level_ratio

