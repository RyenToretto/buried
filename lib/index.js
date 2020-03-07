"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var network_1 = require("./network");
var store_1 = require("./store");
var timer_1 = require("./timer");
var Buried = (function () {
    function Buried(options) {
        this.store = new store_1.Store();
        this.timer = new timer_1.Timer();
        this.network = new network_1.Network();
    }
    return Buried;
}());
exports.default = Buried;
//# sourceMappingURL=index.js.map