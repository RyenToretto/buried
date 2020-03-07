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
var store_1 = require("./store");
var timer_1 = require("./timer");
var Buried = (function () {
    function Buried(options) {
        var _this = this;
        this.listeners = [];
        this.options = options;
        this.store = new store_1.Store({
            url: options.url,
            getData: options.getData,
            setData: options.setData,
            report: options.report
        });
        this.timer = new timer_1.Timer(options.period);
        this.timer.on(function () {
            var e_1, _a;
            var data = _this.store.data;
            try {
                for (var _b = __values(_this.listeners), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var fn = _c.value;
                    if (fn && typeof fn === 'function') {
                        fn(data.data);
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
            _this.report();
        });
    }
    Buried.prototype.put = function (data) {
        this.store.put(data);
    };
    Buried.prototype.report = function () {
        return this.store.report();
    };
    Buried.prototype.reset = function () {
        this.store.reset();
    };
    Buried.prototype.stop = function () {
        this.timer.stop();
    };
    Buried.prototype.start = function () {
        this.timer.start();
    };
    Buried.prototype.setPeriod = function (period) {
        this.timer.stop();
        this.options.period = period;
        this.timer.setPeriod(period);
        this.timer.start();
    };
    Buried.prototype.onReport = function (fn) {
        this.listeners.push(fn);
    };
    return Buried;
}());
exports.default = Buried;
//# sourceMappingURL=index.js.map