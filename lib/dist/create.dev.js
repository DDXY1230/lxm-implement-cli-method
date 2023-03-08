"use strict";

var path = require('path'); // const fs = require('fs')


var fs = require('fs-extra'); // 这个比fs更加强大


var Inquirer = require('inquirer');

var Creator = require('./Creator');

module.exports = function _callee(projectName, options) {
  var cwd, targetDir, _ref, action, creator;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // 创建项目
          cwd = process.cwd(); //Users/前端项目demo/lxm-cli/

          targetDir = path.join(cwd, projectName);
          console.log(targetDir); //Users/前端项目demo/lxm-cli/aa

          console.log('options', options);
          console.log('是否已存在', fs.existsSync(targetDir));

          if (!fs.existsSync(targetDir)) {
            _context.next = 22;
            break;
          }

          if (!options.force) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(fs.remove());

        case 9:
          _context.next = 22;
          break;

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(Inquirer.prompt([// 配置询问方式
          {
            name: 'action',
            type: 'list',
            // 类型很多,checkbox input等
            message: 'Target directory already exists Pick an action',
            choices: [{
              name: 'Overwrite',
              value: 'overwrite'
            }, {
              name: 'Cancel',
              value: false
            }]
          }]));

        case 13:
          _ref = _context.sent;
          action = _ref.action;
          console.log('action', action);

          if (action) {
            _context.next = 19;
            break;
          }

          _context.next = 22;
          break;

        case 19:
          console.log("\r\n Removeing....");
          _context.next = 22;
          return regeneratorRuntime.awrap(fs.remove(targetDir));

        case 22:
          // 创建项目
          creator = new Creator(projectName, targetDir);
          creator.create(); // 开始创建

        case 24:
        case "end":
          return _context.stop();
      }
    }
  });
};