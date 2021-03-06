'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Copyright, 2013-2016, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

exports.configDir = configDir;
exports.configPath = configPath;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _node = require('node.extend');

var _node2 = _interopRequireDefault(_node);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function configDir() {
  if (_os2.default.homedir) {
    return '~/.microcrawler'.replace('~', _os2.default.homedir());
  }

  return '~/.microcrawler'.replace('~', require('homedir')());
}

function configPath() {
  return _path2.default.join(configDir(), 'config.json');
}

var configData = function () {
  try {
    return (0, _node2.default)(true, _package2.default.config, require(configPath()));
  } catch (err) {
    return _package2.default.config;
  }
}();

var config = exports.config = configData;

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, [{
    key: 'main',
    value: function main() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

      _commander2.default.version(_package2.default.version).command('init', 'Initialize config file').command('show', 'Show config file').parse(args);
    }
  }, {
    key: 'init',
    value: function init() {
      var _this = this;

      var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

      _commander2.default.version(_package2.default.version).parse(args);

      (0, _mkdirp2.default)(configDir(), function (err) {
        if (err) {
          _logger2.default.error(err);
          return;
        }

        _logger2.default.info('Creating config file "' + configPath() + '"');

        _fs2.default.writeFile(configPath(), JSON.stringify(_package2.default.config, null, 4), function (error) {
          if (error) {
            return _logger2.default.error(error);
          }

          _this.show();
        });
      });
    }
  }, {
    key: 'show',
    value: function show() {
      var args = arguments.length <= 0 || arguments[0] === undefined ? process.argv : arguments[0];

      _commander2.default.version(_package2.default.version).parse(args);

      console.log(JSON.stringify(config, null, 4));
    }
  }]);

  return Config;
}();

exports.default = Config;