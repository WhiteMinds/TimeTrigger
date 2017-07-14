const EventEmitter = require('events');
const util = require('util');
module.exports = TimeTrigger;

function TimeTrigger() {
    if (!(this instanceof TimeTrigger))
        return new TimeTrigger();

    EventEmitter.call(this);

    this.cut = 0;
    this.lastLoop = Date.now();
    this.last = new Date();
    this.need = 1000 - this.last % 1000;

    this.loop();
}
util.inherits(TimeTrigger, EventEmitter);

TimeTrigger.prototype.loop = function () {
    let now = Date.now();
    this.cut += now - this.lastLoop;
    this.lastLoop = now;
    this.handleCut();
    setTimeout(this.loop.bind(this), 100);
};

TimeTrigger.prototype.handleCut = function () {
    while(this.cut >= this.need){
        let now = new Date(this.last.getTime() + this.need);
        this.emit("newSec", now);
        if(now.getMinutes() !== this.last.getMinutes()) this.emit("newMinute", now);
        if(now.getHours() !== this.last.getHours()) this.emit("newHour", now);
        if(now.getDate() !== this.last.getDate()) this.emit("newDate", now);
        if(now.getDay() !== this.last.getDay() && now.getDay() === 1) this.emit("newWeek", now);
        if(now.getMonth() !== this.last.getMonth()) this.emit("newMonth", now);
        if(now.getYear() !== this.last.getYear()) this.emit("newYear", now);

        this.cut -= this.need;
        this.last = now;
        this.need = 1000 - this.last % 1000;
    }
};