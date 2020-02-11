"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const packageJson = require('../../package.json');

var _default = {
  packageJson,
  framework: 'vue',
  frameworkPresets: [require.resolve('./framework-preset-vue.js')]
};
exports.default = _default;