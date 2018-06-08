function createCalendar(y, m, d) {
  //获取当前月份的天数
  let nowDate = new Date();
  // if (y == nowDate.getFullYear() && m == nowDate.getMonth() + 1 || (y == 0 && m == 0))
    // debugger
  let nowYear = y == 0 ? nowDate.getFullYear() : y;
  let currentYear = nowYear;
  let nowMonth = m == 0 ? nowDate.getMonth() + 1 : m;
  let currentMonth = nowMonth;
  let nowDay = d == 0 ? nowDate.getDate() : d;

  let nowDaysNub = CalculateMonthDays(nowMonth, nowYear);
  //获取当月第一天是星期几
  //let weekDate = new Date(nowYear+"-"+nowMonth+"-"+1);
  //alert(weekDate.getDay());
  let nowWeek = parseInt(CalculateWeek(nowYear, nowMonth, 1));
  //nowWeek=weekDate.getDay()==0?7:weekDate.getDay();
  //let nowWeek=weekDate.getDay();
  //获取上个月的天数
  let lastMonthDaysNub = CalculateMonthDays((nowMonth - 1), nowYear);
  let lastMonthDays = []
  if (nowWeek != 0) {
    //生成上月剩下的日期

    for (let i = (lastMonthDaysNub - (nowWeek - 1)); i < lastMonthDaysNub; i++) {
      lastMonthDays.push(i + 1)
    }
  }

  //生成当月的日期
  let thisMontDays = []
  for (let i = 0; i < nowDaysNub; i++) {
    // if (i == (nowDay - 1)) $dayItem.append("<div class=\"item currentItem\"><a>" + (i + 1) + "</a></div>");
    // else $dayItem.append("<div class=\"item\"><a>" + (i + 1) + "</a></div>");
    thisMontDays.push(i + 1)
  }

  //获取总共已经生成的天数
  let hasCreateDaysNub = nowWeek + nowDaysNub;
  //如果小于42，往下个月推算
  let nextMonthDays = []
  if (hasCreateDaysNub < 42) {
    for (let i = 0; i <= (42 - hasCreateDaysNub); i++) {
      // $dayItem.append("<div class=\"item lastItem\"><a>" + (i + 1) + "</a></div>");
      nextMonthDays.push(i + 1)
    }
  }
  // console.log(lastMonthDays)
  // console.log(thisMontDays)

  // console.log(nextMonthDays)
  let objArray = []
  for (let i = 0; i < 6 * 7; i++) {
    if (i < lastMonthDays.length) {
      let obj = {
        type: 1,
        day: lastMonthDays[i]
      }
      objArray.push(obj)
    }
    if (i >= lastMonthDays.length && i < lastMonthDays.length + thisMontDays.length) {
      let obj = {
        type: 2,
        day: thisMontDays[i - lastMonthDays.length]
      }
      objArray.push(obj)
    }
    if (i >= lastMonthDays.length + thisMontDays.length) {
      let obj = {
        type: 3,
        day: nextMonthDays[i - lastMonthDays.length - thisMontDays.length]
      }
      objArray.push(obj)
    }
  }
  // console.log(objArray)

return objArray;

}
function IsRuiYear(aDate) {
  return (0 == aDate % 4 && (aDate % 100 != 0 || aDate % 400 == 0));
}
function CalculateWeek(y, m, d) {
  // console.log("年月日",y,m,d)
  //这里决定开始日期是1为周日 7为周六
  let arr = "1234567".split("");
  // with (document.all) {
    let vYear = parseInt(y, 10);
    let vMonth = parseInt(m, 10);
    let vDay = parseInt(d, 10);
  // }
  let week = arr[new Date(y, m - 1, d).getDay()];
  return week;
}
function CalculateMonthDays(m, y) {
  let mDay = 0;
  if (m == 0 || m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
    mDay = 31;
  } else {
    if (m == 2) {
      //判断是否为芮年
      let isRn =IsRuiYear(y);
      if (isRn == true) {
        mDay = 29;
      } else {
        mDay = 28;
      }
    } else {
      mDay = 30;
    }
  }
  return mDay;
}
module.exports = {
  createCalendar: createCalendar
}
