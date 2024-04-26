"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../utils/util");
const test_msg = '/espruino/hcsr04|400';
const test_parse = utils.ParseSerialMessage(test_msg);
console.log(`test_msg: ${test_msg}`);
console.log(test_parse);
//# sourceMappingURL=test_utll.js.map