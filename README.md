# TimeTrigger
Javascript TimeTrigger, send events "newSec", "newMinute", "newHour", "newDate", "newWeek", "newMonth", "newYear"

# Test code
```javascript
Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

let trigger = require("time-trigger")();

let arr = ["newSec", "newMinute", "newHour", "newDate", "newWeek", "newMonth", "newYear"];
for(let i in arr){
    (function (event) {
        trigger.on(event, date => console.log(event, date.format("hh:mm:ss")));
    })(arr[i]);
}
```
output:
```
newSec 21:46:55
newSec 21:46:56
newSec 21:46:57
newSec 21:46:58
newSec 21:46:59
newSec 21:47:00
newMinute 21:47:00
newSec 21:47:01
newSec 21:47:02
newSec 21:47:03
```
