"use strict";

var axios = require('axios');

axios.interceptors.response.use(function (res) {
  return res.data;
});

function fetchRepoList() {
  return regeneratorRuntime.async(function fetchRepoList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", axios.get('https://api.github.com/orgs/lxm-cli/repos'));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function fetchTagList(repo) {
  return regeneratorRuntime.async(function fetchTagList$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", axios.get("https://api.github.com/repos/lxm-cli/".concat(repo, "/tags")));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  fetchRepoList: fetchRepoList,
  fetchTagList: fetchTagList
};