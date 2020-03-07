"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var Timer = (function () {
    function Timer(period) {
        this.period = 1000 * 60 * 2;
        this.subscribers = [];
        this.setPeriod(period);
        this.start();
    }
    Timer.prototype.emit = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.subscribers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fn = _c.value;
                if (fn && typeof fn === 'function') {
                    fn();
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Timer.prototype.start = function () {
        var _this = this;
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.timer = setInterval(function () {
            _this.emit();
        }, this.period);
    };
    Timer.prototype.stop = function () {
        clearInterval(this.timer);
    };
    Timer.prototype.on = function (fn) {
        this.subscribers.push(fn);
    };
    Timer.prototype.setPeriod = function (period) {
        if (period) {
            this.period = period;
        }
    };
    Timer.prototype.getPeriod = function () {
        return this.period;
    };
    return Timer;
}());
exports.Timer = Timer;
//# sourceMappingURL=timer.js.map