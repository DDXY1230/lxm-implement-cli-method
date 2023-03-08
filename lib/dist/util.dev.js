"use strict";

var ora = require("ora");

function sleep(n) {
  return regeneratorRuntime.async(function sleep$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, n);
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function wrapLoading(fn, message) {
  var spinner,
      _len,
      args,
      _key,
      repos,
      _args2 = arguments;

  return regeneratorRuntime.async(function wrapLoading$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          spinner = ora(message); // 转圈的下载提示消息

          spinner.start(); // 开启下载

          for (_len = _args2.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = _args2[_key];
          }

          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fn.apply(void 0, args));

        case 6:
          repos = _context2.sent;
          // console.log('拿到仓库或者版本好', repos)
          spinner.succeed(); // 成功了

          return _context2.abrupt("return", repos);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](3);
          spinner.fail("request failed, refetch......"); // 失败的提示

          _context2.next = 16;
          return regeneratorRuntime.awrap(sleep(1000));

        case 16:
          return _context2.abrupt("return", wrapLoading.apply(void 0, [fn, message].concat(args)));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 11]]);
}

module.exports = {
  sleep: sleep,
  wrapLoading: wrapLoading
};