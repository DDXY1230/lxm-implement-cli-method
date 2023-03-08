"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Inquirer = require("inquirer");

var _require = require("./request"),
    fetchRepoList = _require.fetchRepoList,
    fetchTagList = _require.fetchTagList;

var _require2 = require('./util'),
    wrapLoading = _require2.wrapLoading;

var downloadGitRepo = require('download-git-repo'); // 不支持promise,需要自己变成promise


var util = require('util'); // node自带的包转化promise


var path = require('path');

var Creator =
/*#__PURE__*/
function () {
  function Creator(projectName, targetDir) {
    _classCallCheck(this, Creator);

    // new 的时候会调用构造函数
    this.name = projectName;
    this.target = targetDir; // 到时候模版被下载到这个目录下
    // 此时downloadGitRepo就被我转化成promise方法了

    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  _createClass(Creator, [{
    key: "fetchRepo",
    value: function fetchRepo() {
      var repos, _ref, repo;

      return regeneratorRuntime.async(function fetchRepo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(wrapLoading(fetchRepoList, "waiting fetch template"));

            case 2:
              repos = _context.sent;
              // let repos = await fetchRepoList()
              console.log('拉取模版成功', repos);

              if (repos) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              repos = repos.map(function (item) {
                return item.name;
              });
              console.log("repos", repos);
              _context.next = 10;
              return regeneratorRuntime.awrap(Inquirer.prompt({
                name: "repo",
                type: "list",
                choices: repos,
                message: "please choose a template to create project"
              }));

            case 10:
              _ref = _context.sent;
              repo = _ref.repo;
              return _context.abrupt("return", repo);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }, {
    key: "fetchTag",
    value: function fetchTag(repo) {
      var tags, _ref2, tag;

      return regeneratorRuntime.async(function fetchTag$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(wrapLoading(fetchTagList, 'waiting fetch tag', repo));

            case 2:
              tags = _context2.sent;
              // console.log('拿到tags版本号', tags)
              tags = tags.map(function (item) {
                return item.name;
              });
              _context2.next = 6;
              return regeneratorRuntime.awrap(Inquirer.prompt({
                name: "tag",
                type: "list",
                choices: tags,
                message: "please choose a template to create project"
              }));

            case 6:
              _ref2 = _context2.sent;
              tag = _ref2.tag;
              return _context2.abrupt("return", tag);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "download",
    value: function download(repo, tag) {
      var requestUrl;
      return regeneratorRuntime.async(function download$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              // 1. 需要拼接出下载路径
              requestUrl = "lxm-cli/".concat(repo).concat(tag ? '#' + tag : ''); // 2. 把资源下载到某个路径下 (后续这里可以增加缓存功能, 应该下载到系统目录中, 稍后可以再使用ejs handlerbar
              // 去渲染模版 最后生成结果 在写入)

              _context3.next = 4;
              return regeneratorRuntime.awrap(this.downloadGitRepo(requestUrl, this.target));

            case 4:
              // await this.downloadGitRepo(requestUrl, path.resolve(process.cwd, `${repo}@${tag}`))
              console.log('下载成功', this.target);
              return _context3.abrupt("return", this.target);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 8]]);
    }
  }, {
    key: "create",
    value: function create() {
      var repo, tag, downloadUrl;
      return regeneratorRuntime.async(function create$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(this.name, this.target); // 真实开始创建
              // 1. 先去拉取当前组织下的模版

              _context4.next = 3;
              return regeneratorRuntime.awrap(this.fetchRepo());

            case 3:
              repo = _context4.sent;
              // 拿到仓库
              console.log('拿到仓库', repo); //2. 再通过模版找到版本号

              _context4.next = 7;
              return regeneratorRuntime.awrap(this.fetchTag(repo));

            case 7:
              tag = _context4.sent;
              console.log('拿到版本号', tag); //3. 下载模版

              _context4.next = 11;
              return regeneratorRuntime.awrap(this.download(repo, tag));

            case 11:
              downloadUrl = _context4.sent;

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Creator;
}();

module.exports = Creator;