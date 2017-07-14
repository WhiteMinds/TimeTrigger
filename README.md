# TimeTrigger
Javascript TimeTrigger, send events "newSec", "newMinute", "newHour", "newDate", "newWeek", "newMonth", "newYear"

# Test code
```javascript
trigger = require("TimeTrigger")();
let arr = ["newSec", "newMinute", "newHour", "newDate", "newWeek", "newMonth", "newYear"];
for(let i in arr){
    (function (m) {
        trigger.on(m, function (date) {
            console.log(m, date.format("hh:mm:ss"));
        });
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
