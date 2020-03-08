/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var STORE_NAME = '__BURIED_DATA__';
var Store = (function () {
    function Store(options) {
        this.data = this.getInitData();
        this.options = options;
        var localData = this.getData();
        if (localData) {
            this.data = localData;
        }
    }
    Store.prototype.setData = function (data) {
        if (this.options.setData) {
            this.options.setData(data);
            return;
        }
        if (window && window.localStorage) {
            window.localStorage.setItem(STORE_NAME, JSON.stringify(data));
        }
        else {
            throw new Error('[Buried] need to provide storage methods for current environment!');
        }
    };
    Store.prototype.getData = function () {
        if (this.options.getData) {
            return this.options.getData();
        }
        if (window && window.localStorage) {
            var str = window.localStorage.getItem(STORE_NAME);
            if (str) {
                try {
                    var data = JSON.parse(str);
                    return data;
                }
                catch (e) {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        else {
            throw new Error('[Buried] need to provide storage methods for current environment!');
        }
    };
    Store.prototype.getInitData = function () {
        return {
            version: '1.0.0',
            data: [],
            lastReportTime: new Date().getTime(),
            lastUpdateTime: new Date().getTime()
        };
    };
    Store.prototype.reset = function () {
        this.data = this.getInitData();
        this.setData(this.data);
    };
    Store.prototype.put = function (data) {
        var _a;
        if (!data) {
            return;
        }
        if (!this.data.data) {
            this.data.data = [];
        }
        if (Array.isArray(data)) {
            (_a = this.data.data).push.apply(_a, __spread(data));
        }
        else {
            this.data.data.push(data);
        }
        this.data.lastUpdateTime = new Date().getTime();
        this.setData(this.data);
    };
    Store.prototype.report = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.options.report) return [3, 2];
                        return [4, this.options.report(this.options.url, this.data.data)];
                    case 1:
                        res = _a.sent();
                        this.reset();
                        return [2, res];
                    case 2:
                        if (window && window.fetch) {
                            options = {
                                method: 'POST'
                            };
                            return [2, fetch(this.options.url, options).then(function (res) {
                                    console.log(res);
                                    return res.json();
                                })];
                        }
                        throw new Error('[Buried] need to provide report method for current environment!');
                }
            });
        });
    };
    return Store;
}());

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

var Buried = (function () {
    function Buried(options) {
        var _this = this;
        this.listeners = [];
        this.options = options;
        this.store = new Store({
            url: options.url,
            getData: options.getData,
            setData: options.setData,
            report: options.report
        });
        this.timer = new Timer(options.period);
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

export default Buried;
//# sourceMappingURL=buried.es.js.map
