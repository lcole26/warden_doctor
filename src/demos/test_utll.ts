import * as utils from '../utils/util';

const test_msg = '/espruino/hcsr04|400';

const test_parse = utils.ParseSerialMessage(test_msg);
console.log(`test_msg: ${test_msg}`);
console.log(test_parse);
